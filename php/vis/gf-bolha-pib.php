<title>Gráfico de bolha com PIB</title>
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
		<div class="grafico" style="width: 100%;">
			<h3 class="titulo">Avaliação Faturamento Estadual</h3>
			<p class="titulo">
				Faturamento absuloto anual por estado brasileiro comparado ao número de projetos
			</p>
			<div id="div_template"></div>
		</div>
		<div class="informacao" style="width: 20%;">
				<div class="infoLegenda"><b>Legenda:</b></div>
				<div class="infoLegenda">Eixo X: Faturamento;</div>
				<div class="infoLegenda">Eixo Y: PIB;</div>
				<div class="infoLegenda">Raio: Ticket médio</div>

			<!-- <h6>Nome: </h6>
			<h6 id="nomeFed"> </h6>
			<h6>Faturamento: </h6>
			<h6 id="fatFed"> </h6>
			<h6>PIB: </h6>
			<h6 id="pib"> </h6>
			<h6>Ticket Médio:</h6>
			<h6 id="ticket"> </h6> -->				
		</div>
	</div>
<script src="d3/d3.min.js"></script>
<script src="js/metodosBase.js"></script>
<script src="js/gf-bolha-pib.js"></script>