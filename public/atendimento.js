document.addEventListener("DOMContentLoaded", () => {
    const fetchPedidos = (dataInicio, dataFim) => {
        let url = "/atendimento/listar";
        const params = new URLSearchParams();

        if (dataInicio) params.append("dataInicio", dataInicio);
        if (dataFim) params.append("dataFim", dataFim);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector("#tabelaPedidos tbody");
                tbody.innerHTML = ""; // Limpa a tabela antes de preencher
                data.forEach(item => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${item.pedido_id}</td>
                        <td>${item.servico}</td>
                        <td>${item.preco.toFixed(2)}</td>
                        <td>${new Date(item.data).toLocaleString()}</td>
                        <td>${item.cliente_nome}</td>
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                console.error("Erro ao carregar os itens de pedidos:", error);
            });
    };

    // Busca inicial sem filtro
    fetchPedidos();

    // Adiciona evento ao botão de filtro
    const filtrarBtn = document.getElementById("filtrar");
    filtrarBtn.addEventListener("click", () => {
        const dataInicio = document.getElementById("dataInicio").value;
        const dataFim = document.getElementById("dataFim").value;
        fetchPedidos(dataInicio, dataFim);
    });
});
