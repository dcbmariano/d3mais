//import * as d3 from "https://cdn.skypack.dev/d3@7"; // web
import '../../node_modules/d3/dist/d3.min.js'; // local

export default function Barras(
/* 
    Função: plota um gráfico de barras com D3
    Entrada: { objeto_1 }, { objeto_2 }
    Chamada: 
      Barras( 
        { dados },
        { opções } 
      )

    Copyright 2021 Observable, Inc.
    Released under the ISC license.
    Adaptado de https://observablehq.com/@d3/bar-chart
  */

  // input: objeto 1 (dados)
  dados, 

  // input: objeto 2 (opções)
  {
    // CONFIG BÁSICAS
    elemento,
    tipo = 'vertical', // 'vertical' ou 'horizontal'
	  x = (d, i) => i, // dado d em dados, retorna o valor x (ordinal)
		y = d => d, // dado d em dados, retorna o valor y (quantitativo)
    titulo, // dado d em dados, retorna o texto do título
    
    // MEDIDAS
    margem={ // margens do gráfico 
			superior:20,inferior:30,
			direita:0,esquerda:40
		}, // a margem top, bottom, right e left, em pixels	
    largura = 960, // a largura externa do gráfico, em pixels
		altura = 600, // a altura externa do gráfico, em pixels
    largura_interna = [margem.esquerda, largura - margem.direita], // [esquerda, direita]
    altura_interna = [altura - margem.inferior, margem.superior], // [inferior, superio]

		margem_interna_x = 0.1, // quantidade de x-range para reservar para separar barras
    margem_interna_y = 0.1, // margem interna entre as barras // gráfico horizontal

    dominio_x, // um array de valores x (ordinais) // gráfico vertical
    dominio_y, // [ymin, ymax] // gráfico horizontal
    
    tipo_x = d3.scaleLinear, // tipo de escala x // gráfico vertical
    tipo_y = d3.scaleLinear, // tipo de escala y // gráfico horizontal

		formato_x, // um caractere especificador de formato p/ o eixo (%,d,c,f,e,s)
    formato_y, // (%=percentual,d=inteiro,c=string,f=float,s=numero elevado a)
    
    // TEXTO 
    rotulo_x, // um subtitulo para o eixo x
    rotulo_y, // um subtitulo para o eixo y

    rotacao_texto_eixo_x = -65, // rotação do rótulo da legenda (eixo x)
    rotacao_texto_eixo_y = 0,   // rotação texto eixo y
    
    tamanho_fonte=100,   // Tamanho fonte: (opções) <75 (fonte pequena)
    tamanho_fonte_x=100, // igual a 100 (normal), ie, não altera o padrão
    tamanho_fonte_y=100, // >125 (fonte grande) / igual a 200 (tamanho dobrado)

		color = "currentColor" // cor de preenchimento da barra

  } = {}
){
  // Computar valores.
  const X = d3.map(dados, x);
  const Y = d3.map(dados, y);

  // Computar domínios padrão e exclusivo do domínio x.
  
  if (dominio_x === undefined) dominio_x = X;
  if (dominio_y === undefined) dominio_y = [0, d3.max(Y)];
  dominio_x = new d3.InternSet(dominio_x);

  // Omite qualquer dado não presente no dominio_x.
  const I = d3.range(X.length).filter(i => dominio_x.has(X[i]));

  // Construa escalas, eixos e formatos.
  const escala_x = d3.scaleBand(dominio_x, largura_interna).padding(margem_interna_x);
  const escala_y = tipo_y(dominio_y, altura_interna);
  const eixo_x = d3.axisBottom(escala_x).tickSizeOuter(0);
  const yAxis = d3.axisLeft(escala_y).ticks(altura / 40, formato_y);

  // Calcula títulos.
  if (titulo === undefined) {
    const formatValue = escala_y.tickFormat(100, formato_y);
    titulo = i => `${X[i]}\n${formatValue(Y[i])}`;
  } else {
    const O = d3.map(dados, d => d);
    const T = titulo;
    titulo = i => T(O[i], i, dados);
  }

  const svg = d3.select(elemento).append('svg')
      .attr("class", "grafico_barras")
      .attr("width", largura)
      .attr("height", altura)
      .attr("viewBox", [0, 0, largura, altura])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  // EIXO Y
  svg.append("g")
      .attr("class","eixo_y")
      .attr("transform", `translate(${margem.esquerda},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", largura - margem.esquerda - margem.direita)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -margem.esquerda)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(rotulo_y));

  // BARRAS
  const bar = svg.append("g")
      .attr("class", "barras")
      .attr("fill", color)
    .selectAll("rect")
    .data(I)
    .join("rect")
      .attr("class", "barra")
      .attr("x", i => escala_x(X[i]))
      .attr("y", i => escala_y(Y[i]))
      .attr("height", i => escala_y(0) - escala_y(Y[i]))
      .attr("width", escala_x.bandwidth());

  if (titulo) bar.append("title")
      .text(titulo);

  svg.append("g")
      .attr("class","eixo_x")
      .attr("transform", `translate(0,${altura - margem.inferior})`)
      .call(eixo_x)
      .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", `rotate(${rotacao_texto_eixo_x})`);;


  // alterando o tamanho das legendas
  if(tamanho_fonte != 100){ // altera ambos
    tamanho_fonte = (tamanho_fonte/100).toFixed(2);   // altera eixos x e y
    d3.selectAll('.grafico_barras text').style('font-size',`${tamanho_fonte}em`);
  }

  if(tamanho_fonte_x != 100){ // somente x
    tamanho_fonte_x = (tamanho_fonte_x/100).toFixed(2); // altera eixo x
    d3.selectAll('.eixo_x text').style('font-size',`${tamanho_fonte_x}em`);
  } 

  if(tamanho_fonte_y != 100){ // somente y
    tamanho_fonte_y = (tamanho_fonte_y/100).toFixed(2); // altera eixo y
    d3.selectAll('.eixo_y text').style('font-size',`${tamanho_fonte_y}em`);
  }


  return svg.node();
}