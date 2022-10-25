/**
 * @file
 *
 * Implementa una pequeña aplicación web para jugar al "Ahorcado".
 */

// ---------------- Constantes del HTML ----------------

/**Elemento del html con los botones de letras */
const letterContainer = document.getElementById("letras-container")
/**Elemento del html de introducción de la palabra elegida y el botón para usarla */
const introduccionContainer = document.getElementById("introduccion-container")
/**Elemento del html con las "_" del tamaño de la palabra */
const feedback = document.getElementById("feedback")
/**Elemento del html final con opción a juego nuevo*/
const newGameContainer = document.getElementById("nuevo-juego-container")
/**Botón de juego nuevo */
const newGameButton = document.getElementById("nuevo-juego-button")
/**Canvas con el ahorcado */
const canvas = document.getElementById("canvas")
/**Resultado del juego */
const textoResultado = document.getElementById("resultado-text")

//Contadores
let winCount = 0
let contador = 0

let palabraElegida = ""

//-------------------------- Funciones --------------------------

/**
 * Añade al div introduccion-container un título, un input para la palabra elegida
 * (oculta) y un botón para usarla.
 *
 * @summary Genera el bloque de introducción.
 */
function introduccion() {
  introduccionContainer.innerHTML += "<h3>Introduzca la palabra</h3>"
  let intro = document.createElement("div")
  intro.innerHTML += '<input class = "intro" type="password" id="palabra">'
  intro.innerHTML +=
    '<button type ="submit" class="intro" onclick="palabra()">Empezar</button>'
  introduccionContainer.appendChild(intro)
}

/**
 * Bloquea los botones tras acabar la partida.
 */
function blocker() {
  let introButtons = document.querySelectorAll(".intro")
  let letterButtons = document.querySelectorAll(".letras")
  //Desactiva la intro
  introButtons.forEach((button) => {
    button.disabled = true
  })

  //Desactiva las letras
  letterButtons.forEach((button) => {
    button.disabled.true
  })
  newGameContainer.classList.remove("hide")
}

/**
 * Desactiva los botones de introducción, vuelve visibles las letras y
 * comprueba que la palabra es válida antes de aceptarla.
 *
 * @summary Prepara la zona de juego
 */
function palabra() {
  let introButtons = document.querySelectorAll(".intro")
  //Desactiva los botones de introducción
  introButtons.forEach((button) => {
    button.disabled = true
  })

  //Vuelve visible las letras
  letterContainer.classList.remove("hide")
  feedback.innerText = ""

  //Convierte la palabra a mayúsculas y reinicia si no es válida
  palabraElegida = document.getElementById("palabra").value
  palabraElegida = palabraElegida.toUpperCase()

  const regexPalabra = /^[a-zA-Z]+[a-zA-Z]+$/mg

  if (!regexPalabra.test(palabraElegida)) {
    alert("Cagaste")
    location.reload()
  }

  //Reemplaza las letras por "_"
  let displayItem = palabraElegida.replace(
    /./g,
    '<span class="dashes">_</span>'
  )

  //Muestra la palabra en "_"
  feedback.innerHTML = displayItem
}

/**
 * Al iniciar un nuevo juego se esconden secciones, se crean los botones
 * de las letras y se prepara el canvas, a medida que se pulsan las letras
 * si corresponden cambiaran y si no se dibujará más ahorcado.
 *
 * @summary Juego del ahorcado.
 */
function juego() {
  winCount = 0
  contador = 0

  //Esconde todo al inicio
  feedback.innerHTML = ""
  introduccionContainer.innerHTML = ""
  letterContainer.classList.add("hide")
  newGameContainer.classList.add("hide")
  letterContainer.innerHTML = ""

  //Crea los botones de letras
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button")
    button.classList.add("letras")
    //Numero a ASCII[A-Z]
    button.innerText = String.fromCharCode(i)
    //Al darle click a la letra
    button.addEventListener("click", () => {
      let charArray = palabraElegida.split("")
      let dashes = document.getElementsByClassName("dashes")

      //Si está en la palabra elegida se sustituye el "_", sino se dibuja
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char
            winCount += 1
            //Situación de victoria
            if (winCount == charArray.length) {
              textoResultado.innerHTML =
                "<h2 class='win-msg'>Ganaste!</h2><p>La palabra era <span>" +
                palabraElegida +
                "</span></p>"
              blocker()
            }
          }
        })
      } else {
        //Suma el contador y dibujo del ahorcado
        contador += 1
        drawMan(contador)

        //Situación de derrota
        if (contador == 6) {
          textoResultado.innerHTML =
            "<h2 class='lose-msg'>Perdiste :(</h2><p>La palabra era <span>" +
            palabraElegida +
            "</span></p>"
          blocker()
        }
      }
      button.disabled = true
    })
    letterContainer.append(button)
  }

  introduccion()

  //Reinicio del canvas
  let { initialDrawing } = canvasCreator()
  initialDrawing()
}

// ----------------------- Canvas ------------------------

/**
 * Funciones para crear elementos en el canvas que devuelve
 * las partes del ahorcado.
 *
 * @summary Operaciones en el Canvas.
 *
 * @returns {function} Creación de partes del ahorcado
 */
function canvasCreator() {
  let context = canvas.getContext("2d")
  context.beginPath()
  context.strokeStyle = "#000"
  context.lineWidth = 2

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY)
    context.lineTo(toX, toY)
    context.stroke()
  }

  const head = () => {
    context.beginPath()
    context.arc(70, 30, 10, 0, Math.PI * 2, true)
    context.stroke()
  }

  const body = () => {
    drawLine(70, 40, 70, 80)
  }

  const leftArm = () => {
    drawLine(70, 50, 50, 70)
  }

  const rightArm = () => {
    drawLine(70, 50, 90, 70)
  }

  const leftLeg = () => {
    drawLine(70, 80, 50, 110)
  }

  const rightLeg = () => {
    drawLine(70, 80, 90, 110)
  }

  //Frame inicial
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    //bottom line
    drawLine(10, 130, 130, 130)
    //left line
    drawLine(10, 10, 10, 131)
    //top line
    drawLine(10, 10, 70, 10)
    //small top line
    drawLine(70, 10, 70, 20)
  }

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg }
}

/**
 * Pinta el muñeco.
 *
 * En el canvas va añadiendo partes del muñeco ahorcado según
 * los intentos.
 *
 * @param {int} contador Botones de letras pulsados incorrectos
 */
function drawMan(contador) {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator()
  switch (contador) {
    case 1:
      head()
      break
    case 2:
      body()
      break
    case 3:
      leftArm()
      break
    case 4:
      rightArm()
      break
    case 5:
      leftLeg()
      break
    case 6:
      rightLeg()
      break
    default:
      break
  }
}

//----------------------- Inicio --------------------------
newGameButton.addEventListener("click", juego)
window.onload = juego
