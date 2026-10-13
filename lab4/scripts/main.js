// 1. Pesquisa de elementos fora das funções (Boas Práticas de Performance)
let contadorValor = 0;
const spanContador = document.querySelector('#contador');
const btnContar = document.querySelector('#btn-contar');

const btnInterativo = document.querySelector('#btn-interativo');
const textoEvento = document.querySelector('#texto-evento');

const caixaHover = document.querySelector('#caixa-hover');
const areaMovimento = document.querySelector('#area-movimento');
const spanCoords = document.querySelector('#coords');
const imagem = document.querySelector('#minha-imagem');

// 2. Implementação do Contador (Evento: click)
btnContar.addEventListener('click', function() {
    contadorValor++;
    spanContador.textContent = contadorValor;
});

// 3. Evento: click num botão alternativo
btnInterativo.addEventListener('click', function() {
    textoEvento.textContent = "Clicaste no botão principal!";
    textoEvento.style.color = "#e74c3c";
});

// 4. Evento: dblclick (Duplo clique)
btnInterativo.addEventListener('dblclick', function() {
    textoEvento.textContent = "Fizeste DUPLO clique! Excelente.";
    textoEvento.style.color = "#27ae60";
});

// 5. Eventos: mouseover e mouseout na caixa
caixaHover.addEventListener('mouseover', function() {
    caixaHover.style.backgroundColor = '#f9e79f';
    caixaHover.textContent = "O rato está aqui dentro! (Mouseover)";
});

caixaHover.addEventListener('mouseout', function() {
    caixaHover.style.backgroundColor = '#ecf0f1';
    caixaHover.textContent = "O rato saiu da caixa! (Mouseout)";
});

// 6. Evento: mousemove (Acompanhar o movimento do rato)
areaMovimento.addEventListener('mousemove', function(evento) {
    const x = evento.clientX;
    const y = evento.clientY;
    spanCoords.textContent = `X: ${x}, Y: ${y}`;
});

// 7. Evento extra na imagem com rato
imagem.addEventListener('mouseover', function() {
    imagem.style.transform = "scale(1.05)";
});

imagem.addEventListener('mouseout', function() {
    imagem.style.transform = "scale(1)";
});
