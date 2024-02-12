var reinasPorColocar = 8;
const celdasInactivas = [];

function colocarReina(celda) {

    tablero = document.getElementById("tablero");
    fila = celda.parentNode.rowIndex;
    columna = celda.cellIndex;

    if (!celda.classList.contains("celdaConReina") && !celda.classList.contains("celdaInactiva") && (reinasPorColocar > 0)) {

        celda.classList.add("celdaConReina");

        reinasPorColocar--;

        // Desactiva fila y columna
        for (let i = 0; i < 8; i++) {
            if (columna !== i) {
                // Agrega la clase celdaInactiva a la celda actual
                tablero.rows[fila].cells[i].classList.add("celdaInactiva");
                // Registra las coordenadas de la celda actual en el array celdasInactivas
                celdasInactivas.push(`${fila} ${i}`);
            }
            if (fila !== i) {
                tablero.rows[i].cells[columna].classList.add("celdaInactiva");
                celdasInactivas.push(`${i} ${columna}`);
            }
        }

        // Desactiva diagonales
        for (let i = -7; i < 8; i++) {
            if (fila + i >= 0 && fila + i < 8 && columna + i >= 0 && columna + i < 8 && i !== 0) {
                tablero.rows[fila + i].cells[columna + i].classList.add("celdaInactiva");
                celdasInactivas.push(`${fila + i} ${columna + i}`);
            }
            if (fila - i >= 0 && fila - i < 8 && columna + i >= 0 && columna + i < 8 && i !== 0) {
                tablero.rows[fila - i].cells[columna + i].classList.add("celdaInactiva");
                celdasInactivas.push(`${fila - i} ${columna + i}`);
            }
        }

    } else {

        celda.classList.remove("celdaConReina");

        reinasPorColocar++;

        //Restaura fila y columna
        for (let i = 0; i < 8; i++) {
            if (celdasInactivas.includes(`${i} ${columna}`)) {
                // Encuentra el primer registro de la celda actual en el array celdasInactivas
                index = celdasInactivas.indexOf(`${i} ${columna}`);
                // Elimina el registro anterior 
                celdasInactivas.splice(index, 1);

                // Si ya no hay ningún registro de la celda actual en el array, quita la clase celdaInactiva de la celda actual.
                if (!celdasInactivas.includes(`${i} ${columna}`)) {
                    tablero.rows[i].cells[columna].classList.remove("celdaInactiva");
                }
            }

            if (celdasInactivas.includes(`${fila} ${i}`)) {
                index = celdasInactivas.indexOf(`${fila} ${i}`);
                celdasInactivas.splice(index, 1);

                if (!celdasInactivas.includes(`${fila} ${i}`)) {
                    tablero.rows[fila].cells[i].classList.remove("celdaInactiva");
                }
            }
        }

        // Restaura diagonales     
        for (let i = -7; i < 8; i++) {
            if (fila + i >= 0 && fila + i < 8 && columna + i >= 0 && columna + i < 8 && i !== 0) {
                if (celdasInactivas.includes(`${fila + i} ${columna + i}`)) {
                    index = celdasInactivas.indexOf(`${fila + i} ${columna + i}`);
                    celdasInactivas.splice(index, 1)

                    if (!celdasInactivas.includes(`${fila + i} ${columna + i}`)) {
                        tablero.rows[fila + i].cells[columna + i].classList.remove("celdaInactiva");
                    }
                }
            }
            if (fila - i >= 0 && fila - i < 8 && columna + i >= 0 && columna + i < 8 && i !== 0) {
                if (celdasInactivas.includes(`${fila - i} ${columna + i}`)) {
                    index = celdasInactivas.indexOf(`${fila - i} ${columna + i}`);
                    celdasInactivas.splice(index, 1)

                    if (!celdasInactivas.includes(`${fila - i} ${columna + i}`)) {
                        tablero.rows[fila - i].cells[columna + i].classList.remove("celdaInactiva");
                    }
                }

            }
        }
    }

    document.getElementById("contadorDeMovimientos").innerHTML = "<b>" + (8 - reinasPorColocar) + "</b> reina(s) colocada(s). " + "<b>" + reinasPorColocar + "</b> movimiento(s) restante(s).";

    if (reinasPorColocar == 0) {
        felicitacion();
    }
}

function reiniciarJuego() {
    var celda = document.getElementsByClassName("celdaConReina");
    while (celda.length > 0) {
        celda[0].classList.remove("celdaConReina");
    }
    var celdaInactiva = document.getElementsByClassName("celdaInactiva");
    while (celdaInactiva.length > 0) {
        celdaInactiva[0].classList.remove("celdaInactiva");
    }
    reinasPorColocar = 8;

    celdasInactivas.splice(0, celdasInactivas.length)
    document.getElementById("contadorDeMovimientos").innerHTML = "<b>8</b> reina(s) colocada(s). <b>0</b> movimiento(s) restante(s).";
}

function felicitacion() {
    var modal = document.getElementById('congratulations');
    var botonReiniciar = document.getElementById("botonReinicioM");
    var closeButton = modal.querySelector(".close");

    function cerrarModal() {
        modal.style.display = "none";
    }
    closeButton.onclick = cerrarModal;

    botonReiniciar.onclick = function(){
        cerrarModal();
        reiniciarJuego();
    }

    modal.style.display = "block";
}



