// Restaurante/routers/index.js

const routerRestaurante = require("./restauranteRoute");
const pedidosRoute = require("./pedidosRoute"); // Adicione a rota para pedidos
const routerClientes = require("./clientesRoute"); // Adiciona a rota para o cliente
const atendimentoRoute = require("./atendimentoRoute"); // Importa a nova rota de atendimento

module.exports = (app) => {
    app.use(routerRestaurante); // Rotas do restaurante
    app.use('/pedidos', pedidosRoute); // Defina a rota /cliente para o cliente
    app.use(routerClientes); // Rotas de clientes, incluindo login e cadastro
    app.use('/atendimento', atendimentoRoute);
};