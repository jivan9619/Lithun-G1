let axios = require("axios");

// GETTING VASSICATION SLOT AVALIABLITY BY DISTRICT ID AND DATE
exports.getsessinBydistId = async (req, res) => {
  try {
    // DESTRUCTING DISTRICT ID AND DATE
    const { district_id, date } = req.query;
    // GETTING DATA BY AXIOS GET REQUEST
    const data = await axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`
    );
    // SENDING DATA WITH STATUS CODE 200 OKAY
    res.status(200).json({
      status: "succuss",
      data: data.data,
    });
  } catch (error) {
    // IF ANY ERROR SENDING SEREVER ERROR WITH STATUS CODE 500
    res.status(500).json({
      status: "server error",
      error,
    });
  }
};

// GET WEATHER DATA FOR A PERTICULAR CITY
exports.getWeatherDetails = async (req, res) => {
  try {
    // SPECIAL QUERY LIKE TEMP
    const specialQuery = req.query.special;
    // CITY NAME FROM QUERY PARAMS
    const query = req.query.city;
    // USING UNITS IN METRIC
    const units = "units=metric";
    // GETTING API KEY FROM CONFIG FILE
    const apikey = process.env.WEBAPI;
    // CREATING URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apikey}&${units}`;
    // GET REQUEST TO FETCH DATA
    const data = await axios.get(url);
    const weather = data.data;
    // TEMP EXTRACTION
    const Temp = data.data.main.temp;
    let weatherRepot;
    if (specialQuery === "temp") {
      weatherRepot = Temp;
    } else {
      weatherRepot = weather;
    }
    // SENDING RESPONSE WITH STATUS CODE 200 OKAY
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

//  GET WEATHER DATA OF MULTIPLE CITYS
exports.getWeatherMultiple = async (req, res) => {
  try {
    // CITY ARRAY
    const cityes = [
      "Bengaluru",
      "Mumbai",
      "Delhi",
      "Kolkata",
      "Chennai",
      "London",
      "Moscow",
    ];
    const units = "units=metric";
    const apikey = process.env.WEBAPI;
    // USING PROMICE ALL TO MAP ALL CITYS WHICH RETURN ARRAY OF ALL REQUESTES
    let answer = await Promise.all(
      // USING ASYNC MAP FUNCTION
      cityes.map(async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&${units}`;
        // GETTING DATA OF EACH CITY
        const data = await axios.get(url);
        // EXTRACTING TEMP FROM DATA
        const Temp = data.data.main.temp;
        // RETURNING OBJECT WITH CITY NAME AND TEMP OF CITY
        return { city: city, Temp: Temp };
      })
    );
    // SORTING RESULTING ARRAY WITH DECENDING TEMP
    answer.sort((a, b) => {
      return a.Temp - b.Temp;
    });
    //
    res.status(200).json({
      status: "succuss",
      result: answer,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

// GET ALL MEEMS
exports.getAllMeems = async (req, res) => {
  try {
    const data = await axios.get("https://api.imgflip.com/get_memes");
    res.status(200).json({
      status: "succuss",
      result: data.data,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

// CREATE MEEMS BY AXIOS POST METHOD
exports.getMeems = async (req, res) => {
  try {
    const { a, b, c, d, e } = req.body;
    const data = await axios(
      `https://api.imgflip.com/caption_image?template_id=${a}&text0=${b}&text1=${c}&username=${d}&password=${e}`
    );
    res.status(200).json({
      status: "succuss",
      result: data.data,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
  //EXTRACTING template_id AS a, text0 AS b, text1 AS c, username AS d, password AS e
};
