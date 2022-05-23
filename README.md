# d3mais
Contém uma série de fachadas para criação de gráficos usando a biblioteca D3.

## Principal script: <i>main.js</i>
  
	Script: main.js
	Função: carregar todos os módulos
	Uso no HTML: <script src="main.js" type="module"></script>
	Autor: diegomariano.com
	Feito com Vanilla JavaScript (com JS raiz e sem framework nutella)

### Sumário
	1. importações de módulos 
	2. variáveis importantes
	3. plota o grafo
	4. plota o gráfico de barras VERTICAL
	5. plota o gráfico de barras HORIZONTAL
	6. pós-carregamento
 

## Principais módulos
- Grafo.js: cria uma grafo com arestas e vértices
- Barras.js: cria um gráfico de barras horizontal ou vertical

## Executar 
Para rodar as bibliotecas JS localmente, execute: ~~~npm install~~~.
Você pode ainda executá-las via CDN. Para isso, comente/descomente cada linha de importação no arquivo "main.js" e nos módulos correspondentes.

Requer um servidor web executando. 

### Opções
- Servidor Node.js: ainda não implementei :(

- Servidor PHP
Inicie um servidor PHP na pasta: 
php -S localhost:8000

Acesse em http://localhost:8000

- XAMPP
Ou coloque o diretório no HTDOCS do XAMPP e acesse com 
http://localhost/d3mais