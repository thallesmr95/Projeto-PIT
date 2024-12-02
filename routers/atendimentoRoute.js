const { Router } = require("express");
const conexao = require("../infraestrutura/conexao");
const router = Router();

// Rota para listar os itens de pedidos com filtro por período
router.get("/listar", (req, res) => {
    const { dataInicio, dataFim } = req.query;

    let sql = `
        SELECT 
            ip.id AS pedido_id,
            ip.servico,
            ip.preco,
            p.data,
            c.nome AS cliente_nome
        FROM itens_pedido ip
        INNER JOIN pedidos p ON ip.id = p.id
        INNER JOIN clientes c ON p.cliente_id = c.id
    `;

    const params = [];

    // Adiciona o filtro por período
    if (dataInicio && dataFim) {
        sql += " WHERE DATE(p.data) BETWEEN ? AND ?";
        params.push(dataInicio, dataFim);
    } else if (dataInicio) {
        sql += " WHERE DATE(p.data) >= ?";
        params.push(dataInicio);
    } else if (dataFim) {
        sql += " WHERE DATE(p.data) <= ?";
        params.push(dataFim);
    }

    sql += " ORDER BY ip.id ASC";

    conexao.query(sql, params, (error, results) => {
        if (error) {
            console.error("Erro ao consultar os itens de pedidos:", error.message);
            return res.status(500).json({ error: "Erro ao consultar os itens de pedidos." });
        }
        res.json(results);
    });
});

module.exports = router;
