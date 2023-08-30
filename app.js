//jshint esversion:6

const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use (bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");

})

app.post("/",function(req,res){

    const query = req.body.cityName;
    const apiKey = "70ea1b91ab60adb5038ca40b2400f223";

    const url="https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+query+"&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);
    
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp ;
            const weatherdescription = weatherData.weather[0].description;
            const wicon = weatherData.weather[0].icon;
            const imgUrl="https://openweathermap.org/img/wn/"+wicon+"@2x.png";

            res.write("<p>The weather description in "+query+" is: "+weatherdescription+"</p>");
            res.write ("<h1>The temperature in "+query+" is: " +temp+" deg Celcius</h1>");
            res.write("<img src="+imgUrl+">");
            res.send();

        });
    });

    console.log ("Post recieved");
});

app.listen(3000 ,function(){
    console.log("Server is running on port 3000.");
});