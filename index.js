// index.js

const textArea = document.getElementById("input-text");
const mensaje = document.getElementById("encrypted-text");
const copia = document.querySelector(".btn-copiar");
const mensajeContainer = document.querySelector(".mensaje");
copia.style.display = "none";

function validarTexto() {
    let textoEscrito = textArea.value;
    let validador = textoEscrito.match(/^[a-z]*$/);

    if (!validador || validador.length === 0) {
        alert("Solo se permiten letras minúsculas y sin acentos");
        return true;
    }
}

function convertText(action) {
    if (!validarTexto()) {
        const inputText = textArea.value.toLowerCase();
        let outputText = "";

        if (action === "encrypt") {
            outputText = encriptar(inputText);
            mensaje.value = outputText;
            copia.style.display = "block";
            mensajeContainer.style.backgroundImage = "none";
            const encryptButton = document.querySelector('.btn-encrypt');
            const decryptButton = document.querySelector('.btn-decrypt');
            encryptButton.disabled = true;
            decryptButton.disabled = false;
        } else if (action === "decrypt") {
            outputText = desencriptar(inputText);
            mensaje.value = outputText;
            copia.style.display = "block";

            // Verificamos si el resultado es una palabra encriptada o el área de mensaje está vacía
            // Si es una palabra encriptada, mostramos la imagen de fondo
            // Si no es una palabra encriptada o el área de mensaje está vacía, eliminamos la imagen de fondo
            if (esPalabraEncriptada(outputText) || outputText.trim() === "") {
                mensajeContainer.style.backgroundImage = "url('/desafio1imagenes/Muñeco.png')";
            } else {
                mensajeContainer.style.backgroundImage = "none";
            }

            const encryptButton = document.querySelector('.btn-encrypt');
            const decryptButton = document.querySelector('.btn-decrypt');
            encryptButton.disabled = false;
            decryptButton.disabled = true;
        }
    }
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptada;
}

function esPalabraEncriptada(texto) {
    return /[ei]mes|enter|ai|ober|ufat/.test(texto);
}

function copiar() {
    mensaje.select();
    document.execCommand("copy");
    copia.style.display = "none";
    alert("Texto Copiado");
}

// Escuchar el evento 'input' del textarea para restablecer la imagen si el área de mensaje está vacía
textArea.addEventListener("input", function () {
    if (textArea.value.trim() === "") {
        mensaje.value = "";
        copia.style.display = "none";
        mensajeContainer.style.backgroundImage = "url('/desafio1imagenes/Muñeco.png')";
        const encryptButton = document.querySelector('.btn-encrypt');
        const decryptButton = document.querySelector('.btn-decrypt');
        encryptButton.disabled = false;
        decryptButton.disabled = false;
    }
});
















