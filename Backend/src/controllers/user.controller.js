import validator from "validator";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Details !",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email !",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password min length should be 8 !",
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User Already Exists !",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully !",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Details !",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email !",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password min length should be 8 !",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User Doesn't Exists !",
      });
    }

    const passwordVerified = await bcrypt.compare(password, user.password);

    if (!passwordVerified) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password !",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully !",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editUser = async (req, res) => {
  try {
    const { userId ,name, gender, dob, phone, address } = req.body;
    const imageFile = req.file;

    if(!name || !phone || !dob || !gender){
      return res.json({success:false,message:"Data Missing"})
    }

    await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender});
    
    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = uploadResult.secure_url;
      await userModel.findByIdAndUpdate(userId, {image:imageUrl}).select("-password");
    }

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully!",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserCount = async (req, res) => {
  try {
    const count = await userModel.countDocuments();
    res.status(200).json({ userCount: count });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user count', error: error.message });
  }
};


export { registerUser, loginUser, editUser, getUserProfile, deleteUser,getUserCount };
