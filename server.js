const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const port = 3000;

// Configurar middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir arquivos estáticos (como CSS, JS ou imagens)
app.use(express.static(path.join(__dirname, "public")));
app.use('/script', express.static(path.join(__dirname, 'script')));
app.use('/imagens', express.static(path.join(__dirname, 'imagens')));

// Configuração do nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "hellan.lins@gmail.com", // Seu e-mail
        pass: "qqli qihv lkmp pdej",           // Senha de aplicativo do Gmail
    },
});

// Rota para processar o formulário
app.post("/enviar-formulario", (req, res) => {
    const { nome, telefone, email, website, sites, dtEnvio, nome_site } = req.body;

    // Configuração do e-mail
    const mailOptions = {
        from: email,
        to: "hellan.lins@gmail.com",
        subject: `Novo contato de ${nome}`,
        text: `
            Nome Completo: ${nome}
            Telefone: ${telefone}
            Email: ${email}
            Portfólio/Site: ${website || "Não informado"}
            Quantidade de sites: ${sites || "1"}
            Data de Envio: ${dtEnvio}
            Nome do Site: ${nome_site || "Não informado"}
        `,
    };

    // Enviar e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erro ao enviar o e-mail:", error);
            res.send(`
                <html>
                    <head>
                        <title>Erro no envio</title>
                        <link rel="stylesheet" href="/style.css">
                    </head>
                    <body>
                        <div class="response">
                            <h1>Erro ao enviar o email</h1>
                            <p>Ocorreu um problema ao enviar seu email. Tente novamente mais tarde.</p>
                            <button onclick="window.location.href='/'">Voltar para o site</button>
                        </div>
                    </body>
                </html>
            `);
        } else {
            console.log("E-mail enviado:", info.response);
            res.send(`
                <html>
                    <head>
                        <title>Email enviado</title>
                        <link rel="stylesheet" href="/style.css">
                    </head>
                    <body>
                        <div class="response">
                            <h1>Email enviado com sucesso!</h1>
                            <p>Obrigado por entrar em contato, ${nome}. Responderemos em breve.</p>
                            <button onclick="window.location.href='/'">Voltar para o site</button>
                        </div>
                    </body>
                </html>
            `);
        }
    });
});

// Rota para a página principal
app.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store'); // Adiciona cabeçalho para evitar cache
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("Erro ao servir index.html:", err);
            res.status(500).send("Erro ao carregar a página inicial");
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});