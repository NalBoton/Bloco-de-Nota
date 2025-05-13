// Array para armazenar as notas
let notasSalvas = [];

// Função para definir nome do usuário
function definirNomeUsuario() {
    let nomeSalvo = localStorage.getItem('nomeUsuario');
    if (!nomeSalvo) {
        let nome = prompt("Qual o seu nome?");
        if (nome && nome.trim() !== "") {
            localStorage.setItem('nomeUsuario', nome);
            nomeSalvo = nome;
        } else {
            nomeSalvo = "Visitante";
        }
    }
    document.getElementById('boas-vindas').textContent = `Seja bem vindo, ${nomeSalvo}!`;
}

// Função para carregar notas do localStorage quando a página carrega
window.onload = function () {
    definirNomeUsuario();

    let notasNoStorage = localStorage.getItem('notas');
    if (notasNoStorage) {
        notasSalvas = JSON.parse(notasNoStorage);
        notasSalvas.forEach(nota => {
            adicionarNotaNaTela(nota);
        });
    }
}

// Função para adicionar notas
function addnotas() {
    let titulo = document.getElementById('nota-nome').value.trim();
    let conteudo = document.getElementById('notad').value.trim();

    if (titulo === '' || conteudo === '') {
        alert("Por favor, preencha o título e a nota!");
        return;
    }

    let nota = {
        id: Date.now(),
        titulo: titulo,
        conteudo: conteudo
    };

    notasSalvas.push(nota);
    salvarNotasNoStorage();
    adicionarNotaNaTela(nota);

    document.getElementById('nota-nome').value = '';
    document.getElementById('notad').value = '';
}

// Função para adicionar a nota na tela
function adicionarNotaNaTela(nota) {
    let listaNotas = document.getElementById('notas');
    let itemNota = document.createElement('li');
    itemNota.setAttribute('id', `nota-${nota.id}`);
    itemNota.innerHTML = `<strong>${nota.titulo}</strong>: ${nota.conteudo} 
        <button class="botao-apagar" onclick="apagarNota(${nota.id})">🗑️</button>`;
    listaNotas.appendChild(itemNota);
}

// Função para apagar nota individual
function apagarNota(id) {
    notasSalvas = notasSalvas.filter(nota => nota.id !== id);
    salvarNotasNoStorage();

    let notaParaRemover = document.getElementById(`nota-${id}`);
    if (notaParaRemover) {
        notaParaRemover.remove();
    }
}

// Função para apagar todas as notas
function apagarTodasNotas() {
    if (confirm("Tem certeza que deseja apagar todas as notas?")) {
        notasSalvas = [];
        localStorage.removeItem('notas');
        document.getElementById('notas').innerHTML = '';
    }
}

// Função para salvar notas no localStorage
function salvarNotasNoStorage() {
    localStorage.setItem('notas', JSON.stringify(notasSalvas));
}

// Função para filtrar notas na pesquisa
function filtrarNotas() {
    let termoPesquisa = document.getElementById('pesquisa-nota').value.toLowerCase();
    let listaNotas = document.getElementById('notas').getElementsByTagName('li');

    for (let nota of listaNotas) {
        let textoNota = nota.textContent.toLowerCase();
        if (textoNota.includes(termoPesquisa)) {
            nota.style.display = "list-item";
        } else {
            nota.style.display = "none";
        }
    }
}

// Função para limpar a pesquisa
function limparPesquisa() {
    document.getElementById('pesquisa-nota').value = '';
    filtrarNotas();
}
