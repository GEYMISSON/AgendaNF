/**
 * ==========================================
 * Agenda NF
 * dashboard.js
 * Funções exclusivas do Dashboard
 * ==========================================
 */

/**
 * Atualiza os cards do Dashboard
 * @param {Array} agenda
 */
export function atualizarCards(agenda = []) {

    atualizarTotalNF(agenda);

    atualizarTotalVolumes(agenda);

    atualizarTotalFornecedores(agenda);

    atualizarTotalTransportadoras(agenda);

}


/**
 * Total de Notas Fiscais
 */
function atualizarTotalNF(agenda) {

    const elemento = document.getElementById("cardNF");

    if (!elemento) return;

    elemento.textContent = agenda.length;

}


/**
 * Total de Volumes
 */
function atualizarTotalVolumes(agenda) {

    const elemento = document.getElementById("cardVolumes");

    if (!elemento) return;

    const total = agenda.reduce((soma, item) => {

        return soma + Number(item.volumes);

    }, 0);

    elemento.textContent = total;

}


/**
 * Total de Fornecedores
 */
function atualizarTotalFornecedores(agenda) {

    const elemento = document.getElementById("cardFornecedor");

    if (!elemento) return;

    const fornecedores = new Set(
        agenda.map(item => item.fornecedor)
    );

    elemento.textContent = fornecedores.size;

}


/**
 * Total de Transportadoras
 */
function atualizarTotalTransportadoras(agenda) {

    const elemento = document.getElementById("cardTransportadora");

    if (!elemento) return;

    const transportadoras = new Set(
        agenda.map(item => item.transportadora)
    );

    elemento.textContent = transportadoras.size;

}