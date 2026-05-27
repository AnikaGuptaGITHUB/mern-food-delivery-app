import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import cartRouter from "./routes/cartRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use("/images", express.static("uploads")); // serve static images folder

// ===== Database Connection =====
connectDB();

// ===== API Routes =====
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/orders",orderRouter);

// ===== Root Endpoint =====
app.get("/", (req, res) => {
  res.send("✅ API Working Fine!");
});

// ===== Start Server =====
app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
