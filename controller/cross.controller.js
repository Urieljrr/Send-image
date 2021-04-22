const { response } = require("express");

const nodemailer = require('nodemailer');
const multer = require('multer');

const fs = require('fs');



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
}).single("image");

const sendData = (req, res = response) => {
    
    upload(req,res,function(err){
        if(err){
            console.log(err)
            return res.end("Something went wrong!");
        }else{
        
            path = req.file.path
        
            const { 
                name,
                last,
                age,
                phone,
                email,
                category,
                injuries,
                state,
                description
                } = req.body;

            contentHtml = `
            <h1>Nuevo Registro</h1>
            <small>Registro de Convocatoria</small>
            <table style="width:100%">
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>Categoria</th>
                    <th>Leciones</th>
                    <th>Estado de residencia</th>
                </tr>
                <tr>
                    <td>${name}</td>
                    <td>${last}</td>
                    <td>${age}</td>
                    <td>${phone}</td>
                    <td>${email}</td>
                    <td>${category}</td>
                    <td>${injuries}</td>
                    <td>${state}</td>
                </tr>
            </table>
            <table style="width:100%">
                <tr>
                    <th>Descripcion</th>
                </tr>
                <tr>
                    <td>${description}</td>
                </tr>
            </table>`

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
                from: `${email}`,
                //to: 'abidaluz15@gmail.con',
                to: 'themacmacka@gmail.con',
                cc: 'mac@indsoftk.tech',
                subject:'Nuevo Registro',
                html:contentHtml,
                attachments: [
                  {
                   path: path
                  }
               ]
              };
              //TRASPORTER
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
                        // return res.json({
                        //     ok:true,
                        //     message:'Email sent successfully!!!'
                        // })
                        return res.redirect('/send.html');
                    }
                  })
                }
              });
              //END TRASPORTER
        }
    });
}


module.exports = {
    sendData
}
