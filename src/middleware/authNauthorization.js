const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// AUTHORIZATION CHECK
exports.authorizectionCheck = (req, res, next) => {
  try {
    // VERIFIGING TOKEN
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SEC_CODE
    );
// CHEKING THE ID WITH JWT AND FROM REQ BODY      
    if (req.params.id === decode.id) {
      next();
    } else {
      // SENDING ERROR FOR ACCESS DENIED
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
  try {
    // CORNER CASE IF BODY IS EMPTY
    if (Object.keys(req.body).length) {
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
    }
  } catch (error) {
    // SENDING RESPONSE FOR INVALID CRENDIANTIALS
    res.status(403).json({
      status: "Invalid Crendiantials!",
      error,
    });
  }
};
