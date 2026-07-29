/**
 * ==========================================
 * Agenda NF
 * Arquivo: app.js
 * Responsável pela inicialização do sistema.
 * ==========================================
 */

import {
    carregarAgenda,
    pesquisarAgenda
} from "./tabela.js";

import {
    novoCadastro
} from "./cadastro.js";

/**
 * Inicializa a aplicação
 */
document.addEventListener("DOMContentLoaded", async () => {

    await carregarAgenda();

    configurarPesquisa();

    configurarBotaoNovo();

});


/**
 * Configura o campo de pesquisa
 */
function configurarPesquisa() {

    const pesquisa = document.getElementById("pesquisa");

    pesquisa.addEventListener("keyup", (event) => {

        pesquisarAgenda(event.target.value);

    });

}


/**
 * Configura botão Novo
 */
function configurarBotaoNovo() {

    const botao = document.getElementById("btnNovo");

    botao.addEventListener("click", () => {

        novoCadastro();

    });

}