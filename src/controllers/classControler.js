const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
class controler {
  // CREATING USER DATA
  createUser = async (req, res, next) => {
    try {
      const users = await userModel.create(req.body);
      res.status(200).json({
        status: "succuss",
        result: `${users.length ? users.length : 1} user added to data base!!`,
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        msg: error,
      });
    }
  };

  // LOGIN OF USER IS IMPLIMENTATION
  loginUser = async (req, res, next) => {
    // GENERATING JWT TOKEN
    const Token = jwt.sign(req.body, process.env.JWT_SEC_CODE, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
    res.status(200).json({
      status: "succuss",
      Token,
    });
  };

  // GETTING USER DETAILS AFTER USER VERIFICATION
  getUserDetails = async (req, res, next) => {
    const user = await userModel.findById(req.params.id);
    res.send(user);
  };

  // UPDATING USER DETAILS
  updateUserDetails = async (req, res, next) => {
    const status = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(status);
  };

  //DELETING USER
  deleteUser = async (req, res, next) => {
    await userModel.findByIdAndUpdate(
      req.params.id,
      { isDeleated: true },
      { new: true }
    );
    res.status(200).json({
      status: "Deletion succuss!",
    });
  };
}

module.exports = controler;
