class Filme {
  constructor(titulo, ano, genero, direcao, sinopse) {
    this.titulo = titulo;
    this.ano = ano;
    this.genero = genero;
    this.direcao = direcao;
    this.sinopse = sinopse;
  }

  exibirDados() {
    return `
      <div class="card">
        <h3>${this.titulo} (${this.ano})</h3>
        <p><strong>Gênero:</strong> ${this.genero}</p>
        <p><strong>Direção:</strong> ${this.direcao}</p>
        <p><strong>Sinopse:</strong> ${this.sinopse}</p>
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

  const novoFilme = new Filme(titulo, ano, genero, direcao, sinopse);
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