
const dadosInicias = [
  {
    nome: "Andressa Alves",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://example.com/andressa.jpg",
    gols: 15,
    assistencias: 10,
    jogos: 28,
    favorita: false
  },
  {
    nome: "Dayana Rodríguez",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://example.com/dayana.jpg",
    gols: 5,
    assistencias: 12,
    jogos: 30,
    favorita: false
  },
  {
    nome: "Mariza",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://example.com/mariza.jpg",
    gols: 2,
    assistencias: 1,
    jogos: 32,
    favorita: false
  },
  {
    nome: "Thaís Regina",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://example.com/thais.jpg",
    gols: 1,
    assistencias: 2,
    jogos: 25,
    favorita: false
  },
  {
    nome: "Letícia Teles",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://example.com/leticia.jpg",
    gols: 0,
    assistencias: 0,
    jogos: 18,
    favorita: false
  }
];

if (!localStorage.getItem("jogadoras")) {
  localStorage.setItem("jogadoras", JSON.stringify(dadosInicias));
}

let jogadoras = JSON.parse(localStorage.getItem("jogadoras"));

function carregarJogadoras() {
  const container = document.getElementById("lista-jogadoras");
  container.innerHTML = "";

  jogadoras.forEach((jogadora, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${jogadora.foto}" alt="${jogadora.nome}">
      <h3>${jogadora.nome}</h3>
      <p>${jogadora.posicao} - ${jogadora.clube}</p>
      <p>Gols: ${jogadora.gols} | Assistências: ${jogadora.assistencias} | Jogos: ${jogadora.jogos}</p>
      <button class="botao-editar" onclick="editar(${index})">Editar</button>
      <button class="btn-deletar" onclick="remover(${index})">Excluir</button>
    `;

    container.appendChild(card);
  });
}

function salvar() {
  localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
}


document.getElementById("forms").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const posicao = document.getElementById("posicao").value;
  const clube = document.getElementById("clube").value;
  const gols = document.getElementById("gols").value;
  const assistencias = document.getElementById("assistencias").value;
  const jogos = document.getElementById("jogos").value;
  const foto = document.getElementById("foto").value;
  const editIndex = document.getElementById("edicao").value;

  const novaJogadora = { nome, posicao, clube, gols, assistencias, jogos, foto,};

  if (editIndex === "") {
    jogadoras.push(novaJogadora);
    alert("Jogadora adicionada com sucesso!");
  } else {
    jogadoras[editIndex] = novaJogadora;
    alert("Jogadora editada com sucesso!");
  }

  salvar();
  carregarJogadoras();
  e.target.reset();
  document.getElementById("edicao").value = "";
});

function editar(index) {
  const jogadora = jogadoras[index];
  document.getElementById("nome").value = jogadora.nome;
  document.getElementById("posicao").value = jogadora.posicao;
  document.getElementById("clube").value = jogadora.clube;
  document.getElementById("gols").value = jogadora.gols;
  document.getElementById("assistencias").value = jogadora.assistencias;
  document.getElementById("jogos").value = jogadora.jogos;
  document.getElementById("foto").value = jogadora.foto;
  document.getElementById("edicao").value = index;
}


function apagar(index) {
  if (confirm("Tem certeza que deseja excluir?")) {
    jogadoras.splice(index, 1);
    salvar();
    carregarJogadoras();
    alert("Jogadora removida com sucesso!");
  }
}

carregarJogadoras();
