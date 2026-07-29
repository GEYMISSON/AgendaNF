import { carregarAgenda } from "./tabela.js";
import { configurarCadastro } from "./cadastro.js";

document.addEventListener("DOMContentLoaded", () => {

    carregarAgenda();

    configurarCadastro();

});