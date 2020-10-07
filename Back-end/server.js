const express = require("express"),
  sendEmails = require("./index"),
  bodyParser = require("body-parser"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors"),
  cron = require("node-cron");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
let candidateEmail = "";

app.post("/", function (req, res, next) {
  candidateEmail = req.body.candidate.email;
  console.log(candidateEmail);
  cron.schedule("40 18 * * *", () => {
    sendEmails(candidateEmail);
  });
  res.send("Data received");
  next();
});

app.listen(port, () => console.log(`Backend server live on ${port}`));
