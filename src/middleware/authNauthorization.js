const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authorizectionCheck = (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SEC_CODE
    );

    if (req.params.id === decode.id) {
      next();
    } else {
      res.status(403).json({
        status: "fail",
        msg: "Access denied!",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      msg: {
        reson: "Authorization header not fouund",
        error,
      },
    });
  }
};

exports.authCheck = async (req, res, next) => {
  const user = await userModel.findOne(req.body);
  // IF USER FOUND
  if (user) {
    // ADDING MONGOOSE _ID TO BODY FOR VERIFICATION OF TOKEN
    req.body.id = user._id;
    next();
  } else {
    res.status(404).json({
      status: "fail",
      msg: "details dose not match!!",
    });
  }
};
