const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let vidas = 6;

//Generar un botón por letra.

function generarBotonesLetras(letras) {
    for (let i = 0; i < letras.length; i++) {

        //crear boton

        let letra = letras[i];
        const btn = document.createElement("button");
        btn.innerHTML = letra;
        btn.value = letra;
        btn.onclick = () => {

            //aqui falta la llamada a la funcion que comprueba si la letra está en la palabra
            vidas--;
            document.getElementById("dibujo").src = "img/hangman" + vidas.toString() + ".png";
            btn.parentNode.removeChild(btn);
        }

        //insertar boton
        document.getElementById("letras").appendChild(btn);
    }
}

function onLoad() {
    generarBotonesLetras(letras);
}

