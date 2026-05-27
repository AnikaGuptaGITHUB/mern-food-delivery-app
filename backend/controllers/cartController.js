import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    let userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log("Error in addToCart:", error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFromCart = async (req, res) => {
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"});
    } catch (error) {
        console.log(Error);
        res.json({success:false,message:"Error"});
    }
};
const getCart = async (req, res) => {
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
};

export { addToCart, getCart, removeFromCart };

