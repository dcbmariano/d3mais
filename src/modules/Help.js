export default function help(modulo='help'){
	/* 
		Função: help()
		Instalação: copie o arquivo "Help.js" para "./src/modules/."
		Importação: dentro do script main.js (type='module'), importe com: 
			import help from './src/modules/Help.js';  
		Uso:
			help(grafo)
	*/
	modulo = modulo.toLowerCase(); // tudo em minúsculo 

	switch(modulo){
		case 'help': 
			console.log(
				"Função: help()\n",
				"Objetivo: fornece ajuda para o uso de cada função\n",
				"Uso: help(nome-da-função)\n",
				"Exemplo: help(grafo)\n",
			);
		break;

		case 'grafo':
			console.log(
				"Função: Grafo()\n",
				"Objetivo: plota um grafo com D3 com vértices e arestas \n",
			    "Entrada: { objeto_1 }, { objeto_2 } \n",
			    "Chamada: \n",
			    "  Grafo( \n",
			    "    { {nós}, {links} }, \n",
			    "    { opções }  \n",
			    "  )\n",
			   	"\n\n------------------\n OPÇÕES:\n------------------\n",
			    "elemento,\n",
			    "id_vertice = d => d.id, // para cada vértice como d, retorne seu id (string)\n",
			    "grupo_vertice, // para cada vértice como d, retorne um valor para a cor\n",
			    "grupos_vertice, // um array de valores ordinais representando os grupos de nós\n",
			    "titulo_vertice, // para cada vértice como d, uma string de título\n",
			    "cor_vertice = 'currentColor', // cor do vértice (se não estiver usando uma codificação de cores de grupo)\n",
			    "borda_vertice = '#fff', // cor da borda do vértice\n",
			    "largura_borda_vertice = 1.5, // espessura da borda do vértice, em pixels\n",
			    "opacidade_borda_vertice = 1, // opacidade da borda do vértice\n",
			    "raio_vertice = 5, // raio do vértice, em pixels\n",
			    "atração, // valores mais comuns de -100 a 100\n",
			    "origem_aresta = ({source}) => source, // para cada link como d, retorna o identificador do vértice\n",
			    "destino_aresta = ({target}) => target, // para cada link como d, retorna o identificador do vértice\n",
			    "cor_aresta = '#999', // cor da borda da aresta\n",
			    "opacidade_aresta = 0.6, // opacidade da borda da aresta\n",
			    "espessura_aresta = 1.5, // para cada link como d, retorna uma largura de traço em pixels\n",
			    "ponta_aresta = 'round', // linha de traço de link\n",
			    "força_link, // aceita valores entre 0 e 1 (acima de 1 o campo de força fica muito forte)\n",
			    "cores = d3.schemeTableau10, // um array com códigos de cores, para os grupos dos vértices\n",
			    "largura = 960, // largura externa, em pixels\n",
			    "altura = 600, // altura externa, em pixels\n",
			    "invalidation // quando esta promessa for resolvida, pare a simulação\n",
			);		
		break;
	}

}