import { obterAgenda, atualizarTabela } from "./tabela.js";

// ===============================

export function configurarCadastro() {

    const btn = document.getElementById("btnNovo");

    btn.addEventListener("click", novoCadastro);

}

// ===============================

function novoCadastro() {

    alert("Tela de cadastro será implementada na próxima etapa.");

}

// ===============================

window.editarCadastro = function(id){

    const agenda = obterAgenda();

    const registro = agenda.find(item => item.id === id);

    console.log(registro);

    alert("Editar NF " + registro.nota);

}

// ===============================

window.excluirCadastro = function(id){

    const agenda = obterAgenda();

    const indice = agenda.findIndex(item => item.id === id);

    if(indice === -1) return;

    if(confirm("Deseja realmente excluir esta Nota Fiscal?")){

        agenda.splice(indice,1);

        atualizarTabela();

    }

}