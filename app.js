const express = require("express");
const https =require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req,res){
res.sendFile(__dirname + "/index.html");
    
    
});

app.post("/" , function(req,res){
  

  const query = req.body.cityName;
    const apiKey= "c73c2dab006835fbad01a54a4495ff97";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+"";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
          const weatherData =  JSON.parse(data);
          const temp = weatherData.main.temp;
          const desc = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
          res.write("<p>The weather is currently "  + desc + " </p>")
          res.write("<h1>The temperature in "+req.body.cityName+ "  is " + temp + " Degree Celcius<h1/>");
          res.write( "<img src= " + imageUrl + ">" );
          
        //   res.write(icon);
          res.send()
        })
    });
})




app.listen(3000 , function(){
    console.log("server started at 3000");
});