//jshint esversion:6

const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const nodemailer = require("nodemailer");
const my_email = "torndorff5@gmail.com"
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: my_email,
    pass: 'trvvnivktrixywoo'
  }
});
let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://torndorff5:W!THghimg2banc@cluster0.ognzf1o.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

function sendMail(to, text){
  let mailOptions = {
    from: my_email,
    to: to,
    subject: `SOCIAL SECURITY LEAD!!!`,
    text: text
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const Post = mongoose.model("Post", postSchema);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.get("/", function(req, res){
  res.render("home");
});

app.post("/", function(req, res){
  //grab info
  let name = req.body.fullName;
  let email = req.body.emai;
  const text = `Name : ${req.body.fullName}
    Email : ${req.body.emai}`
  sendMail(my_email, text);
  res.render("thanks");
});

app.get("/thanks", function(req, res){
  res.render("thanks");
})


// app.post("/calculator", function(req, res){
//   let amortization = calculateAmortization(req.body.loanAmount, req.body.interestRate, req.body.loanTerm);
//   const text = `Loan Amount : ${USDollar.format(req.body.loanAmount)}
//     Interest Rate : ${req.body.interestRate}
//     Loan Term : ${req.body.loanTerm}
//     Annual Income: ${USDollar.format(req.body.annualIncome)}
//     Name : ${req.body.fullName}
//     Email : ${req.body.emai}
//     Phone : ${req.body.phone}
//     Monthly: ${USDollar.format(amortization[0].totalPayment)}`
//   sendMail(my_email, text);
//   res.render("thanks");
// });

app.listen(port, function() {
  console.log("Server started on port " + port);
});