// Restaurante/public/login.js
// Manipulador para o formulário de login
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
    });

    const result = await response.json();
// Altere a resposta do login para incluir o cliente_id no resultado
if (result.success) {
    // Armazena o cliente_id no localStorage
    localStorage.setItem('cliente_id', result.cliente_id);
    localStorage.setItem('email_cliente', email); // Armazena o email
    window.location.href = '/pedidos'; // Redireciona para a página de pedidos
} else {
    alert('Credenciais inválidas');
}
});

// Manipulador para o formulário de cadastro
document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');

    const response = await fetch('/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nome.value, email: email.value, senha: senha.value }),
    });

    const result = await response.json();
    if (result.success) {
        alert('Cadastro realizado com sucesso!');

        // Limpa os campos do formulário
        nome.value = '';
        email.value = '';
        senha.value = '';
    } else {
        alert('Erro no cadastro. E-mail inválido!');
    }
});

// Redireciona para a página de cadastro ao clicar no botão "Cadastrar"
document.getElementById('btn-cadastrar').addEventListener('click', () => {
    window.location.href = '/cadastro'; // Redireciona para a página de cadastro
});