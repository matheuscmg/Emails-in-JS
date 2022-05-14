const express = require("express");
const app = express();
const PORT = 3000;
var session = require('express-session');
var nodemailer = require('nodemailer');



app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "chave criptográfica",
    secure: false,
    resave: false,
    saveUninitialized: false
    }));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/cadastrar.html');

    if (req.session.views) {
        req.session.views++;
        res.send('views: ' + req.session.views);
        } else {
        req.session.views = 1
        res.send('Sessão iniciada! views:' + 
        req.session.views);
        }

});

    let emailUsuario = [];
    let senhaUsuario = [];
    let nomeUsuario = [];


app.post("/cadastrar", function (req, res) {



    for(let i =0; i<=emailUsuario.length; i++)
    {

        if(emailUsuario[i] == req.body.email)
        {
            res.send("Email já cadastrado");
            break;
        }
        else
        {
            emailUsuario.push(req.body.email);
            senhaUsuario.push(req.body.senha);
            nomeUsuario.push(req.body.nome);
            console.log(nomeUsuario + " " + emailUsuario )
            res.sendFile(__dirname + "/logar.html")
            break;
        }

    }          
    
})

app.post("/logar", function (req, res){  
    
    let email = req.body.email;
    let senha =req.body.senha;
    
    for(let i =0; i<emailUsuario.length; i++){

        if(emailUsuario[i] == email  && senhaUsuario[i] == senha)
        {
            res.sendFile(__dirname + "/email.html");
            //res.send(emailUsuario);
            break;
        }
        else if(i == emailUsuario.length-1){
            console.log("Usuario não cadastrado")
            res.send("Usuario não existe!")
            res.status(404);
        }       

    }
})

app.post("/email", function(req, res){

    
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'seuemail',
          pass: 'suasenha'
        }
      });

      transporter.sendMail({
        
        from: 'matheuspisco@hotmail.com',
        to: req.body.email,
        subject: req.body.assunto,
        text: req.body.mensagem,
        
       });
       console.log("Email enviado com sucesso!");
})

app.get('/deslogar', function(req, res) {
    req.session.destroy(function() {
    res.send("Sessão finalizada!");
    });
    });

app.listen(PORT, function() {
    console.log(`O servidor está escutando na porta ${PORT}!`);
});
