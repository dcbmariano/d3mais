/* 
  -----------------------------------------------------------------------------
	Script: main.js
	Função: carregar todos os módulos
	Uso no HTML: <script src="main.js" type="module"></script>
	Autor: diegomariano.com
	Feito com Vanilla JavaScript (com JS raiz e sem framework nutella)
  -----------------------------------------------------------------------------
*/ 

// importações de módulos -----------------------------------------------------
import { $, $$, print } from './src/modules/Atalhos.js'; // importa atalhos $, $$ e print()
import help from './src/modules/Help.js';                // importa ajuda, ex: help('grafo');
import Grafo from './src/modules/Grafo.js';              // importa módulo Grafo()
import Barras from './src/modules/Barras.js';            // importa módulo Barras()

// bibliotecas externas -> tb devem ser chamadas nos módulos 
//import * as d3 from "https://cdn.skypack.dev/d3@7";             // importa d3
import './node_modules/d3/dist/d3.min.js'; // local - requer npm install d3
import './node_modules/bootstrap/dist/js/bootstrap.bundle.js';  // importa bootstrap


// variáveis ------------------------------------------------------------------
const altura = 600;

// dados 
const dados = await d3.json('./src/data/db_miserables.js');


// plota o grafo => modules/Grafo.js ------------------------------------------
Grafo(
  dados, 
  {
    elemento: "#grafo",
    largura:$("#grafo").clientWidth,
    id_vertice: d => d.id,
    grupo_vertice: d => d.group,
    titulo_vertice: d => `${d.id} (Grupo: ${d.group})`,
    //espessura_aresta: l => Math.sqrt(l.value),
    espessura_aresta:45,
    titulo_aresta: d => "Irregularidade: "+d.value,
    raio_vertice: 12,
    altura: altura,
    atração:-50,
    //invalidation // a promise to stop the simulation when the cell is re-run
  }
);


// plota o gráfico de barras VERTICAL => modules/Barras.js --------------------
Barras(
  dados.nodes, // dados
  { // config
    tipo: 'vertical',
    elemento: "#barras_verticais",
    largura: $("#barras_verticais").clientWidth,
    x: d=>d.id,
    y: d=>d.group,
    margem: { superior:20, inferior:100, esquerda:40, direita:0 },
    dominio_x: d3.groupSort(dados.nodes, ([d]) => -d.group, d => d.id),
    formato_y: "c", // pode ser: "%", "d", "f", "c", "r"
    altura: 600,
    rotulo_y: "Valor",
    tamanho_fonte_x:75,
    //tamanho_fonte_y:125,
    color: "steelblue"
  }
)

// plota o gráfico de barras => modules/Barras.js HORIZONTAL ------------------
Barras(
  dados.nodes, // dados
  { // config

    tipo: 'horizontal',
    
    elemento: "#barras_horizontais",
    largura: $("#barras_horizontais").clientWidth,
    y: d=>d.id,
    x: d=>d.group,
    margem: { superior:20, inferior:10, esquerda:80, direita:0 },
    //dominio_y: d3.groupSort(dados.nodes, ([d]) => -d.group, d => d.id), // ordenado
    dominio_y: dados.nodes.map(d=>d.id),
    formato_x: "c", // pode ser: "%", "d", "f", "c", "r"
    rotulo_x: "Valor",
    tamanho_fonte:100,
    color: "steelblue",
    tamanho_barra_horizontal:10
  }
)

// pós-carregamento -----------------------------------------------------------
function carrega_tooltips() {
  let tooltips = d3.selectAll('.vertices circle,.arestas line')
    .attr("data-toggle", "tooltip") // atribui o tooltip

  let ativar_tooltips = [...tooltips].map(i => new bootstrap.Tooltip(i))  
}

// verifica se o carregamento foi concluído
if(document.readyState === "loading") {  
  document.addEventListener("DOMContentLoaded", carrega_tooltips);
} else {  
  carrega_tooltips();
}