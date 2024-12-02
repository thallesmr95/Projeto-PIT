// Restaurante/public/pedido.js
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(); // Carrega todos os produtos ao carregar a página
    atualizarStatusLogin(); // Atualiza o botão de login/status do cliente
});

let carrinho = [];
let produtosGlobais = []; // Guardará todos os produtos



function atualizarStatusLogin() {
    const statusUsuario = document.getElementById('status-usuario');
    const emailCliente = localStorage.getItem('email_cliente');

    if (emailCliente) {
        statusUsuario.textContent = `Cliente: ${emailCliente}`; // Exibe o email do cliente
    } else {
        statusUsuario.textContent = 'User'; // Exibe "Login" se não houver usuário logado
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(); // Carrega todos os produtos ao carregar a página
    atualizarStatusLogin(); // Atualiza o status de login
});



async function carregarProdutos() {
    const response = await fetch('/restaurante');
    const produtos = await response.json();
    produtosGlobais = produtos; // Armazena os produtos globalmente

    renderizarProdutos('todos'); // Exibe todos os produtos inicialmente
}


function renderizarProdutos(categoria) {
    const produtosDiv = document.getElementById('produtos');
    produtosDiv.innerHTML = '';

    // Filtra os produtos com base na categoria
    const produtosFiltrados = categoria === 'todos' ? produtosGlobais : produtosGlobais.filter(produto => produto.categoria === categoria);

    produtosFiltrados.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto-quadrante');
        
    // Verifica se o produto é "Suco de Laranja"
    let caminhoImagem;
    if (produto.servico === 'Suco de Laranja') {
        caminhoImagem = 'https://s2.glbimg.com/nD7Ao3HBAyAK7_g_Tt75yk1pEiY=/780x440/e.glbimg.com/og/ed/f/original/2019/01/15/31617293018_896bf29d55_k.jpg';
    } 
    
    else if (produto.servico === 'Batata Frita') {
        caminhoImagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgkqwehUioNabVzVEpglPPOENo7iWVUBIWXg&s';
    }

    else if (produto.servico === 'Parmegiana de Frango') {
        caminhoImagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdVq01xp17oKPYuUxRgxq9gnQvW5KBbg-gmQ&s';
    }

    else if (produto.servico === 'Costela com Barbecue') {
        caminhoImagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN8VAf1QaZBYzapp6IivdDeDmL72vdVB3pCQ&s';
    }

    else if (produto.servico === 'Salada de Frutas') {
        caminhoImagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjHmKaP4ez7FJNtQrqcPP0emKfbQ5BtSbfIQ&s';
    }

    else if (produto.servico === 'Suco de Maracujá') {
        caminhoImagem = 'https://i.pinimg.com/originals/09/13/44/091344b095fafc6d95d133382a2fca9c.jpg';
    }

    else if (produto.servico === 'Suco de Morango') {
        caminhoImagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv-ysNM4kz7JOsm6w0nH1sJ8I5h7x_3YFX6g&s';
    }

    else if (produto.servico === 'Anéis de Cebola') {
        caminhoImagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyCNp0uU4GYsPbSmUOOM3tFYbSFXLH8huaw&s';
    }

    else if (produto.servico === 'Pavê de Limão') {
        caminhoImagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtNKkpYlT-wLMpr2xDfTxP0zAT3z20lelu3A&s';
    }

    else if (produto.servico === 'Arroz de Forno') {
        caminhoImagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0SBiORHzliorRf4OZuSPTE1hY7yOQevl7Qg&s';
    }

    else if (produto.servico === 'Camarão Frito') {
        caminhoImagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8tfLx8lxded7fNzBOmoegy3L1pRaaqCpW1Q&s';
    }

    else if (produto.servico === '') {
        caminhoImagem = '';
    }
    
    else {
        // Caso contrário, usa o caminho padrão
        caminhoImagem = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRceyYGjdzyaUGy44tibneTSfpXPWuW-N9PKhfUoJbV0SVc15qz2vhYKVh1J2sZZnm1zcY&usqp=CAU`;
    }

    produtoDiv.innerHTML = `
        <img src="${caminhoImagem}" alt="${produto.servico}">
        <div>${produto.servico} - R$${produto.preco.toFixed(2)}</div>

    `;
        const adicionarBtn = document.createElement('button');
        adicionarBtn.innerText = 'Adicionar ao Carrinho';
        adicionarBtn.onclick = () => adicionarAoCarrinho(produto);

        produtoDiv.appendChild(adicionarBtn);
        produtosDiv.appendChild(produtoDiv);
    });
}

function filtrarCategoria(categoria) {
    renderizarProdutos(categoria);
}

function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    renderizarCarrinho();
}

// Função para renderizar o carrinho
function renderizarCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';

    carrinho.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('carrinho-item');
        
        // Coloca o produto, preço e botão "Remover" em uma linha
        itemDiv.innerHTML = `
            <span>${item.servico} - R$${item.preco.toFixed(2)}</span>
            <button onclick="removerDoCarrinho(${index})" class="remover-btn">Remover</button>
        `;

        carrinhoDiv.appendChild(itemDiv);
    });

    // Atualiza o total sempre que o carrinho for renderizado
    atualizarTotal();
}

// Função para remover produto do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1); // Remove o item do array do carrinho
    renderizarCarrinho(); // Re-renderiza o carrinho após a remoção
}

// Função para calcular e exibir o total
function atualizarTotal() {
    const total = carrinho.reduce((acc, produto) => acc + produto.preco, 0); // Soma os preços dos produtos no carrinho
    const totalDiv = document.getElementById('total');
    totalDiv.innerHTML = `Total: R$${total.toFixed(2)}`; // Atualiza o total no HTML
}

document.getElementById('finalizarCompra').addEventListener('click', async () => {
    if (carrinho.length === 0) {
        alert("O carrinho está vazio.");
        return;
    }

    const clienteId = localStorage.getItem('cliente_id');
    if (!clienteId) {
        alert("Erro: Cliente não identificado. Por favor, faça login novamente.");
        return;
    }

    // Monta o pedido com o cliente_id e itens do carrinho
    const pedido = {
        cliente_id: clienteId, 
        itens: carrinho 
    };

    try {
        // Envia o pedido para registrar na tabela 'pedidos'
        const response = await fetch('/pedidos/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar o pedido.');
        }

        const resultado = await response.json();
        const pedidoId = resultado.pedidoId;
        
        alert(`Pedido realizado com sucesso! ID do pedido: ${pedidoId}`);

        // Limpa o carrinho e atualiza a interface
        carrinho = [];
        renderizarCarrinho();
    } catch (error) {
        console.error(error);
        alert('Erro ao finalizar o pedido.');
    }
});

document.getElementById('logout').addEventListener('click', () => {
    // Aqui você pode limpar o armazenamento local (caso use para persistência de sessão)
    localStorage.clear(); // Opcional, caso haja dados de sessão

    // Redireciona para a página de login
    window.location.href = '/login'; // Ajuste o caminho conforme necessário
});

document.getElementById('link-carrinho').addEventListener('click', (event) => {
    event.preventDefault(); // Evita o comportamento padrão de rolagem

    const carrinhoSection = document.getElementById('carrinho-section');
    
    carrinhoSection.scrollIntoView({
        behavior: 'smooth', // Rolagem suave
        block: 'end',       // Centraliza o final da página
        inline: 'nearest'
    });
});


