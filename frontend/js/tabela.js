/**
 * ==========================================
 * Agenda NF
 * tabela.js
 * ==========================================
 */

import { atualizarCards } from "./dashboard.js";

let agenda = [];
let agendaFiltrada = [];

/**
 * Carrega a agenda
 */
export async function carregarAgenda() {

    try {

        const response = await fetch("./dados/agenda.json");

        if (!response.ok) {

            throw new Error("Erro ao carregar agenda.");

        }

        agenda = await response.json();

        agendaFiltrada = [...agenda];

        atualizarCards(agendaFiltrada);

        renderizarTabela();

    } catch (erro) {

        console.error(erro);

    }

}


/**
 * Pesquisa por texto
 */
export function pesquisarAgenda(texto) {

    texto = texto.toLowerCase().trim();

    agendaFiltrada = agenda.filter(item => {

        return (

            item.notaFiscal.toString().toLowerCase().includes(texto) ||

            item.fornecedor.toLowerCase().includes(texto) ||

            item.transportadora.toLowerCase().includes(texto)

        );

    });

    atualizarCards(agendaFiltrada);

    renderizarTabela();

}


/**
 * Pesquisa por período
 */
export function pesquisarPorPeriodo(dataInicial, dataFinal) {

    if (!dataInicial || !dataFinal) {

        alert("Informe a data inicial e a data final.");

        return;

    }

    agendaFiltrada = agenda.filter(item => {

        return (

            item.data >= dataInicial &&

            item.data <= dataFinal

        );

    });

    atualizarCards(agendaFiltrada);

    renderizarTabela();

}


/**
 * Atualiza tabela completa
 */
export function atualizarTabela() {

    agendaFiltrada = [...agenda];

    atualizarCards(agendaFiltrada);

    renderizarTabela();

}


/**
 * Renderiza tabela
 */
function renderizarTabela() {

    const tbody = document.getElementById("agendaTabela");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (agendaFiltrada.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td colspan="6" style="text-align:center;padding:30px;">

                    Nenhum registro encontrado.

                </td>

            </tr>

        `;

        return;

    }

    const grupos = {};

    agendaFiltrada.forEach(item => {

        if (!grupos[item.data]) {

            grupos[item.data] = [];

        }

        grupos[item.data].push(item);

    });

    Object.keys(grupos)
        .sort()
        .forEach(data => {

            inserirCabecalhoData(tbody, data);

            let totalVolumes = 0;

            grupos[data].forEach(item => {

                totalVolumes += Number(item.volumes);

                inserirLinha(tbody, item);

            });

            inserirTotalDia(tbody, totalVolumes);

        });

}


/**
 * Cabeçalho da Data
 */
function inserirCabecalhoData(tbody, data) {

    const tr = document.createElement("tr");

    tr.className = "data-grupo";

    tr.innerHTML = `

        <td colspan="6">

            ${formatarData(data)}

        </td>

    `;

    tbody.appendChild(tr);

}


/**
 * Linha da tabela
 */
function inserirLinha(tbody, item) {

    const pagina = window.location.pathname.split("/").pop();

    const tr = document.createElement("tr");

    if (pagina === "agendamentos.html") {

        tr.innerHTML = `

            <td>${formatarData(item.data)}</td>

            <td>${item.notaFiscal}</td>

            <td>${item.fornecedor}</td>

            <td>${item.volumes}</td>

            <td>${item.transportadora}</td>

            <td>

                <button class="btn-editar">

                    ✏️

                </button>

                <button class="btn-excluir">

                    🗑️

                </button>

            </td>

        `;

    } else {

        tr.innerHTML = `

            <td>${formatarData(item.data)}</td>

            <td>${item.notaFiscal}</td>

            <td>${item.fornecedor}</td>

            <td>${item.volumes}</td>

            <td>${item.transportadora}</td>

        `;

    }

    tbody.appendChild(tr);

}


/**
 * Total por dia
 */
function inserirTotalDia(tbody, total) {

    const pagina = window.location.pathname.split("/").pop();

    const colspan = pagina === "agendamentos.html"
        ? 4
        : 3;

    const tr = document.createElement("tr");

    tr.className = "total-dia";

    tr.innerHTML = `

        <td colspan="${colspan}"></td>

        <td>

            <strong>${total}</strong>

        </td>

        <td>

            <strong>Total de Volumes</strong>

        </td>

    `;

    tbody.appendChild(tr);

}


/**
 * Formata Data
 */
function formatarData(dataISO) {

    const partes = dataISO.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}