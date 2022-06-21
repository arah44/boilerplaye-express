require("dotenv").config();
const bodyParser = require("body-parser")

let express = require("express");
let app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use(((req, res, next) => {
  console.log(req.method, req.path + " - " + req.ip)
  next();
}));

app.use("/public", express.static(__dirname + "/public"));


app.get("/", (req, res) => (
  res.sendFile(__dirname + "/views/index.html")
));

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time});
});

app.get("/json", (req, res) => {
  let message = "Hello json";

  // Uppercase depending on env variable MESSAGE_STYLE 
  message = process.env.MESSAGE_STYLE === "uppercase" ? message.toUpperCase() : message;
  
  return res.json({"message": message});
});

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word})
})



app.route('/name')
  .get((req, res) => {
    const { first, last } = req.query;
    res.json({
      name: first + ' ' + last
    })
  })
  .post((req, res) => {
    const { first, last } = req.body;
    res.json({
      name: first + ' ' + last
    })
  })

































 module.exports = app;
