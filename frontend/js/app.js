/**
 * ==========================================
 * Agenda NF
 * app.js
 * Arquivo principal da aplicação
 * ==========================================
 */

import {
    carregarAgenda,
    pesquisarAgenda,
    pesquisarPorPeriodo,
    atualizarTabela
} from "./tabela.js";

import {
    novoCadastro
} from "./cadastro.js";

/**
 * Inicialização
 */
document.addEventListener("DOMContentLoaded", async () => {

    const pagina = window.location.pathname.split("/").pop();

    switch (pagina) {

        case "":
        case "index.html":

            await iniciarDashboard();
            break;

        case "agendamentos.html":

            await iniciarAgendamentos();
            break;

        default:

            console.log(`Página '${pagina}' carregada.`);
            break;
    }

});


/**
 * ===============================
 * DASHBOARD
 * ===============================
 */

async function iniciarDashboard() {

    await carregarAgenda();

    configurarFiltroPeriodo();

    configurarImpressao();

}


/**
 * ===============================
 * AGENDAMENTOS
 * ===============================
 */

async function iniciarAgendamentos() {

    await carregarAgenda();

    configurarPesquisa();

    configurarBotaoNovo();

}


/**
 * Pesquisa por texto
 */

function configurarPesquisa() {

    const campo = document.getElementById("pesquisa");

    if (!campo) return;

    campo.addEventListener("keyup", (e) => {

        pesquisarAgenda(e.target.value);

    });

}


/**
 * Botão Novo
 */

function configurarBotaoNovo() {

    const botao = document.getElementById("btnNovo");

    if (!botao) return;

    botao.addEventListener("click", () => {

        novoCadastro();

    });

}


/**
 * Pesquisa por período
 */

function configurarFiltroPeriodo() {

    const btnPesquisar = document.getElementById("btnPesquisar");
    const btnLimpar = document.getElementById("btnLimpar");

    if (!btnPesquisar || !btnLimpar) return;

    btnPesquisar.addEventListener("click", () => {

        const inicio = document.getElementById("dataInicial").value;
        const fim = document.getElementById("dataFinal").value;

        pesquisarPorPeriodo(inicio, fim);

    });

    btnLimpar.addEventListener("click", () => {

        document.getElementById("dataInicial").value = "";
        document.getElementById("dataFinal").value = "";

        atualizarTabela();

    });

}


/**
 * Impressão
 */

function configurarImpressao() {

    const botao = document.getElementById("btnImprimir");

    if (!botao) return;

    botao.addEventListener("click", () => {

        window.print();

    });

}