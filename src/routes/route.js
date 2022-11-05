const express = require("express");
const router = express.Router();

const contClass = require("../controllers/classControler");
const {
  authorizectionCheck,
  authCheck,
} = require("../middleware/authNauthorization");
const cont = new contClass();

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.route("/createUser").post(cont.createUser);

router.route("/login").post(authCheck, cont.loginUser);

router
  .route("/user/:id")
  .get(authorizectionCheck, cont.getUserDetails)
    .patch(authorizectionCheck, cont.updateUserDetails)
  .delete(authorizectionCheck, cont.deleteUser)

// router.post("/users", userController.createUser)

// router.post("/login", userController.loginUser)

// //The userId is sent by front end
// router.get("/users/:userId", userController.getUserData)
// router.post("/users/:userId/posts", userController.postMessage)

// router.put("/users/:userId", userController.updateUser)
// router.delete('/users/:userId', userController.deleteUser)

module.exports = router;
