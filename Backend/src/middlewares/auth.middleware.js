import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }
    
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

    if (
      decoded_token !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token, authorization denied" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log(token);
    
    if (!token) {
      return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await userModel.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    req.body.userId = decodedToken.id;
    console.log(decodedToken.id);
    
    next();
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { authAdmin, authUser };