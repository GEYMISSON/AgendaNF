/**
 * ==========================================
 * Agenda NF
 * tabela.js
 * ==========================================
 */

let agenda = [];
let agendaFiltrada = [];

/**
 * Carrega o JSON
 */
export async function carregarAgenda() {

    try {

        const response = await fetch("./dados/agenda.json");

        if (!response.ok) {
            throw new Error("Erro ao carregar agenda.");
        }

        agenda = await response.json();

        agendaFiltrada = [...agenda];

        renderizarTabela();

    } catch (erro) {

        console.error(erro);

    }

}

/**
 * Pesquisa
 */
export function pesquisarAgenda(texto) {

    texto = texto.toLowerCase().trim();

    agendaFiltrada = agenda.filter(item => {

        return (

            item.notaFiscal.toLowerCase().includes(texto) ||

            item.fornecedor.toLowerCase().includes(texto) ||

            item.transportadora.toLowerCase().includes(texto)

        );

    });

    renderizarTabela();

}

/**
 * Renderiza tabela
 */
function renderizarTabela() {

    const tbody = document.getElementById("agendaTabela");

    tbody.innerHTML = "";

    // Agrupa por data
    const grupos = {};

    agendaFiltrada.forEach(item => {

        if (!grupos[item.data]) {

            grupos[item.data] = [];

        }

        grupos[item.data].push(item);

    });

    // Ordena datas

    const datas = Object.keys(grupos).sort();

    datas.forEach(data => {

        inserirCabecalhoData(tbody, data);

        let totalVolumes = 0;

        grupos[data].forEach(item => {

            totalVolumes += item.volumes;

            inserirLinha(tbody, item);

        });

        inserirTotalDia(tbody, totalVolumes);

    });

}

/**
 * Cabeçalho da data
 */
function inserirCabecalhoData(tbody, data) {

    const tr = document.createElement("tr");

    tr.className = "data-grupo";

    tr.innerHTML = `
        <td colspan="5">
            <strong>${formatarData(data)}</strong>
        </td>
    `;

    tbody.appendChild(tr);

}

/**
 * Linha
 */
function inserirLinha(tbody, item) {

    const tr = document.createElement("tr");

    tr.innerHTML = `

        <td>${formatarData(item.data)}</td>

        <td>${item.notaFiscal}</td>

        <td>${item.fornecedor}</td>

        <td>${item.volumes}</td>

        <td>${item.transportadora}</td>

    `;

    tbody.appendChild(tr);

}

/**
 * Total
 */
function inserirTotalDia(tbody, total) {

    const tr = document.createElement("tr");

    tr.className = "total-dia";

    tr.innerHTML = `

        <td colspan="3"></td>

        <td><strong>${total}</strong></td>

        <td><strong>Total de Volumes</strong></td>

    `;

    tbody.appendChild(tr);

}

/**
 * Formata data
 */
function formatarData(dataISO) {

    const data = new Date(dataISO + "T00:00:00");

    return data.toLocaleDateString("pt-BR");

}