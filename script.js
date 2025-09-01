
class Filme {
  constructor(titulo, ano, genero, direcao, sinopse, avaliacao, duracao, streaming, poster) {
    this.titulo = titulo;
    this.ano = ano;
    this.genero = genero;
    this.direcao = direcao;
    this.sinopse = sinopse;
    this.avaliacao = avaliacao;
    this.duracao = duracao;
    this.streaming = streaming;
    this.poster = poster;
  }

  exibirDados() {
    return `
      <div class="card">
        <h3>${this.titulo} (${this.ano})</h3>
        <p><strong>Gênero:</strong> ${this.genero}</p>
        <p><strong>Direção:</strong> ${this.direcao}</p>
        <p><strong>Sinopse:</strong> ${this.sinopse}</p>
        <p><strong>Avaliação:</strong> ${this.avaliacao}</p>
        <p><strong>Duração:</strong> ${this.duracao} minutos</p>
        <p><strong>Streaming:</strong> ${this.streaming ? "Sim" : "Não"}</p>
        ${this.poster ? `<img src="${this.poster}" />` : ""}
      </div>
    `;
  }
}

class Catalogo {
  constructor() {
    this.filmes = [];
  }

  adicionarFilme(filme) {
    this.filmes.push(filme);
    this.atualizarLista();
  }

  buscarFilme(titulo) {
    return this.filmes.find(f => f.titulo.toLowerCase() === titulo.toLowerCase());
  }

  atualizarFilme(titulo, novosDados) {
    const index = this.filmes.findIndex(f => f.titulo.toLowerCase() === titulo.toLowerCase());
    if (index !== -1) {
      this.filmes[index] = { ...this.filmes[index], ...novosDados };
      this.atualizarLista();
    }
  }

  excluirFilme(titulo) {
    this.filmes = this.filmes.filter(f => f.titulo.toLowerCase() !== titulo.toLowerCase());
    this.atualizarLista();
  }

  atualizarLista() {
    const lista = document.getElementById("lista-filmes");
    lista.innerHTML = this.filmes.map(f => f.exibirDados()).join("");
  }
}

const catalogo = new Catalogo();

document.getElementById("form-filme").addEventListener("submit", function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const ano = document.getElementById("ano").value;
  const genero = document.getElementById("genero").value;
  const direcao = document.getElementById("direcao").value;
  const sinopse = document.getElementById("sinopse").value;
  const avaliacao = parseFloat(document.getElementById("avaliacao").value);
  const duracao = parseInt(document.getElementById("duracao").value);
  const streaming = document.querySelector('input[name="streaming"]:checked')?.value === "sim";
  const poster = document.getElementById("poster").value;

  if (!titulo || !ano || !genero || !direcao || !sinopse) {
    alert("Todos os campos obrigatórios devem ser preenchidos.");
    return;
  }

  if (isNaN(ano) || ano < 1800 || ano > new Date().getFullYear()) {
    alert("Ano inválido. Digite um ano entre 1800 e o atual.");
    return;
  }

  if (isNaN(avaliacao) || avaliacao < 0 || avaliacao > 10) {
    alert("A avaliação deve estar entre 0 e 10.");
    return;
  }

  if (isNaN(duracao) || duracao <= 0) {
    alert("A duração deve ser um número positivo.");
    return;
  }

  if (catalogo.filmes.some(f => f.titulo.toLowerCase() === titulo.toLowerCase())) {
    alert("Já existe um filme com esse título cadastrado.");
    return;
  }

  const novoFilme = new Filme(titulo, ano, genero, direcao, sinopse, avaliacao, duracao, streaming, poster);
  catalogo.adicionarFilme(novoFilme);
  mostrarMensagem("Filme cadastrado com sucesso!");
  this.reset();
});

function mostrarMensagem(texto) {
  const msg = document.getElementById("mensagem-sucesso");
  msg.textContent = texto;
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
}

function buscarFilme() {
  const titulo = document.getElementById("titulo-busca").value;
  const filme = catalogo.buscarFilme(titulo);
  if (filme) {
    alert(`Filme encontrado: ${filme.titulo} (${filme.ano})`);
  } else {
    alert("Filme não encontrado.");
  }
}

function excluirFilme() {
  const titulo = document.getElementById("titulo-busca").value;
  const filme = catalogo.buscarFilme(titulo);
  if (filme) {
    catalogo.excluirFilme(titulo);
    mostrarMensagem("Filme excluído com sucesso!");
  } else {
    alert("Filme não encontrado para exclusão.");
  }
}

function atualizarFilme() {
  const titulo = document.getElementById("titulo-busca").value;
  const novosDados = {
    ano: parseInt(document.getElementById("ano").value),
    genero: document.getElementById("genero").value,
    direcao: document.getElementById("direcao").value,
    sinopse: document.getElementById("sinopse").value,
    avaliacao: parseFloat(document.getElementById("avaliacao").value),
    duracao: parseInt(document.getElementById("duracao").value),
    streaming: document.getElementById("streaming").checked,
    poster: document.getElementById("poster").value
  };
  catalogo.atualizarFilme(titulo, novosDados);
  mostrarMensagem("Filme atualizado com sucesso!");
}
