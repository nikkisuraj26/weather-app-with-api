const express = require("express");
const https= require("https");
const bodyParser = require("body-parser")

const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    const query= req.body.cityName;
    const apiKey= "258039ba3f48a9f5b0669f65114e07f0#"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&units=metric&appid="+apiKey+"";
    https.get(url, function(response){
  response.on("data", function(data){

    //the thing we r getting here is in hexadecimal therefore we need to parse this into JSON
    const weatherData= JSON.parse(data)
  const temp=weatherData.main.temp
    const description =weatherData.weather[0].description
    const icon =weatherData.weather[0].icon
    const imgUrl="http://openweathermap.org/img/wn/"+ icon +"@2x.png"

    res.write("<h1>the temperature in "+query+ " is : " +temp+ " degree Celcius.</h1>");
  res.write("<p> weather description is : "+description+"<p>")
  res.write("<img src="+imgUrl+">")
  res.send();
  })
    })
})


app.listen(3000, function(){
  console.log("server is running on port 3000");
});
