// A. Estado e Variáveis
const seccaoProdutos = document.querySelector('#produtos');
const seccaoCesto = document.querySelector('#cesto');
const selectFiltro = document.querySelector('#filtro-categoria');
const selectOrdenar = document.querySelector('#ordenar-preco');
const inputPesquisa = document.querySelector('#input-pesquisa');

let cesto = JSON.parse(localStorage.getItem('produtos-seleccionados')) || [];
let listaProdutosGlobal = [];


// B. Funções Utilitárias

function criarProduto(produto) {
    const artigo = document.createElement('article');

    const titulo = document.createElement('h2');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    if (produto.image.startsWith('http')) {
        imagem.src = produto.image;
    } else if (produto.image.startsWith('/')) {
        imagem.src = `https://deisishop.pw.deisi.ulusofona.pt${produto.image}`;
    } else {
        imagem.src = `https://deisishop.pw.deisi.ulusofona.pt/${produto.image}`;
    }
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


// C. Event Handlers & Lógica de Filtragem/Pesquisa/Ordenação

function adicionarAoCesto(produto) {
    cesto.push(produto);
    atualizaCesto();
}

function removerDoCesto(index) {
    cesto.splice(index, 1);
    atualizaCesto();
}

function processarProdutos() {
    let produtosFiltrados = [...listaProdutosGlobal];

    const categoriaSelecionada = selectFiltro ? selectFiltro.value : 'all';
    if (categoriaSelecionada !== 'all') {
        produtosFiltrados = produtosFiltrados.filter(p => p.category === categoriaSelecionada);
    }

    const termoPesquisa = inputPesquisa ? inputPesquisa.value.toLowerCase().trim() : '';
    if (termoPesquisa !== '') {
        produtosFiltrados = produtosFiltrados.filter(p => p.title.toLowerCase().includes(termoPesquisa));
    }

    const ordenacao = selectOrdenar ? selectOrdenar.value : 'default';
    if (ordenacao === 'asc') {
        produtosFiltrados.sort((a, b) => a.price - b.price);
    } else if (ordenacao === 'desc') {
        produtosFiltrados.sort((a, b) => b.price - a.price);
    }

    renderizarProdutos(produtosFiltrados);
}

function atualizaCesto() {
    localStorage.setItem('produtos-seleccionados', JSON.stringify(cesto));

    if (!seccaoCesto) return;

    seccaoCesto.innerHTML = '<h2>Cesto de Compras</h2>';

    if (cesto.length === 0) {
        seccaoCesto.innerHTML += '<p>O cesto está vazio.</p>';
        adicionarElementosCheckout();
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

    adicionarElementosCheckout();
}

function adicionarElementosCheckout() {
    // Utiliza elementos estruturais diretamente no cesto sem recorrer a wrappers desnecessários
    const labelEstudante = document.createElement('label');
    labelEstudante.innerHTML = '<input type="checkbox" id="estudante-deisi"> É estudante do DEISI?';

    const inputCupao = document.createElement('input');
    inputCupao.type = 'text';
    inputCupao.id = 'cupao-desconto';
    inputCupao.placeholder = 'Cupão de desconto';

    const btnComprar = document.createElement('button');
    btnComprar.id = 'btn-comprar';
    btnComprar.className = 'btn-comprar';
    btnComprar.textContent = 'Comprar';

    const resultadoCheckout = document.createElement('p');
    resultadoCheckout.id = 'resultado-checkout';

    seccaoCesto.append(document.createElement('br'), labelEstudante, document.createElement('br'), inputCupao, document.createElement('br'), btnComprar, resultadoCheckout);

    btnComprar.addEventListener('click', realizarCheckout);
}

function realizarCheckout() {
    const estudante = document.querySelector('#estudante-deisi').checked;
    const coupon = document.querySelector('#cupao-desconto').value.trim();
    const produtosIds = cesto.map(p => p.id);
    const resultadoCheckout = document.querySelector('#resultado-checkout');

    const dadosCompra = {
        products: produtosIds,
        student: estudante,
        coupon: coupon || undefined
    };

    fetch('https://deisishop.pw.deisi.ulusofona.pt/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosCompra)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            resultadoCheckout.style.color = 'red';
            resultadoCheckout.textContent = `Erro: ${data.message || 'Falha na compra'}`;
        } else {
            resultadoCheckout.style.color = 'green';
            resultadoCheckout.innerHTML = `<strong>Compra efetuada com sucesso!</strong><br>Referência: <strong>${data.reference}</strong><br>Total pago: <strong>${data.totalCost} €</strong>`;
        }
    })
    .catch(error => {
        console.error('Erro no checkout:', error);
        resultadoCheckout.style.color = 'red';
        resultadoCheckout.textContent = 'Erro de ligação ao servidor.';
    });
}

function renderizarProdutos(produtos) {
    seccaoProdutos.innerHTML = '';
    if (produtos.length === 0) {
        seccaoProdutos.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }
    produtos.forEach(produto => {
        const cartaoProduto = criarProduto(produto);
        seccaoProdutos.appendChild(cartaoProduto);
    });
}

function preencherCategorias(produtos) {
    if (!selectFiltro) return;
    const categorias = [...new Set(produtos.map(p => p.category))];
    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        selectFiltro.appendChild(option);
    });
}


// D. Inicialização com FETCH (AJAX)

function carregarProdutos() {
    fetch('https://deisishop.pw.deisi.ulusofona.pt/products')
        .then(response => response.json())
        .then(data => {
            listaProdutosGlobal = data;
            preencherCategorias(data);
            renderizarProdutos(data);
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos da API:', error);
        });
}

if (selectFiltro) selectFiltro.addEventListener('change', processarProdutos);
if (selectOrdenar) selectOrdenar.addEventListener('change', processarProdutos);
if (inputPesquisa) inputPesquisa.addEventListener('input', processarProdutos);

carregarProdutos();
atualizaCesto();
