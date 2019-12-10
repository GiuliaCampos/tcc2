<title></title>
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/estilo.css">
<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
<meta charset="utf-8">
	<div id="cssload-loader">
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
	</div>
	<div class="container">
		<div class="grafico" style="width: 100%;">
			<h3 class="titulo">EJs por cluster</h3>
			<p class="titulo"> 
				EJs confederadas a Brasil Junior em 2019, comparativo número de projetos anual e faturamento
			</p>
			<div id="div_template"></div>
		</div>
		<div class="informacao" style="width: 20%;">
			<div class="infoLegenda"><b>Legenda:</b></div>
			<div class="infoLegenda">Eixo X: Faturamento;</div>
			<div class="infoLegenda">Eixo Y: Projetos</div>
			
			<div class="infoLegenda vermelho sombraLegenda" style="margin-top: 15px">
				<input id="cluster1" type="checkbox" checked data-toggle="toggle">
				Vermelho: Cluster 1
			</div>
			<div class="infoLegenda amarelo sombraLegenda" style="margin-top: 15px">
				<input id="cluster2" type="checkbox" checked data-toggle="toggle">
				Amarelo: Cluster 2
			</div>
			<div class="infoLegenda verde sombraLegenda" style="margin-top: 15px">
				<input id="cluster3" type="checkbox" checked data-toggle="toggle">
				Verde: Cluster 3
			</div>
			<div class="infoLegenda ciano sombraLegenda" style="margin-top: 15px">
				<input id="cluster4" type="checkbox" checked data-toggle="toggle">
				Ciano: Cluster 4
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="cluster5" type="checkbox" checked data-toggle="toggle">
				Roxo: Cluster 5
			</div>		
		</div>
	</div>
<script src="d3/d3.min.js"></script>
<script src="js/metodosBase.js"></script>
<script src="js/scatterplot-cluster.js"></script>