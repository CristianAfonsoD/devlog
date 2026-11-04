
const articleContent = document.getElementById("article-content");

async function carregarArtigo() {
    try {
        const parametros = new URLSearchParams(window.location.search);

        const id = Number(parametros.get("id"));

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Identificador inválido.");
        }

        const resposta = await fetch("../data/artigos.json");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os artigos.");
        }

        const artigos = await resposta.json();

        const artigo = artigos.find(item => item.id === id);

        if (!artigo) {
            throw new Error("Artigo não encontrado.");
        }

        document.title = `${artigo.titulo} | DevLog`;

        const conteudo = artigo.conteudo.map(item => {
            if (item.tipo === "titulo") {
                return `<h2>${item.texto}</h2>`;
            }

            if (item.tipo === "paragrafo") {
                return `<p>${item.texto}</p>`;
            }

            return "";
        }).join("");

        articleContent.innerHTML = `
            <header class="article-header">

                <span class="article-category">
                    ${artigo.categoria}
                </span>

                <h1>${artigo.titulo}</h1>

                <p class="article-description">
                    ${artigo.resumo}
                </p>

                <div class="article-metadata">
                    ${artigo.data} •
                    ${artigo.tempoLeitura} min de leitura
                </div>

            </header>

            <div class="article-body">
                ${conteudo}
            </div>
        `;

    } catch (erro) {
        articleContent.innerHTML = `
            <h1>Artigo não encontrado</h1>
            <p>Não foi possível carregar este conteúdo.</p>
        `;

        console.error(erro);
    }
}

carregarArtigo();
