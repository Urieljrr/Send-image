const { Router } = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');
const router = Router();






let to;
let subject;
let body;
let path

const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({
    storage: Storage
}).single("image"); //Field name and max count

router.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

router.post('/sendemail',(req,res) => {
    upload(req,res,function(err){
        if(err){
            console.log(err)
            return res.end("Something went wrong!");
        }else{
            to = req.body.to
            subject = req.body.subject
            body = req.body.subject
            path = req.file.path
            console.log(to)
            console.log(subject)
            console.log(body)
            console.log(req.file)
            console.log(req.files)
           //CONEXION DEL SERVER
            const transporter = nodemailer.createTransport({
                host:'indsoftk.tech',
                port:'465',
                secure: true,
                auth: {
                    user: 'info@indsoftk.tech',
                    pass:'12251229'
                }
              });
              
              const mailOptions = {
                from: '',
                to: to,
                subject:subject,
                text:body,
                attachments: [
                  {
                   path: path
                  }
               ]
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  fs.unlink(path,function(err){
                    if(err){
                        return res.end(err)
                    }else{
                        console.log("deleted")
                        return res.redirect('/result.html')
                    }
                  })
                }
              });
        }
    })
});


module.exports = router;