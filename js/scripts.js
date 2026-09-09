// ===== Carrossel de Depoimentos =====

// Lista de depoimentos
const depoimentos = [
  {
    nome: "João",
    foto: "https://randomuser.me/api/portraits/men/58.jpg",
    texto: "Lugar agradável e aconchegante, recomendo!"
  },
  {
    nome: "Maria",
    foto: "https://randomuser.me/api/portraits/women/85.jpg",
    texto: "Adorei o ambiente! Foi uma experiência muito agradável."
  },
  {
    nome: "Carlos",
    foto: "https://randomuser.me/api/portraits/men/90.jpg",
    texto: "Excelente atendimento e um ótimo lugar para passar o tempo!"
  }
];

// Índice do depoimento atualmente exibido
let depoimentoAtual = 0;

// Elementos HTML
const foto = document.getElementById("testimonial-photo");
const texto = document.getElementById("testimonial-text");
const botaoAnterior = document.getElementById("btn-anterior");
const botaoProximo = document.getElementById("btn-proximo");

// Função responsável por exibir o depoimento
function mostrarDepoimento(indice) {

  const depoimento = depoimentos[indice];

  foto.src = depoimento.foto;
  foto.alt = depoimento.nome;

  texto.innerHTML = `
    "${depoimento.texto}"
    <span class="author">— ${depoimento.nome}</span>
  `;
}

// Botão Anterior
botaoAnterior.addEventListener("click", function () {
  depoimentoAtual--;
  // Se estiver no primeiro, volta para o último
  if (depoimentoAtual < 0) {
    depoimentoAtual = depoimentos.length - 1;
  }
  mostrarDepoimento(depoimentoAtual);
});

// Botão Próximo
botaoProximo.addEventListener("click", function () {
  depoimentoAtual++;
  // Se estiver no último, volta para o primeiro
  if (depoimentoAtual >= depoimentos.length) {
    depoimentoAtual = 0;
  }
  mostrarDepoimento(depoimentoAtual);
});

// Exibe o primeiro depoimento ao carregar a página
mostrarDepoimento(depoimentoAtual);

// ===== FORMULÁRIO DE PEDIDO ==========================

// Tipo de reserva
const tiposReserva = 
  document.querySelectorAll('input[name="tipoReserva"]');

// Campos condicionais
const campoSala = document.getElementById("campoSala");
const campoJogos = document.getElementById("campoJogos");

// Campos de seleção
const sala = document.getElementById("sala");
const jogo = document.getElementById("jogo");

// ===== TIPO DE RESERVA ================================

tiposReserva.forEach(function (tipo) {
  tipo.addEventListener("change", function () {
    // Esconde os dois campos
    campoSala.style.display = "none";
    campoJogos.style.display = "none";
    // Remove obrigatoriedade
    sala.required = false;
    jogo.required = false;
    // Reserva LOCAL
    if (tipo.value === "local") {
      campoSala.style.display = "block";
      sala.required = true;
      // Limpa seleção de jogo
      jogo.value = "";
    }
    // Reserva RETIRADA
    if (tipo.value === "retirada") {
      campoJogos.style.display = "block";
      jogo.required = true;
      // Limpa seleção de sala
      sala.value = "";
    }
  });
});
// ===== PAGAMENTO ======================================

const formasPagamento = 
  document.querySelectorAll('input[name="pagamento"]');

const campoPagamentoSite =
  document.getElementById("campoPagamentoSite");
const tiposPagamento = 
  document.querySelectorAll('input[name="tipoPagamento"]');

formasPagamento.forEach(function (pagamento) {

  pagamento.addEventListener("change", function () {
    // Pagamento pelo site
    if (pagamento.value === "site") {
      campoPagamentoSite.style.display = "block";
      tiposPagamento.forEach(function (tipo) {
        tipo.required = true;
      });
    }
    // Pagamento no local
    else {
      campoPagamentoSite.style.display = "none";
      tiposPagamento.forEach(function (tipo) {
        tipo.required = false;
        tipo.checked = false;
      });
    }
  });
});

// ===== VALIDAÇÃO DO FORMULÁRIO =======================

const formulario = document.getElementById("formPedido");

formulario.addEventListener("submit", function (event) {

  // NOME

  const nome = document.getElementById("nome");
  if (nome.value.trim() === "") {
    event.preventDefault();
    alert("Por favor, informe seu nome completo.");
    nome.focus();
    return;
  }

  // TELEFONE

  const telefone = document.getElementById("telefone");

  const telefoneValido =
    /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/;
  if (!telefoneValido.test(telefone.value)) {
    event.preventDefault();
    alert(
      "Por favor, informe um telefone válido.\n\n" +
      "Exemplo: (45) 99999-9999"
    );
    telefone.focus();
    return;
  }


  // ENDEREÇO

  const endereco = document.getElementById("endereco");

  if (endereco.value.trim() === "") {
    event.preventDefault();
    alert("Por favor, informe seu endereço.");
    endereco.focus();
    return;
  }

  // TIPO DA RESERVA

  const tipoReserva =
    document.querySelector('input[name="tipoReserva"]:checked');

    if (!tipoReserva) {
    event.preventDefault();
    alert("Por favor, selecione o tipo da reserva.");
    return;
  }

  // DATA DO AGENDAMENTO

  const dataAgendamento =
    document.getElementById("dataAgendamento");

  if (dataAgendamento.value === "") {
    event.preventDefault();
    alert("Por favor, selecione a data do agendamento.");
    dataAgendamento.focus();
    return;
  }

  // RESERVA LOCAL

  if (tipoReserva.value === "local") {
    const sala =
      document.getElementById("sala");
    if (sala.value === "") {
      event.preventDefault();
      alert("Por favor, selecione uma sala para realizar a reserva.");
      sala.focus();
      return;
    }
  }

  // RESERVA RETIRADA

  if (tipoReserva.value === "retirada") {

    const jogo =
      document.getElementById("jogo");

      if (jogo.value === "") {
      event.preventDefault();
      alert("Por favor, selecione um jogo para realizar a retirada.");
      jogo.focus();
      return;
    }
  }

  // PAGAMENTO

  const pagamento =
    document.querySelector('input[name="pagamento"]:checked');

  if (!pagamento) {
    event.preventDefault();
    alert("Por favor, selecione a forma de pagamento.");
    return;
  }

  // PAGAMENTO PELO SITE

  if (pagamento.value === "site") {

    const tipoPagamento =
      document.querySelector('input[name="tipoPagamento"]:checked');
    if (!tipoPagamento) {

      event.preventDefault();
      alert("Por favor, selecione o tipo de pagamento.");
      return;
    }
  }
});

