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

// 2- Fazer o padrão da mask para o cvc:

const securityCodePattern = {
  mask: "0000",
}

// 3- Security Code passando pelo IMask

const securityCodeMasked = IMask(securityCode, securityCodePattern)

// Máscara para a expiração do cartão:

// 1- Pegar o elemento do cartão

const expirationDate = document.querySelector("#expiration-date")

// 2 - Fazer o padrão da mask para a data de expiração:

// A barra no mask tem que ser colocada entre chaves;
// 00 representa qualquer dígito - vai fazer com que esse campo do formulário
// só aceite dígitos;

const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}

// 3 - Aplicar a máscara na data de expiração:

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

// Para fazer a máscara do número do cartão de crédito:

// 1 - Pegar o campo do número do cartão de crédito

const cardNumber = document.querySelector("#card-number")

// 2 - Fazer o padrão da mask para o número do cartão de crédito(máscara dinâmica):

const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    console.log(foundMask)

    return foundMask
  },
}

// 3 - Aplicar a máscara ao número do cartão

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

/* 
Regex para cartão visa: /^4\d{0,15}/

Inicia com 4: ^4,
Seguido de 0 até 15 dígitos (mínimo e máximo): \d{0,15}
*/

/*
Regex para cartão master: /(^5[1-5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/

Inicia com 5: ^5,
Seguido de 1 dígito que pode ser qualquer número entre 1 e 5: [1-5],
Seguido de mais dígitos que podem variar de 0 até 2 dígitos (mínimo e máximo): \d{0,2},
ou então: |,
Inicia com 22: ^22,
Seguido de 1 dígito que pode ser qualquer número entre 2 e 9: [2-9],
Seguido de mais dígitos que podem variar de 0 até 1 dígito: \d{0,1},
ou então: |,
Inicia com 2: ^2,
Seguido de 1 dígito que pode ser qualquer número entre 3 e 7: [3-7],
Seguido de mais dígitos que podem variar de 0 até 2: \d{0,2),
Se o cartão passar na primeira parte da expressão, é validado que o cartão
em questão é um mastercard, então ele termina com mais dígitos que podem
variar entre 0 e 12: \d{0,12}.

Se a verificação do número não passar em qualquer um dos 'ou', significa que não 
é um cartão mastercard.

*/

/*
A função no find() poderia ser passada da seguinte forma:
({regex}) => number.match(regex)
1 - ({regex}): desestruturei o objeto, pegando somente a propriedade regex
2- Passamos como parâmetro para a função find uma arrow function que recebe como
parâmetro a propriedade regex de cada objeto do array.
3- Quando a arrow function retorna somente 1 linha, não precisamos usar a palavra
return, podemos colocar o retorno direto;
4 - Se o número passado der match com a propriedade do objeto de cada cartão, quer dizer
que temos o cartão certo.

*/
