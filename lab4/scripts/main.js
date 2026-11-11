// Otimização: Pesquisas feitas fora das funções (Boas Práticas)

// --- 1. Evento: mouseover / mouseout ---
const textoPassa = document.querySelector('#texto-passa');

textoPassa.addEventListener('mouseover', function() {
    textoPassa.textContent = '1. Obrigado por passares!';
});

textoPassa.addEventListener('mouseout', function() {
    textoPassa.textContent = '1. Passa por aqui!';
});

// --- 2. Evento: click para pintar o título ---
const tituloPinta = document.querySelector('#titulo-pinta');
const buttonRed = document.querySelector('#button-red');
const buttonGreen = document.querySelector('#button-green');
const buttonBlue = document.querySelector('#button-blue');

buttonRed.addEventListener('click', function() {
    tituloPinta.style.color = 'red';
});

buttonGreen.addEventListener('click', function() {
    tituloPinta.style.color = 'green';
});

buttonBlue.addEventListener('click', function() {
    tituloPinta.style.color = 'blue';
});

// --- 3. Evento: input (muda a cor do input ciclicamente pelas 4 cores ou volta ao azul claro se vazio) ---
const inputEscrever = document.querySelector('#input-escrever');
// Array com as 4 cores pedidas: cinzento, amarelo, vermelho, azul
const cores = ['gray', 'yellow', 'red', 'blue'];

inputEscrever.addEventListener('input', function() {
    const comprimento = inputEscrever.value.length;

    if (comprimento === 0) {
        // Quando apaga tudo, fica com o azul claro da foto (#add8e6 ou #b0e0e6)
        inputEscrever.style.backgroundColor = '#add8e6';
    } else {
        // Alterna entre as 4 cores com base no tamanho do texto escrito
        const indiceCor = (comprimento - 1) % cores.length;
        inputEscrever.style.backgroundColor = cores[indiceCor];
    }
});

// --- 4. Evento: submeter cor (muda o fundo total da página) ---
const inputCor = document.querySelector('#input-cor');
const buttonSubmeter = document.querySelector('#button-submeter');

buttonSubmeter.addEventListener('click', function() {
    const cor = inputCor.value.trim().toLowerCase();
    if (cor) {
        document.body.style.background = cor;
    }
});

// --- 5. Evento: contador (começa em 33) ---
const buttonConta = document.querySelector('#button-conta');
const valorContador = document.querySelector('#valor-contador');
let contador = 33;

buttonConta.addEventListener('click', function() {
    contador++;
    valorContador.textContent = contador;
});
