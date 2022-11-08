const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
      // FINDING USER HASH PASSWORD
      const user = await userModel
        .findOne({ email: req.body.emailId })
        .select("password");

      // COMPARING THE PASSWORD WITH BCRYPT COMPARE METHOD
      const password = await bcrypt.compare(req.body.password, user.password);

      // IF PASSWORD MATCH
      if (password) {
        // ADDING MONGOOSE _ID TO BODY FOR VERIFICATION OF TOKEN
        req.body.id = user._id;
        next();
      } else {
        res.status(404).json({
          status: "fail",
          msg: "details dose not match!!",
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        msg: "Invalid request!!",
      });
    }
  } catch (error) {
    // SENDING RESPONSE FOR INVALID CRENDIANTIALS
    res.status(403).json({
      status: "Invalid Crendiantials!",
      error,
    });
  }
};
