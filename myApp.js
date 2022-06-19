require("dotenv").config();
let express = require("express");
let app = express();

app.use(((req, res, next) => {
  console.log(req.method, req.path + " - " + req.ip)
  next();
}))

app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => (
  res.sendFile(__dirname + "/views/index.html")
))

app.get("/json", (req, res) => {
  let message = "Hello json";

  // Uppercase depending on env variable MESSAGE_STYLE 
  message = process.env.MESSAGE_STYLE === "uppercase" ? message.toUpperCase() : message;
  
  return res.json({"message": message});
})



































 module.exports = app;
