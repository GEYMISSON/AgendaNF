/**
 * ==========================================
 * Agenda NF
 * cadastro.js
 * ==========================================
 */

let modal = null;

/**
 * Abre o modal de cadastro
 */
export function novoCadastro() {

    if (!modal) {

        criarModal();

    }

    limparFormulario();

    modal.style.display = "flex";

}


/**
 * Fecha o modal
 */
function fecharModal() {

    modal.style.display = "none";

}


/**
 * Cria o modal
 */
function criarModal() {

    modal = document.createElement("div");

    modal.id = "modalCadastro";

    modal.innerHTML = `

        <div class="modal">

            <div class="modal-header">

                <h2>Novo Agendamento</h2>

                <button id="fecharModal">&times;</button>

            </div>

            <div class="modal-body">

                <div class="campo">
                    <label>Data de Agendamento</label>
                    <input type="date" id="cadData">
                </div>

                <div class="campo">
                    <label>Nota Fiscal</label>
                    <input type="text" id="cadNF">
                </div>

                <div class="campo">
                    <label>Fornecedor</label>
                    <input type="text" id="cadFornecedor">
                </div>

                <div class="campo">
                    <label>Volumes</label>
                    <input type="number" id="cadVolumes" min="1">
                </div>

                <div class="campo">
                    <label>Transportadora</label>
                    <input type="text" id="cadTransportadora">
                </div>

            </div>

            <div class="modal-footer">

                <button
                    class="btn-cancelar"
                    id="btnCancelar">

                    Cancelar

                </button>

                <button
                    class="btn-salvar"
                    id="btnSalvar">

                    Salvar

                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    document
        .getElementById("fecharModal")
        .addEventListener("click", fecharModal);

    document
        .getElementById("btnCancelar")
        .addEventListener("click", fecharModal);

    document
        .getElementById("btnSalvar")
        .addEventListener("click", salvarCadastro);

}


/**
 * Limpa o formulário
 */
function limparFormulario() {

    document.getElementById("cadData").value = "";
    document.getElementById("cadNF").value = "";
    document.getElementById("cadFornecedor").value = "";
    document.getElementById("cadVolumes").value = "";
    document.getElementById("cadTransportadora").value = "";

}


/**
 * Salvar cadastro
 */
function salvarCadastro() {

    const dados = {

        data: document.getElementById("cadData").value,

        notaFiscal: document.getElementById("cadNF").value.trim(),

        fornecedor: document.getElementById("cadFornecedor").value.trim(),

        volumes: Number(document.getElementById("cadVolumes").value),

        transportadora: document.getElementById("cadTransportadora").value.trim()

    };

    if (
        !dados.data ||
        !dados.notaFiscal ||
        !dados.fornecedor ||
        !dados.volumes ||
        !dados.transportadora
    ) {

        alert("Preencha todos os campos.");

        return;

    }

    console.log("Novo Agendamento:", dados);

    alert("Cadastro validado!\n\nNa próxima versão os dados serão gravados automaticamente.");

    fecharModal();

}