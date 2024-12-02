// Restaurante/routers/clientesRoute.js
const express = require('express');
const router = express.Router();
const conexao = require('../infraestrutura/conexao');

// Rota de Login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM clientes WHERE email = ? AND senha = ?';
    conexao.query(sql, [email, senha], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (results.length > 0) {
            // Envia o cliente_id ao frontend para armazená-lo
            res.json({ success: true, cliente_id: results[0].id });
        } else {
            res.json({ success: false, message: 'Credenciais inválidas' });
        }
    });
});


// Rota de Cadastro com verificação de e-mail
router.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se o e-mail já existe
    const sqlVerificarEmail = 'SELECT * FROM clientes WHERE email = ?';
    conexao.query(sqlVerificarEmail, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (results.length > 0) {
            // E-mail já cadastrado
            return res.json({ success: false, message: 'E-mail já cadastrado' });
        } else {
            // Insere o novo usuário
            const sqlInserirUsuario = 'INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)';
            conexao.query(sqlInserirUsuario, [nome, email, senha], (error, results) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Erro ao cadastrar o usuário' });
                }

                res.json({ success: true, message: 'Cadastro realizado com sucesso!' });
            });
        }
    });
});

module.exports = router;