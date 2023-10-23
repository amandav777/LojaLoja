// Função assíncrona para buscar produtos
async function fetchProdutos() {
  const response = await fetch("https://fakestoreapi.com/products");
  const produtos = await response.json();
  return produtos;
}

// Função para exibir produtos na tela
function exibirProdutos(produtos) {
  const setarDiv = document.getElementById("cards");
  setarDiv.innerHTML = "";

  produtos.forEach((produto) => {
    const Produto = document.createElement("div");
    Produto.classList.add("product");

    Produto.innerHTML = `
        <div class="cards">
          <img src="${produto.image}" style="width: 100px; height: 100px;">
          <h2 >${produto.title}</h2>
          <p>Preço: $${produto.price}</p>
        </div>      
        <div class="buttonCard">
          <button id="btnDetalhes"><a onclick="swal('${produto.description}');">Detalhes</a></button>
        </div>
    `;

    setarDiv.appendChild(Produto);
  });
}


// Função para ordenar produtos do mais caro para o mais barato
function ordenarProdutosMaisCaros(produtos) {
  produtos.sort((a, b) => b.price - a.price);
  exibirProdutos(produtos);
}

document.addEventListener("DOMContentLoaded", async () => {
  const produtos = await fetchProdutos();
  exibirProdutos(produtos);

  const btnMaisCaro = document.getElementById("btnMaisCaro");
  btnMaisCaro.addEventListener("click", () => {
    ordenarProdutosMaisCaros(produtos);
  });
});

// Função para ordenar produtos do mais barato para o mais caro
function ordenarProdutosMaisBaratos(produtos) {
  produtos.sort((a, b) => a.price - b.price);
  exibirProdutos(produtos);
}
// Função para filtrar produtos por categoria
function filterByCategory(products, category) {
  return products.filter((product) => product.category === category);
}

document.addEventListener("DOMContentLoaded", async () => {
  const produtos = await fetchProdutos();
  exibirProdutos(produtos);

  const btnMaisCaro = document.getElementById("btnMaisCaro");
  const btnMaisBarato = document.getElementById("btnMaisBarato");

  btnMaisCaro.addEventListener("click", () => {
    ordenarProdutosMaisCaros(produtos);
  });

  btnMaisBarato.addEventListener("click", () => {
    ordenarProdutosMaisBaratos(produtos);
  });

  const categorySelect = document.getElementById("selecionarCategoria");

  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;

    if (selectedCategory === "select") {
      // Exibe todos os produtos
      exibirProdutos(produtos);
    } else {
      // Filtra produtos por categoria
      const filteredProducts = filterByCategory(produtos, selectedCategory);
      exibirProdutos(filteredProducts);
    }
  });
});

// vai devolver por categoria 
for (const categoria in categorias) {
  const categoriaDiv = document.createElement("div");
  categoriaDiv.innerHTML = `<h2>${categoria}</h2>`;
  setarDiv.appendChild(categoriaDiv);
}