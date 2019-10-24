<title>Gráfico de bolha</title>
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/estilo.css">
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
		<div class="grafico">
			<h2 class="titulo">Faturamento e Número de projetos</h2>
			<div id="div_template"></div>
		</div>
		<div class="informacao" style="width: 20%;">
			<div class="infoLegenda"><b>Legenda:</b></div>
			<div class="infoLegenda">Eixo X: Faturamento;</div>
			<div class="infoLegenda">Eixo Y: nº de projetos;</div>
			<div class="infoLegenda">Raio: projetos de impacto</div>			
		</div>
	</div>

<script src="d3/d3.min.js"></script>
<script src="js/metodosBase.js"></script>
<script src="js/gf-bolha.js"></script>