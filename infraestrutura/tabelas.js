//Restaurante/infraestrutura/tabela.js
class Tabelas{
    init(conexao){
        this.conexao = conexao;
        this.CriarTabelaRestaurante();
        this.CriarTabelaPedidos();  // Chamando a função para criar a tabela de pedidos
}

CriarTabelaRestaurante(){
    const sql = `
    CREATE TABLE IF NOT EXISTS restaurante (
        servico VARCHAR(100),
        preco decimal(10,2)

    );`;
    
    this.conexao.query(sql, (error) => {
        if(error){
            console.log("Erro na hora de criar a tabela");
            console.log(error.message());
            return;
        }
        console.log("Tabela 'Restaurante' criada com sucesso!");
    });
    }


CriarTabelaPedidos() {
    const sql = `
    CREATE TABLE IF NOT EXISTS pedidos (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        total decimal(10,2),
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    this.conexao.query(sql, (error) => {
        if (error) {s
            console.log("Erro na hora de criar a tabela pedidos");
            console.log(error.message);
            return;
        }
        console.log("Tabela 'Pedido' criada com sucesso!");
    });
}

CriarTabelaClientes() {
    const sql = `
    CREATE TABLE IF NOT EXISTS clientes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100),
        email VARCHAR(100),
        senha VARCHAR(255)
);`;

    this.conexao.query(sql, (error) => {
        if (error) {s
            console.log("Erro na hora de criar a tabela pedidos");
            console.log(error.message);
            return;
        }
        console.log("Tabela 'Clientes' criada com sucesso!");
    });
}


CriarTabelaItensPedido() {
    const sql = `
    CREATE TABLE IF NOT EXISTS itens_pedido (
        id_item INT AUTO_INCREMENT PRIMARY KEY,
        id INT, 
        servico VARCHAR(100),
        preco DECIMAL(10,2),
        FOREIGN KEY (id) REFERENCES pedidos(id)
    );`;

    this.conexao.query(sql, (error) => {
        if (error) {
            console.log("Erro ao criar a tabela itens_pedido:", error.message);
            return;
        }
        console.log("Tabela 'itens_pedido' criada com sucesso!");
    });
}


}


module.exports = new Tabelas();