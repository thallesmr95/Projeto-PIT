// Restaurante/index.js
const express = require('express');
const app = express();
const port = 3000;
const router = require("./routers/index")
const conexao = require("./infraestrutura/conexao") // importação do conexao.js 
const tabelas = require("./infraestrutura/tabelas") // importação da tabelas.js 
const path = require('path');


tabelas.init(conexao);

// Middleware para interpretar JSON
app.use(express.json()); // Adiciona o middleware para tratar requisições JSON

app.use(express.static('public')); // Serve arquivos estáticos da pasta public

app.use(express.json());


router(app);

// Rota para servir a página do pedido
app.get('/pedidos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pedido.html'));
});

app.listen(port,(error)=>{
    if (error){
        console.log("Erro");
        return;
    }
    console.log("\nOperação concluída.\n");
}); 


// Rota para servir a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para servir a página de cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});


// Rota para servir a página de atendimento
app.get('/atendimento', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'atendimento.html'));
});