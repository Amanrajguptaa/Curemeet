import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const decoded_token = jwt.verify(atoken, process.env.JWT_SECRET);

    if (
      decoded_token !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ msg: "Invalid token, authorization denied" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export default authAdmin;
