var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
var url=require('url');
var crypto = require('crypto');
var path = require('path');
var handlebars = require('handlebars');
var fs = require('fs');
//credentials for gmail
app.listen(8080,()=>console.log('listening on port 8080'))
var smtpTransport = nodemailer.createTransport({
   service: 'gmail',
    auth: {
        user: "xx@mail.com", 
        pass: "xxxx" 
    }
});
//handing email template

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};
var mailOptions,host,link;
app.get('/',function(req,res){

  urlparse=url.parse(req.url,true);
  emails=urlparse.query.emailid;

    host=req.get('host');
    link="hello you are talking to a bot"
    readHTMLFile(__dirname + '/templates/email.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             link: link
        };
        var emailtemplate = template(replacements);
    mailOptions={
        from: '"Servntire account verification"<bosetester19@gmail.com>',
        to : emails,
        subject : "Please confirm your Email account",
        html : emailtemplate
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.send('email send');
         }



});
});
});
module.exports=app;

