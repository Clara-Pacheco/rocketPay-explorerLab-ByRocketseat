import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")

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

ccBgColor01.setAttribute("fill", "green")

// Agora faremos o mesmo para a segunda cor:

const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
ccBgColor02.setAttribute("fill", "blue")
