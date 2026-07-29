/**
 * ==========================================
 * Agenda NF
 * cadastro.js
 * ==========================================
 */

let modal = null;

/**
 * Novo Cadastro
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
 * Cria Modal
 */
function criarModal() {

    modal = document.createElement("div");

    modal.id = "modalCadastro";

    modal.innerHTML = `

        <div class="modal">

            <div class="modal-header">

                <h2>Nova Nota Fiscal</h2>

                <button id="fecharModal">

                    ✕

                </button>

            </div>

            <div class="modal-body">

                <div class="campo">

                    <label>Data de Agendamento</label>

                    <input
                        type="date"
                        id="cadData">

                </div>

                <div class="campo">

                    <label>Nota Fiscal</label>

                    <input
                        type="text"
                        id="cadNF">

                </div>

                <div class="campo">

                    <label>Fornecedor</label>

                    <input
                        type="text"
                        id="cadFornecedor">

                </div>

                <div class="campo">

                    <label>Volumes</label>

                    <input
                        type="number"
                        id="cadVolumes">

                </div>

                <div class="campo">

                    <label>Transportadora</label>

                    <input
                        type="text"
                        id="cadTransportadora">

                </div>

            </div>

            <div class="modal-footer">

                <button
                    class="cancelar"
                    id="btnCancelar">

                    Cancelar

                </button>

                <button
                    class="salvar"
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
 * Limpa formulário
 */
function limparFormulario() {

    document.getElementById("cadData").value = "";

    document.getElementById("cadNF").value = "";

    document.getElementById("cadFornecedor").value = "";

    document.getElementById("cadVolumes").value = "";

    document.getElementById("cadTransportadora").value = "";

}

/**
 * Salvar
 */
function salvarCadastro() {

    const dados = {

        data: document.getElementById("cadData").value,

        notaFiscal: document.getElementById("cadNF").value,

        fornecedor: document.getElementById("cadFornecedor").value,

        volumes: document.getElementById("cadVolumes").value,

        transportadora: document.getElementById("cadTransportadora").value

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

    console.table(dados);

    alert("Cadastro preparado.\n\nNa próxima etapa iremos salvar no sistema.");

    fecharModal();

}