// netlify/functions/enviarFormulario.js
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const { nome, email } = JSON.parse(event.body);

    // Configuração do nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "hellan.lins@gmail.com", // Seu e-mail
            pass: "qqli qihv lkmp pdej",           // Senha de aplicativo do Gmail    
        },
    });

    const mailOptions = {
        from: email,
        to: 'seu_email@gmail.com',
        subject: `Novo contato de ${nome}`,
        text: `Nome: ${nome}\nEmail: ${email}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email enviado com sucesso!' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao enviar email', error }),
        };
    }
};