const express = require("express");
const app = express();
const https = require("https")

const body_parser = require("body-parser");
app.use(body_parser.urlencoded({extended:true}));

app.listen("3000", function(req, res) {
    console.log("Server is running");
})

app.get("/", function(req, res) {

    res.sendFile(__dirname+"/index.html");
})


app.post("/", function(req, res) {

    if(req.body.place_name != "") {

        var place = req.body.place_name;
        const app_id = "e5ac1cf4338cac73401e9464548f9171";
        const units = "metric"

        const url = "https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+app_id+"&units="+units;

        https.get(url, function(response) {
            
            response.on("data", function(data) {

                const weather_data = JSON.parse(data);
                
                try {
                    const temp = weather_data.main.temp
                    const description = weather_data.weather[0].description
                    const icon = "http://openweathermap.org/img/wn/"+weather_data.weather[0].icon+"@2x.png"
                    // console.log(weather_data.main.temp)
                    res.write("<h1> Current temperature in "+ place +" is " + temp + " degrees celcius.")
                    res.write("<h2>Current weather is " + description + ".</h2>")
                    res.write("<img src="+icon+"></img>");
                    res.write("<br/>")
                    res.write("<a href='/'>Back</a>");
                    res.send();
                } catch (error) {
                    res.sendFile(__dirname+"/index.html");
                }
            });
        });
        
    } else {
        res.sendFile(__dirname+"/index.html");
    }
})

    