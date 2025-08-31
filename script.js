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
        ${this.poster ? `<img src="\${this.poster}" alt="Poster do filme">` : ""}
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

  filmesComBoaAvaliacao() {
    return this.filmes.filter(f => f.avaliacao > 6).map(f => f.titulo);
  }

  filmesDisponiveisStreaming() {
    return this.filmes.filter(f => f.streaming).map(f => f.titulo);
  }

  filmePorDuracao(tipo) {
    if (this.filmes.length === 0) return null;
    return this.filmes.reduce((acc, curr) => {
      if (tipo === "maior") return curr.duracao > acc.duracao ? curr : acc;
      if (tipo === "menor") return curr.duracao < acc.duracao ? curr : acc;
      return acc;
    });
  }

  mediaAvaliacoes() {
    if (this.filmes.length === 0) return 0;
    const total = this.filmes.reduce((soma, f) => soma + f.avaliacao, 0);
    return (total / this.filmes.length).toFixed(2);
  }
}

const catalogo = new Catalogo();

document.getElementById("form-filme").addEventListener("submit", function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const ano = parseInt(document.getElementById("ano").value);
  const genero = document.getElementById("genero").value;
  const direcao = document.getElementById("direcao").value;
  const sinopse = document.getElementById("sinopse").value;
  const avaliacao = parseFloat(document.getElementById("avaliacao").value);
  const duracao = parseInt(document.getElementById("duracao").value);
  const streaming = document.getElementById("streaming").checked;
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
