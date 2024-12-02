// Restaurante/public/script.js

document.addEventListener('DOMContentLoaded', () => {
    listarPedidos(); // Chama a função para listar os pedidos quando a página for carregada
});

document.getElementById('restauranteForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const servico = document.getElementById('servico').value;
    const preco = parseFloat(document.getElementById('preco').value); // Capturando o preço como número decimal
    const categoria = document.getElementById('categoria').value;

    const response = await fetch('/restaurante', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ servico, preco, categoria })
    });

    const resultado = await response.json();
    alert(resultado.message);
    listarPedidos(); // Atualiza a lista após adicionar um novo pedido

    // Limpa os campos após o envio
    document.getElementById('servico').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('categoria').value = '';
});

async function listarPedidos() {
    const response = await fetch('/restaurante');
    const pedidos = await response.json();

    const lista = document.getElementById('listaPedidos');
    lista.innerHTML = ''; // Limpa a lista antes de carregar os pedidos

    pedidos.forEach(pedido => {
        const item = document.createElement('div');
        item.classList.add('pedido-item'); // Classe para cada item

        // Div de exibição de serviço
        const servicoDiv = document.createElement('div');
        servicoDiv.classList.add('pedido-servico');
        servicoDiv.innerText = `Serviço: ${pedido.servico}`;
        
        // Div de exibição de preço
        const precoDiv = document.createElement('div');
        precoDiv.classList.add('pedido-preco');
        precoDiv.innerText = `Preço: R$${parseFloat(pedido.preco).toFixed(2)}`;

        // Div de exibição de categoria
        const categoriaDiv = document.createElement('div');
        categoriaDiv.classList.add('pedido-categoria');
        categoriaDiv.innerText = `Categoria: ${pedido.categoria}`;


        // Cria o botão de alterar
        const alterarBtn = document.createElement('button');
        alterarBtn.classList.add('alterar');
        alterarBtn.innerText = 'Alterar';

        // Cria o botão de remover
        const removerBtn = document.createElement('button');
        removerBtn.classList.add('remover');
        removerBtn.innerText = 'Remover';

        // Função de remover
        removerBtn.onclick = async () => {
            if (confirm(`Tem certeza que deseja remover o serviço: ${pedido.servico}?`)) {
                await removerPedido(pedido.id);
                listarPedidos(); // Atualiza a lista após a remoção
            }
        };

        // Campos de edição de serviço e preço (escondidos inicialmente)
        const editServicoInput = document.createElement('input');
        editServicoInput.type = 'text';
        editServicoInput.value = pedido.servico;
        editServicoInput.style.display = 'none'; // Escondido inicialmente

        const editPrecoInput = document.createElement('input');
        editPrecoInput.type = 'number';
        editPrecoInput.value = parseFloat(pedido.preco).toFixed(2);
        editPrecoInput.style.display = 'none'; // Escondido inicialmente

        const editCategoriaInput = document.createElement('input');
        editCategoriaInput.type = 'text';
        editCategoriaInput.value = pedido.categoria;
        editCategoriaInput.style.display = 'none'; // Escondido inicialmente

        // Botão de salvar (escondido inicialmente)
        const salvarBtn = document.createElement('button');
        salvarBtn.innerText = 'Salvar';
        salvarBtn.style.display = 'none'; // Escondido inicialmente

        // Função de alterar
        alterarBtn.onclick = () => {
            // Mostra os campos de edição e esconde o texto e os botões de ação
            servicoDiv.style.display = 'none';
            precoDiv.style.display = 'none';
            categoriaDiv.style.display = 'none';           
            alterarBtn.style.display = 'none';
            removerBtn.style.display = 'none';
            editServicoInput.style.display = 'inline-block';
            editPrecoInput.style.display = 'inline-block';
            salvarBtn.style.display = 'inline-block';
        };

        // Função de salvar as alterações
        salvarBtn.onclick = async () => {
            const novoServico = editServicoInput.value;
            const novoPreco = parseFloat(editPrecoInput.value).toFixed(2);
            const novaCategoria = editCategoriaInput.value;

            await alterarPedido(pedido.id, novoServico, novoPreco, novaCategoria);

            // Atualiza os elementos visuais
            servicoDiv.innerText = `Serviço: ${novoServico}`;
            precoDiv.innerText = `Preço: R$${novoPreco}`;
            categoriaDiv.innerText = `Categoria: ${novaCategoria}`;

            // Volta ao modo de exibição
            servicoDiv.style.display = 'block';
            precoDiv.style.display = 'block';
            categoriaDiv.style.display = 'block';            
            alterarBtn.style.display = 'inline-block';
            removerBtn.style.display = 'inline-block';
            editServicoInput.style.display = 'none';
            editPrecoInput.style.display = 'none';
            editCategoriaInput.style.display = 'none';
            salvarBtn.style.display = 'none';
        };

        // Adiciona os elementos ao item
        item.appendChild(servicoDiv);
        item.appendChild(precoDiv);
        item.appendChild(categoriaDiv);
        item.appendChild(alterarBtn);
        item.appendChild(removerBtn);
        item.appendChild(editServicoInput);
        item.appendChild(editPrecoInput);
        item.appendChild(editCategoriaInput);
        item.appendChild(salvarBtn);

        // Adiciona o item à lista de pedidos
        lista.appendChild(item);
    });
}

// Função para alterar um pedido
async function alterarPedido(id, servico, preco, categoria) {
    const response = await fetch(`/restaurante/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ servico, preco, categoria })
    });
    const resultado = await response.json();
    alert(resultado.message);
}

// Função para remover um pedido do banco de dados
async function removerPedido(id) {
    const response = await fetch(`/restaurante/${id}`, {
        method: 'DELETE',
    });
    const resultado = await response.json();
    alert(resultado.message);
}


