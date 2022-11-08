const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
class controler {
  // CREATING USER DATA
  createUser = async (req, res, next) => {
    try {
      if (Object.keys(req.body) !== 0) {

        const users = await userModel.create(req.body);

        // RESPONSE WITH 201 FOR SUCCUSSFUL CREATION OF RECORD
        res.status(201).json({
          status: "succuss",
          result: `${users.length ? users.length : 1} user added to data base!!`,
        });
      } else {
        res.status(400).json({
          status: "fail",
          msg: "Invalid request!!"
        })
      }
    } catch (error) {
      // RESPONSE WITH SERVER ERROR
      res.status(500).json({
        status: "fail",
        msg: error,
      });
    }
  };

  // LOGIN OF USER IS IMPLIMENTATION
  loginUser = (req, res, next) => {
    // GENERATING JWT TOKEN

    try {
      // IF REQ.BODY IS NOT EMPTY
      if (Object.keys(req.body) !== 0) {
        const Token = jwt.sign(req.body, process.env.JWT_SEC_CODE, {
          expiresIn: process.env.JWT_EXPIRE_IN,
        });
        // SENDING RESPONSE WITH 201 FOR SUCCUSSFUL TOKEN GENERATION
        res.status(201).json({
          status: "succuss",
          Token,
        });
      } else {
        res.status(400).json({
          status: "fail",
          msg: "Invalid request!!",
        });
      }
    } catch (error) {
      // SENDING WITH ERROR 403 FOR TOKEN GENERATION
      res.status(403).json({
        status: "fail",
        msg: "Token generatin falis",
      });
    }
  };

  // GETTING USER DETAILS AFTER USER VERIFICATION
  getUserDetails = async (req, res, next) => {
    try {
      // CHEKING IF ID IS EMPTY
      if (Object.keys(req.params.id) != 0) {
        const user = await userModel.findById(req.params.id);
        res.status(200).json({
          status: "succuss",
          data: user,
        });
      } else {
        res.status(400).json({
          status: "fail",
          msg: "Invalid request!!",
        });
      }
    } catch (error) {
      // SENDING ERROR IF USER NOT FOUND
      res.status(404).json({
        status: "User not found!",
        error,
      });
    }
  };

  // UPDATING USER DETAILS
  updateUserDetails = async (req, res, next) => {
    try {
      if (Object.keys(req.params.id).length && Object.keys(req.body)) {
        const status = await userModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        res.status(200).json({
          status: "succuss",
          data: status,
        });
      } else {
        res.status(400).json({
          status: "fail",
          msg: "Invalid request!!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "fail",
        error,
      });
    }
  };

  //DELETING USER
  deleteUser = async (req, res, next) => {
    try {
      if (Object.keys(req.params.id).length) {
        await userModel.findByIdAndUpdate(
          req.params.id,
          { isDeleated: true },
          { new: true }
        );
        res.status(200).json({
          status: "Deletion succuss!",
        });
      } else {
        res.status(400).json({
          status: "fail",
          msg: "Invalid request!!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        error,
      });
    }
  };
}

module.exports = controler;
