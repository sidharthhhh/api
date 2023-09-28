const express = require("express");
const app = express();
require("dotenv").config({path: "./.env"});

// logger
const logger = require("morgan");
const ErorrHandler = require("./utils/ErrorHandler");
app.use(logger("tiny"));

// routes
app.use("/", require("./routes/indexRoutes"));



// error handling
const ErrorHandler = require("./utils/ErrorHandler");
const {genetatedErrors} = require("./middlewares/errors")
app.all("*", (req,res,next)=>{
    next(new ErorrHandler(`Requested URL Not Found ${req.url}`, 404))
})
app.use(genetatedErrors);



app.listen(process.env.PORT , console.log(`server is running on port ${process.env.PORT}`))