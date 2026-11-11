// A. Estado e variáveis com referência de elementos do DOM
const seccaoProdutos = document.querySelector('#produtos');
const seccaoCesto = document.querySelector('#cesto');

// Carrega o cesto do localStorage usando a chave exigida pelo professor
let cesto = JSON.parse(localStorage.getItem('produtos-seleccionados')) || [];


// B. Funções utilitárias

// Cria o cartão de um produto para a loja principal
function criarProduto(produto) {
    const artigo = document.createElement('article');

    const titulo = document.createElement('h2');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
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

// Cria o elemento <article> para cada produto dentro do cesto (Passo 1 e 2)[cite: 13]
function criaProdutoCesto(produto, index) {
    const artigo = document.createElement('article');

    const titulo = document.createElement('h2');
    titulo.textContent = produto.title;

    const preco = document.createElement('p');
    preco.textContent = `Preço: ${produto.price} €`;

    // Botão para remover o produto do cesto com eventlistener[cite: 13]
    const btnRemover = document.createElement('button');
    btnRemover.textContent = '❌ Remover';
    btnRemover.classList.add('btn-remover');

    btnRemover.addEventListener('click', () => {
        removerDoCesto(index);
    });

    artigo.append(titulo, preco, btnRemover);
    return artigo;
}


// C. Event handlers

function adicionarAoCesto(produto) {
    cesto.push(produto);
    atualizaCesto();
}

function removerDoCesto(index) {
    cesto.splice(index, 1); // Remove o item pelo índice na lista
    atualizaCesto();
}

// Função principal que atualiza o cesto e o localStorage (Passo 1)[cite: 13]
function atualizaCesto() {
    // Guarda a lista atualizada no localStorage com a chave correta[cite: 13]
    localStorage.setItem('produtos-seleccionados', JSON.stringify(cesto));

    if (!seccaoCesto) return;

    seccaoCesto.innerHTML = '<h2>Cesto de Compras</h2>';

    if (cesto.length === 0) {
        seccaoCesto.innerHTML += '<p>O cesto está vazio.</p>';
        return;
    }

    let total = 0;

    // Percorre a lista e usa criaProdutoCesto para renderizar cada item[cite: 13]
    cesto.forEach((item, index) => {
        total += item.price;
        const cartaoCesto = criaProdutoCesto(item, index);
        seccaoCesto.appendChild(cartaoCesto);
    });

    // Elemento para apresentar o preço total (Passo 3)[cite: 13]
    const totalParagrafo = document.createElement('h3');
    totalParagrafo.textContent = `Preço Total: ${total.toFixed(2)} €`;
    seccaoCesto.appendChild(totalParagrafo);
}

function renderizarProdutos(produtos) {
    produtos.forEach(produto => {
        const cartaoProduto = criarProduto(produto);
        seccaoProdutos.appendChild(cartaoProduto);
    });
}


// D. Event Listeners
// (Geridos diretamente através dos botões criados dinamicamente)


// E. Inicialização
renderizarProdutos(produtos);
atualizaCesto();
