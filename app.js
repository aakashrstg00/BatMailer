var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
app.use(express.static('public'));
//
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
app.get('/send', function (req, res) {
    //code to send e-mail.
    var smtpTransport = nodemailer.createTransport({
        service: "gmail"
        , host: "smtp.gmail.com"
        , secuse: true
        , port: 465
        , auth: {
            user: 'aakashrastogiPro@gmail.com'
            , pass: '#Aakash1998g2'
        }
    });
    var mailOptions = {
        from: '"Aakash3 Rastogi 👻" <aakashrastogiPro@gmail.com>'
        , to: req.query.to
        , subject: req.query.subject
        , text: req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        }
        else {
            console.log("Message sent to " + req.query.to);
            res.end("sent");
        }
    });
});
//
var port = process.env.PORT||3000;
app.listen(port, function () {
    console.log("Express Started on Port "+port);
});
