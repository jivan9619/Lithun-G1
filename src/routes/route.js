const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.get("/getData", CowinController.getsessinBydistId)
router.get("/getWeather", CowinController.getWeatherDetails)
router.get("/getWeatherMultiple", CowinController.getWeatherMultiple);
// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date

router.get("/getAllMeems", CowinController.getAllMeems);
router.post("/getMeems", CowinController.getMeems);

module.exports = router;