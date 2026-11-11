// --- 1. Evento: mouseover / mouseout ---
const textoPassa = document.querySelector('#texto-passa');

textoPassa.addEventListener('mouseover', function() {
    textoPassa.textContent = '1. Obrigado por passares!';
});

textoPassa.addEventListener('mouseout', function() {
    textoPassa.textContent = '1. Passa por aqui!';
});

// --- 2. Evento: querySelectorAll e Atributos de dados (dataset) ---
const tituloPinta = document.querySelector('#titulo-pinta');

document.querySelectorAll('button.color').forEach(button => {
    button.addEventListener('click', function() {
        tituloPinta.style.color = this.dataset.color;
    });
});

// --- 3. Evento: input (Cores cíclicas) ---
const inputEscrever = document.querySelector('#input-escrever');
const cores = ['gray', 'yellow', 'red', 'blue'];

inputEscrever.addEventListener('input', function() {
    const comprimento = inputEscrever.value.length;

    if (comprimento === 0) {
        inputEscrever.style.backgroundColor = '#add8e6';
    } else {
        const indiceCor = (comprimento - 1) % cores.length;
        inputEscrever.style.backgroundColor = cores[indiceCor];
    }
});

// --- 4. Evento: change utilizando o 'this' ---
document.querySelector('#select-cor').addEventListener('change', function() {
    document.querySelector('body').style.backgroundColor = this.value;
});

// --- 5. Evento: click (Contador manual) ---
const buttonConta = document.querySelector('#button-conta');
const valorContador = document.querySelector('#valor-contador');
let contador = 72;

buttonConta.addEventListener('click', function() {
    contador++;
    valorContador.textContent = contador;
});

// --- 6. Evento: onsubmit do formulário ---
document.querySelector('form').onsubmit = (e) => {
    e.preventDefault(); // Evita que a página recarregue ao submeter[cite: 36]

    const nome = document.querySelector('#input-nome').value;
    const idade = document.querySelector('#input-idade').value;

    document.querySelector('#mensagem-dados').textContent = `Olá, o ${nome} tem ${idade}!`;
};

// --- 7. Temporizador com setInterval ---
let autoContador = 0;

function incrementarContadorAutomatico() {
    autoContador++;
    document.querySelector('#auto-contador').textContent = autoContador;
}

setInterval(incrementarContadorAutomatico, 1000);

// --- Contador com Local Storage ---
if (!localStorage.getItem('counter')) {
    localStorage.setItem('counter', 0);
}

const spanContador = document.querySelector('#contador-valor');
if (spanContador) {
    spanContador.textContent = localStorage.getItem('counter');
}

const btnIncrementar = document.querySelector('#btn-incrementar');
const btnDecrementar = document.querySelector('#btn-decrementar');
const btnReset = document.querySelector('#btn-reset');

if (btnIncrementar) {
    btnIncrementar.addEventListener('click', function() {
        let counter = parseInt(localStorage.getItem('counter')) || 0;
        counter++;
        localStorage.setItem('counter', counter);
        spanContador.textContent = counter;
    });
}

if (btnDecrementar) {
    btnDecrementar.addEventListener('click', function() {
        let counter = parseInt(localStorage.getItem('counter')) || 0;
        counter--;
        localStorage.setItem('counter', counter);
        spanContador.textContent = counter;
    });
}

if (btnReset) {
    btnReset.addEventListener('click', function() {
        let counter = 0;
        localStorage.setItem('counter', counter);
        spanContador.textContent = counter;
    });
}
