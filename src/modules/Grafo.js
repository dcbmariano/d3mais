//import * as d3 from "https://cdn.skypack.dev/d3@7"; // web
//import '../../node_modules/d3/dist/d3.min.js';  // carrega todo o d3
import '../../node_modules/d3-force/dist/d3-force.min.js'; // local - requer npm install d3

export default function Grafo(
  /* 
    Função: plota um grafo com D3
    Entrada: { objeto_1 }, { objeto_2 }
    Chamada: 
      Grafo( 
        { {nós}, {links} },
        { opções } 
      )

    Copyright 2021 Observable, Inc.
    Released under the ISC license.
    Adaptado de https://observablehq.com/@d3/force-directed-graph
  */

  // input: objeto 1
  {
    nodes, // objeto com os nós ( [{id}, …])
    links // objeto com as arestas ( [{source, target}, …])
  }, 
  // input: objeto 2
  {
    elemento,
    id_vertice = d => d.id, // para cada vértice como "d", retorne seu id (string)
    grupo_vertice, // para cada vértice como "d", retorne um valor para a cor
    grupos_vertice, // um array de valores ordinais representando os grupos de nós
    titulo_vertice, // para cada vértice como "d", uma string de título
    cor_vertice = "currentColor", // cor do vértice (se não estiver usando uma codificação de cores de grupo)
    borda_vertice = "#fff", // cor da borda do vértice
    largura_borda_vertice = 1.5, // espessura da borda do vértice, em pixels
    opacidade_borda_vertice = 1, // opacidade da borda do vértice
    raio_vertice = 5, // raio do vértice, em pixels
    atração, // valores mais comuns de -100 a 100
    origem_aresta = ({source}) => source, // para cada link como "d", retorna o identificador do vértice
    destino_aresta = ({target}) => target, // para cada link como "d", retorna o identificador do vértice
    titulo_aresta, // título dado à aresta onde value é o nome da propriedade
    cor_aresta = "#999", // cor da borda da aresta
    opacidade_aresta = 0.6, // opacidade da borda da aresta
    espessura_aresta = 1.5,//d=>d.value, //ou //1.5, // para cada link como "d", retorna uma largura de traço em pixels
    ponta_aresta = "round", // linha de traço de link
    força_link, // aceita valores entre 0 e 1 (acima de 1 o campo de força fica muito forte)
    cores = d3.schemeTableau10, // um array com códigos de cores, para os grupos dos vértices
    largura = 960, // largura externa, em pixels
    altura = 600, // altura externa, em pixels
    invalidation // quando esta promessa for resolvida, pare a simulação
  } = {}
) {

  // Calcula valores.
  const N = d3.map(nodes, id_vertice).map(intern);
  const LS = d3.map(links, origem_aresta).map(intern);
  const LT = d3.map(links, destino_aresta).map(intern);

  if (titulo_vertice === undefined) titulo_vertice = (_, i) => N[i];
  const T = titulo_vertice == null ? null : d3.map(nodes, titulo_vertice);
  const G = grupo_vertice == null ? null : d3.map(nodes, grupo_vertice).map(intern);
  const W = typeof espessura_aresta !== "function" ? null : d3.map(links, espessura_aresta);
  const L = typeof cor_aresta !== "function" ? null : d3.map(links, cor_aresta);
  const TA = typeof titulo_aresta !== "function" ? null : d3.map(links, titulo_aresta);

  // Substitua os nós e links de entrada por objetos mutáveis para a simulação.
  nodes = d3.map(nodes, (_, i) => ({id: N[i]}));
  links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i]}));

  // Computar domínios padrão.
  if (G && grupos_vertice === undefined) grupos_vertice = d3.sort(G);

  // Construa as escalas.
  const cor_grupos = grupo_vertice == null ? null : d3.scaleOrdinal(grupos_vertice, cores);

  // Construa as forças.
  const forceNode = d3.forceManyBody();
  const forceLink = d3.forceLink(links).id(({index: i}) => N[i]);
  if (atração !== undefined) forceNode.strength(atração);
  if (força_link !== undefined) forceLink.strength(força_link);

  const simulation = d3.forceSimulation(nodes)
      .force("link", forceLink)
      .force("charge", forceNode)
      .force("center",  d3.forceCenter())
      .on("tick", ticked);

  // plota o SVG
  const svg = d3.select(elemento).append('svg')//d3.create("svg")
      .attr("class", "grafo")
      .attr("width", largura)
      .attr("height", altura)
      .attr("viewBox", [-largura / 2, -altura / 2, largura, altura])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  const link = svg.append("g")
      .attr("class","arestas")
      .attr("stroke", typeof cor_aresta !== "function" ? cor_aresta : null)
      .attr("stroke-opacity", opacidade_aresta)
      .attr("stroke-width", typeof espessura_aresta !== "function" ? espessura_aresta : null)
      .attr("stroke-linecap", ponta_aresta)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class", d=>'aresta');

  const node = svg.append("g")
      .attr("class", "vertices")
      .attr("fill", cor_vertice)
      .attr("stroke", borda_vertice)
      .attr("stroke-opacity", opacidade_borda_vertice)
      .attr("stroke-width", largura_borda_vertice)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("r", raio_vertice)
      .call(drag(simulation));

  if (W) link.attr("stroke-width", ({index: i}) => W[i]);
  if (L) link.attr("stroke", ({index: i}) => L[i]);
  if (G) node.attr("fill", ({index: i}) => cor_grupos(G[i]));
  if (T) node.attr("title", ({index: i}) => T[i]);
  if (titulo_aresta != undefined){
   if (TA) link.attr("title", ({index: i}) => TA[i]);
  }
  //if (T) node.append("title").text(({index: i}) => T[i]);
  if (invalidation != null) invalidation.then(() => simulation.stop());

  function intern(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
  }

  function ticked() {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  function drag(simulation) {    
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  return Object.assign(svg.node(), {scales: {cor_grupos}});
}
