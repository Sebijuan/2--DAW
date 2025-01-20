// filepath: /c:/Users/sebip/OneDrive/Documentos/GitHub/2--DAW/EntornoServidor/T2/28-smtp-service/my-nodejs-project/app/index.js
require('dotenv').config();
const nodemailer = require('nodemailer');

// Configurar el transporte para MailHog
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false,
});

// Configuración del correo
const mailOptions = {
  from: '"Tu Proyecto" <no-reply@example.com>',
  to: process.env.RECIPIENT_EMAIL,
  subject: 'Correo de prueba',
  text: 'Este es un correo enviado automáticamente cada 10 minutos.',
};

// Función para enviar correos
const sendEmail = () => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

// Enviar correo cada 10 minutos
setInterval(sendEmail, 10 * 60 * 1000); // 10 minutos en milisegundos

// Enviar uno al iniciar
sendEmail();