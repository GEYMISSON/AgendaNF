let agenda = [];

// ===============================

export async function carregarAgenda() {

    try {

        const resposta = await fetch("./dados/agenda.json");

        agenda = await resposta.json();

        renderizarTabela(agenda);

    } catch (erro) {

        console.error("Erro ao carregar agenda:", erro);

    }

}

// ===============================

function renderizarTabela(lista) {

    const tbody = document.getElementById("agendaBody");

    tbody.innerHTML = "";

    lista.forEach(item => {

        const tr = document.createElement("tr");

        tr.innerHTML = `

            <td>${formatarData(item.data)}</td>

            <td>${item.nota}</td>

            <td>${item.fornecedor}</td>

            <td>${item.transportadora}</td>

            <td>
                <span class="status ${item.status.toLowerCase()}">
                    ${item.status}
                </span>
            </td>

            <td>

                <div class="acoes">

                    <button
                        class="btnEditar"
                        onclick="editarCadastro(${item.id})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btnExcluir"
                        onclick="excluirCadastro(${item.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        `;

        tbody.appendChild(tr);

    });

}

// ===============================

function formatarData(data) {

    const d = new Date(data);

    return d.toLocaleDateString("pt-BR");

}

// ===============================

export function atualizarTabela() {

    renderizarTabela(agenda);

}

// ===============================

export function obterAgenda() {

    return agenda;

}