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
        ${this.poster ? `<img src="${this.poster}" alt="Poster de ${this.titulo}" style="max-width:180px; margin-top:10px; border-radius:8px;">` : ""}
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
    this.salvarLocalStorage();
    this.atualizarLista();
    atualizarCarrosselFilmes();
  }

  buscarFilme(titulo) {
    return this.filmes.find(f => f.titulo.toLowerCase() === titulo.toLowerCase());
  }

  atualizarFilme(titulo, novosDados) {
    const index = this.filmes.findIndex(f => f.titulo.toLowerCase() === titulo.toLowerCase());
    if (index !== -1) {
      this.filmes[index] = { ...this.filmes[index], ...novosDados };
      this.salvarLocalStorage();
      this.atualizarLista();
      atualizarCarrosselFilmes();
    }
  }

  excluirFilme(titulo) {
    this.filmes = this.filmes.filter(f => f.titulo.toLowerCase() !== titulo.toLowerCase());
    this.salvarLocalStorage();
    this.atualizarLista();
    atualizarCarrosselFilmes();
  }

  atualizarLista() {
    const lista = document.getElementById("lista-filmes");
    lista.innerHTML = this.filmes.map(f => f.exibirDados()).join("");
  }

  salvarLocalStorage() {
    localStorage.setItem('filmes', JSON.stringify(this.filmes));
  }

  carregarLocalStorage() {
    const filmesSalvos = JSON.parse(localStorage.getItem('filmes')) || [];
    this.filmes = filmesSalvos.map(f => new Filme(f.titulo, f.ano, f.genero, f.direcao, f.sinopse, f.avaliacao, f.duracao, f.streaming, f.poster));
    this.atualizarLista();
    atualizarCarrosselFilmes();
  }
}


const catalogo = new Catalogo();
catalogo.carregarLocalStorage();


document.getElementById("form-filme").addEventListener("submit", function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const ano = document.getElementById("ano").value;
  const genero = document.getElementById("genero").value;
  const direcao = document.getElementById("direcao").value;
  const sinopse = document.getElementById("sinopse").value;
  const avaliacao = parseFloat(document.getElementById("avaliacao").value);
  const duracao = parseInt(document.getElementById("duracao").value);
  const streaming = document.getElementById("streaming").checked;
  const poster = document.getElementById("poster").value;

  const novoFilme = new Filme(titulo, ano, genero, direcao, sinopse, avaliacao, duracao, streaming, poster);
  catalogo.adicionarFilme(novoFilme);
  mostrarMensagem("Filme cadastrado com sucesso!");
  this.reset();
});

// Carrossel dos filmes cadastrados
let idxFilme = 0;
function atualizarCarrosselFilmes() {
  const filmes = catalogo.filmes;
  const carousel = document.getElementById('carousel-imagens-filmes');
  if (!carousel) return;
  carousel.innerHTML = '';
  filmes.forEach((filme, i) => {
    const img = document.createElement('img');
    img.src = filme.poster || 'img/logo_cinejs.png';
    img.alt = filme.titulo;
    img.className = 'carousel-img' + (i === idxFilme ? ' active' : '');
    carousel.appendChild(img);
  });
}
function mudarFilme(delta) {
  const filmes = catalogo.filmes;
  if (filmes.length === 0) return;
  idxFilme = (idxFilme + delta + filmes.length) % filmes.length;
  atualizarCarrosselFilmes();
}
window.addEventListener('DOMContentLoaded', atualizarCarrosselFilmes);

function mostrarMensagem(texto) {
  const msg = document.getElementById("mensagem-sucesso");
  msg.textContent = texto;
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
}

function buscarFilme() {
  const tituloBusca = document.getElementById("titulo-busca").value;
  const filme = catalogo.buscarFilme(tituloBusca);
  if (filme) {
    alert("Filme encontrado:\n" + JSON.stringify(filme, null, 2));
  } else {
    alert("Filme não encontrado.");
  }
}

function atualizarFilme() {
  const tituloBusca = document.getElementById("titulo-busca").value;
  const novosDados = {
    genero: prompt("Novo gênero:"),
    direcao: prompt("Nova direção:"),
    sinopse: prompt("Nova sinopse:")
  };
  catalogo.atualizarFilme(tituloBusca, novosDados);
  alert("Filme atualizado (se encontrado).");
}

function excluirFilme() {
  const tituloBusca = document.getElementById("titulo-busca").value;
  catalogo.excluirFilme(tituloBusca);
  alert("Filme excluído (se encontrado).");
}
