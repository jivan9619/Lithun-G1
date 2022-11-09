const express = require('express');
const route = require('./routes/route.js');
const app = express();
require("dotenv").config({path: './config.env'});

app.use(express.json());
app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
