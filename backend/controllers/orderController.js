import dotenv from "dotenv";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

dotenv.config();

// ✅ Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ USD → INR conversion rate (can later be made dynamic)
const USD_TO_INR = 83;

// ==================================
// 🟢 PLACE ORDER
// ==================================
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    console.log("🟢 placeOrder triggered!");
    console.log("🔹 User ID:", req.userId);
    console.log("🔹 Request Body:", JSON.stringify(req.body, null, 2));

    const userId = req.userId;
    if (!userId) {
      console.log("❌ Missing userId from token — check authMiddleware");
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    if (!req.body.items || req.body.items.length === 0) {
      console.log("❌ No items found in order");
      return res
        .status(400)
        .json({ success: false, message: "No items in order" });
    }

    console.log("✅ Creating new order document...");
    const newOrder = new orderModel({
      userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    console.log("✅ Order saved to MongoDB:", newOrder._id);

    // ✅ Clear user cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    console.log("✅ Cleared user cart");

    // ✅ Prepare Stripe line items (convert USD → INR)
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        // Convert from USD → INR → paise (₹1 = 100 paise)
        unit_amount: Math.round(item.price * USD_TO_INR * 100),
      },
      quantity: item.quantity,
    }));

    // ✅ Add delivery charge ($2 converted to INR)
    const deliveryUSD = 2;
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Fee" },
        unit_amount: Math.round(deliveryUSD * USD_TO_INR * 100),
      },
      quantity: 1,
    });

    console.log("✅ Stripe line items prepared:", line_items);

    // ✅ Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      payment_method_types: ["card"], // or ["card", "upi"] if enabled in dashboard
      allow_promotion_codes: false,
      customer_creation: "if_required",

      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log("✅ Stripe session created successfully!");
    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("❌ Error in placeOrder:", error.message);
    console.error(error.stack);
    return res
      .status(500)
      .json({ success: false, message: "Error placing order" });
  }
};

// ==================================
// 🟢 VERIFY ORDER
// ==================================
const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    console.log("🟢 verifyOrder called with:", { orderId, success });

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Order ID missing" });
    }

    if (success === "true" || success === true) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      console.log(`✅ Order ${orderId} marked as paid`);
      return res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      console.log(`❌ Payment failed — Order ${orderId} deleted`);
      return res.json({
        success: false,
        message: "Payment failed, order deleted",
      });
    }
  } catch (error) {
    console.error("❌ Error in verifyOrder:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error verifying order" });
  }
};

// ==================================
// 🟢 USER ORDERS (Frontend display)
// ==================================
const userOrders = async (req, res) => {
  try {
    console.log("🟢 userOrders called for:", req.userId);

    const orders = await orderModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });

    return res.json({ success: true, data: orders });
  } catch (error) {
    console.error("❌ Error in userOrders:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching user orders" });
  }
};

//Listing orders for admin panel
const listOrders=async(req,res)=>{
try {
  const orders=await orderModel.find({});
  res.json({success:true,data:orders})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"});
}
}
//api for updating order status
const updateStatus=async(req,res)=>{
try {
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
  res.json({success:true,message:"Status Updated"})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"});
}
}
export { listOrders, placeOrder, updateStatus, userOrders, verifyOrder };

