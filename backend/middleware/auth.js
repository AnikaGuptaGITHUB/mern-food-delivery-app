import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // 🔹 Get token from headers (either "token" or "authorization")
    let token = req.headers.token || req.headers.authorization;

    console.log("🔹 [authMiddleware] Incoming token:", token);

    // 🔸 No token → reject
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized — please log in again",
      });
    }

    // 🔹 Remove "Bearer " prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // 🔹 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔹 [authMiddleware] Decoded:", decoded);

    // 🔹 If no valid decoded id → reject
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token — please log in again",
      });
    }

    // 🔹 Attach userId to request
    req.userId = decoded.id;
    console.log("✅ [authMiddleware] userId attached:", req.userId);

    next();
  } catch (error) {
    console.error("❌ Auth error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired — please log in again",
      });
    }

    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default authMiddleware;
