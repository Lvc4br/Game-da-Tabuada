const telaInicial = document.querySelector("#telaInicial");
const telaFinal = document.querySelector("#telaFinal");
const form = document.querySelector("#tabuada");
const mensagem = document.querySelector("#mensagem");

const btnIniciar = document.querySelector("#iniciar");
const btnNovamente = document.querySelector("#jogarNovamente");

const valorA = document.querySelector("#ValorA");
const valorB = document.querySelector("#ValorB");
const rUser = document.querySelector("#respUser");

const txtAcertos = document.querySelector("#acertosUser");
const txtErros = document.querySelector("#errosUser");
const txtRecorde = document.querySelector("#recorde");

const scoreFinal = document.querySelector("#scoreFinal");
const recordeFinal = document.querySelector("#recordeFinal");

let a, b;
let acertos = 0;
let erros = 0;
let jogoAtivo = false;
let novoRecorde = false;

const LIMITE_ERROS = 3;
const CHAVE_RECORDE = "recordeTabuada";

// Recupera o recorde salvo no navegador
let recorde = Number(localStorage.getItem(CHAVE_RECORDE)) || 0;

txtRecorde.textContent = recorde;

// Eventos dos botões
btnIniciar.addEventListener("click", iniciarJogo);
btnNovamente.addEventListener("click", iniciarJogo);

// Impede o formulário de recarregar a página
form.addEventListener("submit", (event) => {
    event.preventDefault();
    conferir();
});

function iniciarJogo() {
    acertos = 0;
    erros = 0;
    jogoAtivo = true;
    novoRecorde = false;

    txtAcertos.textContent = acertos;
    txtErros.textContent = erros;
    txtRecorde.textContent = recorde;

    mensagem.textContent = "";
    mensagem.hidden = true;

    telaInicial.hidden = true;
    telaFinal.hidden = true;
    form.hidden = false;

    gerarPergunta();
    rUser.focus();
}

function gerarPergunta() {
    a = Math.ceil(Math.random() * 10);
    b = Math.ceil(Math.random() * 10);

    valorA.textContent = a;
    valorB.textContent = b;

    rUser.value = "";
    rUser.focus();
}

function conferir() {
    if (!jogoAtivo || rUser.value.trim() === "") {
        return;
    }

    const resposta = Number(rUser.value);
    const respostaCorreta = a * b;

    if (resposta === respostaCorreta) {
        acertos++;
        txtAcertos.textContent = acertos;

        // Atualiza e salva o recorde
        if (acertos > recorde) {
            recorde = acertos;
            novoRecorde = true;

            localStorage.setItem(CHAVE_RECORDE, recorde);

            txtRecorde.textContent = recorde;

            mensagem.textContent = "NOVO RECORDE!";
            mensagem.hidden = false;
        } else {
            mensagem.textContent = "";
            mensagem.hidden = true;
        }
    } else {
        erros++;
        txtErros.textContent = erros;

        mensagem.textContent = "RESPOSTA INCORRETA!";
        mensagem.hidden = false;
    }

    if (erros >= LIMITE_ERROS) {
        encerrarJogo();
    } else {
        gerarPergunta();
    }
}

function encerrarJogo() {
    jogoAtivo = false;

    form.hidden = true;
    telaFinal.hidden = false;
    mensagem.hidden = false;

    scoreFinal.textContent = acertos;
    recordeFinal.textContent = recorde;

    if (novoRecorde) {
        mensagem.textContent = "PARABÉNS! VOCÊ BATEU SEU RECORDE!";
    } else {
        mensagem.textContent = "FIM DE JOGO! TENTE NOVAMENTE!";
    }
}
