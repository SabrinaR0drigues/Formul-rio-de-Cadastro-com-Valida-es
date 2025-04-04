document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário se houver erros

    let nome = document.getElementById("nome").value.trim();
    let dataNascimento = document.getElementById("dataNascimento").value;
    let cpf = document.getElementById("cpf").value.trim();
    let telefone = document.getElementById("telefone").value.trim();
    let endereco = document.getElementById("endereco").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value;
    let confirmarSenha = document.getElementById("confirmarSenha").value;
    let maiorIdade = document.getElementById("maiorIdade");

    if (nome.length < 3) {
        alert("O nome deve ter pelo menos 3 caracteres.");
        return;
    }

    if (!validarCPF(cpf)) {
        alert("CPF inválido!");
        return;
    }

    if (!validarTelefone(telefone)) {
        alert("Número de telefone inválido!");
        return;
    }

    let idade = calcularIdade(dataNascimento);
    maiorIdade.checked = idade >= 18;

    if (!validarEmail(email)) {
        alert("E-mail inválido!");
        return;
    }

    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não conferem.");
        return;
    }

    alert("Cadastro realizado com sucesso!");
});

// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
}

// Função para validar telefone
function validarTelefone(telefone) {
    let regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(telefone);
}

// Função para calcular idade
function calcularIdade(dataNascimento) {
    let hoje = new Date();
    let nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    let m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
    return idade;
}

// Função para validar e-mail
function validarEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
