
const container = document.getElementById("articles-container");

async function carregarArtigos() {
    try {
        const resposta = await fetch("./data/artigos.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os artigos.");
        }

        const artigos = await resposta.json();

        container.innerHTML = "";

        artigos.forEach(artigo => {
            const card = document.createElement("article");

            card.classList.add("article-card");

            card.innerHTML = `
                <span class="article-category">
                    ${artigo.categoria}
                </span>

                <h3>${artigo.titulo}</h3>

                <p>${artigo.resumo}</p>

                <span class="article-date">
                    ${artigo.data} • ${artigo.tempoLeitura} min de leitura
                </span>

                <a href="./pages/artigo.html?id=${artigo.id}"
                class="text-link">
                    Ler artigo →
                </a>
            `;

            container.appendChild(card);
        });

    } catch (erro) {
        container.innerHTML = `
            <p class="loading-message">
                Não foi possível carregar os artigos.
            </p>
        `;

        console.error(erro);
    }
}

carregarArtigos();
