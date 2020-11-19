const express = require("express");
const bodyParser=require("body-parser");
const https= require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");

    app.post("/", function(req,res){
       
        const city=req.body.cityName;

        const url="https://api.openweathermap.org/data/2.5/weather?q="+city+",ind&appid=1f2b18aec3adca64a5590bc46262fe3a&units=metric"

        https.get(url,function(response){


            response.on("data", function(data){
                const weatherData=JSON.parse(data);
                const temperature=weatherData.main.temp;
                const weatherDescription =weatherData.weather[0].description;
                const icon=weatherData.weather[0].icon;
                const iconImage="https://openweathermap.org/img/wn/"+icon+"@2x.png"


                res.write("<p>The weather is currently "+weatherDescription+"</p>");
                res.write("<h1>The temperature in "+ city+" is " + temperature + "degree Celcius.</h1>");
                res.write("<img src=" + iconImage+ ">");
                
                res.send();


            });
        
    });
       
    });



    
});


app.listen(3000, function(){
  console.log("Server is running at port 3000.");
});