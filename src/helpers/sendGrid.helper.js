const nodemailer = require('nodemailer');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


const transporter = nodemailer.createTransport({
    service: 'gmail',  // Usamos 'gmail' como servicio
    auth: {
        user: process.env.EMAIL_FROM,  // Tu correo de Gmail
        pass: process.env.EMAIL_PASSWORD  // Contraseña de aplicación generada
    },
    tls: {
        rejectUnauthorized: false,  // Permite la conexión sin verificar el certificado
    },
});

const sendEmail = async (receiver, subject, content) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,  // Tu correo de Gmail
            to: receiver,                  // Correo del destinatario
            subject: subject,              // Asunto
            html: content,                 // Contenido del correo
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, message: 'Correo enviado exitosamente', info: info };
    } catch (error) {
        console.error('Error al enviar el correo:', error.message);
        return { success: false, message: error.message };
    }
};

module.exports = {
    sendEmail
};