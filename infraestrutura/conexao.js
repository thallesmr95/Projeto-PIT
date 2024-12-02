//Restaurante/infraestrutura/conexao.js

// Criação da instância para receber a conexão do mysql
const mysql = require("mysql");

const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "controle_restaurante", // inclusão da base de dados do HeidSql

});

module.exports = conexao;