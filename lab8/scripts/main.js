// A. Estado e Variáveis
const seccaoProdutos = document.querySelector('#produtos');
const seccaoCesto = document.querySelector('#cesto');

let cesto = JSON.parse(localStorage.getItem('produtos-seleccionados')) || [];


// B. Funções Utilitárias

function criarProduto(produto) {
    const artigo = document.createElement('article');

    const titulo = document.createElement('h2');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    // Garante que o URL da imagem fica correto independentemente do formato devolvido pela API
    imagem.src = produto.image.startsWith('http')
        ? produto.image
        : `https://deisishop.pw.deisi.ulusofona.pt/${produto.image}`;
    imagem.alt = produto.title;

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;

    const preco = document.createElement('p');
    preco.textContent = `Preço: ${produto.price} €`;

    const rating = document.createElement('p');
    rating.textContent = `Rating: ${produto.rating.rate} (${produto.rating.count} votos)`;

    const botaoComprar = document.createElement('button');
    botaoComprar.textContent = '+ Adicionar ao Cesto';
    botaoComprar.classList.add('btn-comprar');

    botaoComprar.addEventListener('click', () => {
        adicionarAoCesto(produto);
    });

    artigo.append(titulo, imagem, descricao, preco, rating, botaoComprar);
    return artigo;
}

function criaProdutoCesto(produto, index) {
    const artigo = document.createElement('article');

    const titulo = document.createElement('h2');
    titulo.textContent = produto.title;

    const preco = document.createElement('p');
    preco.textContent = `Preço: ${produto.price} €`;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = '❌ Remover';
    btnRemover.classList.add('btn-remover');

    btnRemover.addEventListener('click', () => {
        removerDoCesto(index);
    });

    artigo.append(titulo, preco, btnRemover);
    return artigo;
}


// C. Event Handlers

function adicionarAoCesto(produto) {
    cesto.push(produto);
    atualizaCesto();
}

function removerDoCesto(index) {
    cesto.splice(index, 1);
    atualizaCesto();
}

function atualizaCesto() {
    localStorage.setItem('produtos-seleccionados', JSON.stringify(cesto));

    if (!seccaoCesto) return;

    seccaoCesto.innerHTML = '<h2>Cesto de Compras</h2>';

    if (cesto.length === 0) {
        seccaoCesto.innerHTML += '<p>O cesto está vazio.</p>';
        return;
    }

    let total = 0;

    cesto.forEach((item, index) => {
        total += item.price;
        const cartaoCesto = criaProdutoCesto(item, index);
        seccaoCesto.appendChild(cartaoCesto);
    });

    const totalParagrafo = document.createElement('h3');
    totalParagrafo.textContent = `Preço Total: ${total.toFixed(2)} €`;
    seccaoCesto.appendChild(totalParagrafo);
}

function renderizarProdutos(produtos) {
    seccaoProdutos.innerHTML = '';
    produtos.forEach(produto => {
        const cartaoProduto = criarProduto(produto);
        seccaoProdutos.appendChild(cartaoProduto);
    });
}


// D. Inicialização com FETCH (AJAX)

function carregarProdutos() {
    fetch('https://deisishop.pw.deisi.ulusofona.pt/products')
        .then(response => response.json())
        .then(data => {
            renderizarProdutos(data);
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos da API:', error);
        });
}

// Executa a inicialização
carregarProdutos();
atualizaCesto();
