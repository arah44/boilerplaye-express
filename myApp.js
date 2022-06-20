require("dotenv").config();
let express = require("express");
let app = express();

app.use(((req, res, next) => {
  console.log(req.method, req.path + " - " + req.ip)
  next();
}))

app.use("/public", express.static(__dirname + "/public"))
app.use("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
})


app.get("/", (req, res) => (
  res.sendFile(__dirname + "/views/index.html")
))

app.get("/now", (req, res) => {
  res.json({time: req.time})
})

app.get("/json", (req, res) => {
  let message = "Hello json";

  // Uppercase depending on env variable MESSAGE_STYLE 
  message = process.env.MESSAGE_STYLE === "uppercase" ? message.toUpperCase() : message;
  
  return res.json({"message": message});
})



































 module.exports = app;
