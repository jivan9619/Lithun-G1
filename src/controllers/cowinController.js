let axios = require("axios");

exports.getsessinBydistId = async (req, res) => {
  try {
    const { district_id, date } = req.query;
    const data = await axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`
    );
    res.status(200).json({
      status: "succuss",
      data: data.data,
    });
  } catch (error) {
    res.status(500).json({
      status: "server error",
      error,
    });
  }
};

exports.getWeatherDetails = async (req, res) => {
  try {
    const specialQuery = req.query.special;
    const query = req.query.country;
    const units = "units=metric";
    const apikey = process.env.WEBAPI;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apikey}&${units}`;
    const data = await axios.get(url);
    const weather = data.data;
    const Temp = data.data.main.temp;
    let weatherRepot;
    if (specialQuery === "temp") {
      weatherRepot = Temp;
    } else {
      weatherRepot = weather;
    }
    res.status(200).json({
      status: "succuss",
      report: `${
        specialQuery === "undefine" ? "weather" : specialQuery
      } in ${query} is: `,
      weatherRepot,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getWeatherMultiple = async (req, res) => {
  const citys = req.body;
  const Obj = {};
  const units = "units=metric";
  const apikey = process.env.WEBAPI;
  res.send("Multiple!");
};

exports.getAllMeems = async (req, res) => {
  const data = await axios.get("https://api.imgflip.com/get_memes");
  res.send(data.data);
};
exports.getMeems = async (req, res) => {
  console.log(req.query);
  const data = await axios.post(
    "https://api.imgflip.com/caption_image",
    req.query
  );
  console.log(data);
  res.send("data.data");
};
// let getStates = async function (req, res) {

//     try {
//         let options = {
//             method: 'get',
//             url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
//         }
//         let result = await axios(options);
//         console.log(result)
//         let data = result.data
//         res.status(200).send({ msg: data, status: true })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ msg: err.message })
//     }
// }

// let getDistricts = async function (req, res) {
//     try {
//         let id = req.params.stateId
//         let options = {
//             method: "get",
//             url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
//         }
//         let result = await axios(options);
//         console.log(result)
//         let data = result.data
//         res.status(200).send({ msg: data, status: true })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ msg: err.message })
//     }
// }

// let getByPin = async function (req, res) {
//     try {
//         let pin = req.query.pincode
//         let date = req.query.date
//         console.log(`query params are: ${pin} ${date}`)
//         var options = {
//             method: "get",
//             url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
//         }
//         let result = await axios(options)
//         console.log(result.data)
//         res.status(200).send({ msg: result.data })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ msg: err.message })
//     }
// }

// let getOtp = async function (req, res) {
//     try {
//         let blahhh = req.body

//         console.log(`body is : ${blahhh} `)
//         var options = {
//             method: "post",
//             url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
//             data: blahhh
//         }

//         let result = await axios(options)
//         console.log(result.data)
//         res.status(200).send({ msg: result.data })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ msg: err.message })
//     }
// }

// module.exports.getStates = getStates
// module.exports.getDistricts = getDistricts
// module.exports.getByPin = getByPin
// module.exports.getOtp = getOtp
