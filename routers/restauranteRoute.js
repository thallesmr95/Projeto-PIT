// Restaurante/routers/RestauranteRoute.js
const { Router } = require("express");
const router = Router();
const conexao = require("../infraestrutura/conexao");

// Rota para listar todos os pedidos
router.get("/restaurante", (req, res) => {
    const sql = 'SELECT * FROM restaurante';
    conexao.query(sql, (error, resultados) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json(resultados);
    });
});

// Rota para criar um novo pedido
router.post("/restaurante", (req, res) => {
    const { servico, preco, categoria } = req.body;
    
    const precoDecimal = parseFloat(preco).toFixed(2); // Garante que o valor do preço é um decimal com 2 casas decimais

    const sql = 'INSERT INTO restaurante (servico, preco, categoria, status) VALUES (?, ?, ?, "ativo")';

    conexao.query(sql, [servico, precoDecimal, categoria], (error) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ message: "Pedido adicionado com sucesso" });
    });
});

// Rota para deletar um pedido pelo ID
router.delete("/restaurante/:id", (req, res) => {
    const { id } = req.params;
    
    const sql = 'DELETE FROM restaurante WHERE id = ?';

    conexao.query(sql, [id], (error, resultados) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ message: "Pedido removido com sucesso" });
    });
});


// Rota para atualizar um pedido pelo ID
router.put("/restaurante/:id", (req, res) => {
    const { id } = req.params;
    const { servico, preco } = req.body;
    
    const sql = 'UPDATE restaurante SET servico = ?, preco = ? WHERE id = ?';
    
    conexao.query(sql, [servico, preco, id], (error, resultados) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ message: "Pedido atualizado com sucesso" });
    });
});

module.exports = router;
