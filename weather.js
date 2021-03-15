const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const cityName = req.body.city;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&APPID=f0e37bdf6592b05830ed70e05e2790e8&units=metric";
https.get(url,function(response){
  response.on("data",function(data){
    const wather = JSON.parse(data);
    const temp = wather.main.temp;
    const feel = wather.main.feels_like;
    const icon = wather.weather[0].icon;
    const imageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1>The temperature in "+cityName+" is "+temp+" celcius</h1>");
    res.write("<p>Feels like "+feel+"celcius</p>");
    res.write("<img src="+imageURL+">");
    res.send()
  });
});
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server on");
});
