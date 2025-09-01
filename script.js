
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-filme");
  const listaFilmes = document.getElementById("lista-filmes");

  form.addEventListener("submit", function (e) {
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

    const novoFilme = {
      titulo,
      ano,
      genero,
      direcao,
      sinopse,
      avaliacao,
      duracao,
      streaming,
      poster
    };

    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    filmes.push(novoFilme);
    localStorage.setItem("filmes", JSON.stringify(filmes));

    form.reset();
    exibirFilmes();
  });

  function exibirFilmes() {
    listaFilmes.innerHTML = "";
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];

    filmes.forEach(filme => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2>${filme.titulo} (${filme.ano})</h2>
        <img src="\${filme.poster}" alt="\${filme.titulo}">
        <p><strong>Gênero:</strong> \${filme.genero}</p>
        <p><strong>Direção:</strong> \${filme.direcao}</p>
        <p><strong>Sinopse:</strong> \${filme.sinopse}</p>
        <p><strong>Avaliação:</strong> \${filme.avaliacao}</p>
        <p><strong>Duração:</strong> \${filme.duracao} min</p>
        <p><strong>Disponível no streaming:</strong> \${filme.streaming ? "Sim" : "Não"}</p>
      `;
      listaFilmes.appendChild(card);
    });
  }

  exibirFilmes();
});
