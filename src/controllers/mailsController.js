const {Request, Response} = require('express');
const nodemailer = require("nodemailer");

class Mails{
   
    async EnviarEmail (req, res){
        try {
            const data = req.body;
            const moment = require('moment');

            data.entrada = moment(data.entrada).format('DD/MM/YYYY'); 
            data.salida = moment(data.salida).format('DD/MM/YYYY'); 

            var contentHTML = `
            <header style="text-align: center; height: 18vh; background-color: rgb(36, 36, 36);">
            <img src="https://res.cloudinary.com/creation-code/image/upload/v1639262935/logito_lqpoqs.png" alt="" style="line-height: 200px; margin: 0 auto;" height="130px" width="230px">
            </header>
            <div style="margin-top: 30px; text-align: center; font-family: Arial, Helvetica, sans-serif;">
                <br>
                <h4 style="color: rgb(73, 73, 73);">Parece que alguien necesita información de tu alojamiento publicado en nuestra web</h4>
                <hr style="margin-top: 3px;
                margin-bottom: 3px;
                border-top: 1px solid #F20746;
                width: 80%;">
                <h4 style="color: rgb(65, 65, 65);">No tardes en responder 😁</h5>
                <br>
            </div>
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: rgb(240, 240, 240); padding: 20px;">
                    <div style= "width: 400px; margin: 0 auto;">
                            <p><strong>Nombre:</strong> ${data.name}</p>
                            <p><strong>Provincia:</strong> ${data.state}</p>
                            <p><strong>Email:</strong> ${data.email}</p>
                            <p><strong>Telefono:</strong> ${data.phone}</p><br>
                            <p><strong>Desde:</strong> ${data.entrada}</p>
                            <p><strong>Hasta:</strong> ${data.salida}</p>
                            <p><strong>Personas:</strong> ${data.total} en total, mayores ${data.mayor} y menores ${data.menor}</p>
                            <p><strong>Consulta:</strong> ${data.message}</p>
                    </div>
            </div>
            <div style=" text-align: center; font-family: Arial, Helvetica, sans-serif;">
                            <br>
                            <h4 style="color: rgb(65, 65, 65);">Una respuesta rapida y buena atención es clave a la hora de concretar una reserva 😉</h4>
                            <hr style="margin-top: 3px;
                            margin-bottom: 5px;
                            border-top: 1px solid #F20746;
                            width: 80%;">
                            <p> © 2021 Copyright: <a href="">valleserrano.com</a></p>
                        
            </div>
    `
            
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                  user: 'valleserranotraslasierra@gmail.com', // generated ethereal user
                  pass: 'ygznjtkuyxwmlbtv', // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                },
            })
    
            const info = await transporter.sendMail({
                from: data.email,
                replyTo: data.email,
                // from: 'ValleSerrano.com',
                to: data.hospedante,
                subject: 'Consulta por tu Alojamiento /' + data.alojamiento,
                html: contentHTML
            })
    
            if(info.messageId!=''){
                res.json('Recibido');
            }else{
                res.json('Error');
            }

        } catch (error) {
            console.log(error)
            res.json({ message : error});
        }
     };

    async EnviarDatos (req, res){
        try {
            const data = req.body;
          
            var Servicios = JSON.stringify(data.servicios, null, 4)
            var Pagos = JSON.stringify(data.pagos, null, 4)

            var contentHTML = `
            <p> Nombre: ${data.name}</p>
            <p> Localidad: ${data.localidad}</p>
            <p> Direccion: ${data.direccion}</p>
            <p> Categoria: ${data.categoria}</p>
            <p> Capacidad: ${data.capacidad}</p>
            <p> Habitaciones: ${data.habitaciones}</p>
            <p> Descripcion: ${data.descripcion}</p>
            <hr>
            <p> Precio: ${data.precio}</p>
            <p> Condicion: ${data.condicion}</p>
            <hr>
            <p> Telefono1: ${data.telefono1}</p>
            <p> Telefono2: ${data.telefono2}</p>
            <p> Wpp: ${data.wpp}</p>
            <p> Web: ${data.web}</p>
            <p> Mail: ${data.mail}</p>
            <hr>
            <p> Reservas: ${data.reservas}</p>
            <p> Entrada: ${data.entrada}</p>
            <p> Salida: ${data.salida}</p>
            <p> Visitas: ${data.visitas}</p>
            <hr>
            Pagos- <br>
            <p> ${Pagos}</p>
            <hr>
            Servicios- <br>
            <p> ${Servicios}</p>
            `
           
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                  user: 'valleserranotraslasierra@gmail.com', // generated ethereal user
                  pass: 'ygznjtkuyxwmlbtv', // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                },
            })
    
            const info = await transporter.sendMail({
                from: 'valleserranotraslasierra@gmail.com',
                to: "nahu852na@gmail.com",
                subject: 'Datos de nuevo alojamiento a publicar',
                html: contentHTML
            })
    
            if(info.messageId!=''){
                res.json('Recibido');
            }else{
                res.json('Error');
            }

        } catch (error) {
            console.log(error)
            res.json({ message : error});
        }
    };
}


const mail = new Mails;
exports.default = mail;