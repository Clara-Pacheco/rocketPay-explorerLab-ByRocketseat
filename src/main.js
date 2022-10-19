import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

// querySelector = busca pelo seletor - entre aspas, colocamos qual seletor queremos buscar;
// O selector que queremos pegar, o primeiro path do svg com a cor fill black, encontra-se
// na classe .cc-bg, dentro dessa classe estamos procurando o svg, dentro do svg, queremos o
// primeiro nível de g:

/*
<g>       ------> PRIMEIRO NÍVEL DE G
  <g>     ------> SEGUNDO NÍVEL DE G
    <g>   ------> TERCEIRO NÍVEL DE G
</g>
  </g>
    </g>    

    O símbolo para pegarmos níveis no CSS É o >
    O selector colocado dentro do querySelector é um seletor CSS.
*/

// Dentro desse g de primeiro nível, temos 2 g, um e dois. De início, queremos pegar o
// primeiro g, ou seja g:nth-child(1) ( Lê-se " o g que é o primeiro filho")
// e dentro desse g que é o primeiro filho, queremos pegar o path dele.

// Para alterar a cor do path pelo JS, pegamos o elemento e usamos a propriedade
// setAttribute, que recebe 2 argumentos: o primeiro é o nome do atributo que queremos
// alterar/atualizar/modificar, e o segundo é a cor que queremos atualizar.

// Vamos fazer uma estrutura de dados (objeto) para as cores

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    americanExpress: ["#C503B1", "#C6476D"],
    elo: ["#FF6E06", "#101419"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("mastercard")

// Para colocarmos a função global:

globalThis.setCardType = setCardType

// Máscara para o security code

// 1- Pegar o seletor de cvc

const securityCode = document.querySelector("#security-code")

// 2- Fazer o padrão da mask

const securityCodePattern = {
  mask: "0000",
}

// 3- Security Code passando pelo IMask

const securityCodeMasked = IMask(securityCode, securityCodePattern)
