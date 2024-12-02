// Restaurante/routers/pedidosRoute.js
const { Router } = require('express');
const conexao = require('../infraestrutura/conexao'); 
const router = Router();

router.post('/pedidos', (req, res) => {
    const { cliente_id, itens } = req.body; 
    if (!itens || itens.length === 0) {
        return res.status(400).json({ error: 'Nenhum item no carrinho' });
    }

    const total = itens.reduce((sum, item) => sum + parseFloat(item.preco), 0);
    const sqlPedido = 'INSERT INTO pedidos (cliente_id, total, data) VALUES (?, ?, NOW())';
    
    // Inicia a transação para garantir a integridade dos dados
    conexao.beginTransaction((err) => {
        if (err) {
            console.error('Erro ao iniciar transação:', err.message);
            return res.status(500).json({ error: 'Erro ao iniciar transação' });
        }

        // Insere o pedido na tabela 'pedidos'
        conexao.query(sqlPedido, [cliente_id, total], (error, results) => {
            if (error) {
                conexao.rollback(() => {
                    console.error('Erro ao inserir o pedido:', error.message);
                    res.status(500).json({ error: 'Erro ao inserir o pedido' });
                });
                return;
            }

            const pedidoId = results.insertId;
            const sqlItem = 'INSERT INTO itens_pedido (id, servico, preco) VALUES (?, ?, ?)';

            // Prepara as inserções dos itens do pedido
            const promises = itens.map(item => {
                return new Promise((resolve, reject) => {
                    conexao.query(sqlItem, [pedidoId, item.servico, item.preco], (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });
            });

            // Executa todas as inserções e finaliza a transação
            Promise.all(promises)
                .then(() => {
                    conexao.commit((commitErr) => {
                        if (commitErr) {
                            conexao.rollback(() => {
                                console.error('Erro ao confirmar transação:', commitErr.message);
                                res.status(500).json({ error: 'Erro ao finalizar o pedido' });
                            });
                        } else {
                            res.json({ message: 'Pedido realizado com sucesso!', pedidoId });
                        }
                    });
                })
                .catch(insertError => {
                    conexao.rollback(() => {
                        console.error('Erro ao inserir item do pedido:', insertError.message);
                        res.status(500).json({ error: 'Erro ao inserir item do pedido' });
                    });
                });
        });
    });
});

module.exports = router;
