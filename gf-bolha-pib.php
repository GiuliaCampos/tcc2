<title>Gráfico de bolha com PIB</title>
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/estilo.css">
<meta charset="utf-8">
	<div class="container">
		<div class="grafico" style="width: 100%;">
			<h2 class="titulo">Comparativo de Faturamento e PIB</h2>
			<p class="legenda">
				Legenda: eixo x= Faturamento, eixo y= PIB, raio=ticket médio
			</p>
			<div id="div_template"></div>
		</div>
		<!-- <div class="informacao" style="width: 20%;">
			<h6>Nome: </h6>
			<h6 id="nomeFed"> </h6>
			<h6>Faturamento: </h6>
			<h6 id="fatFed"> </h6>
			<h6>PIB: </h6>
			<h6 id="pib"> </h6>
			<h6>Ticket Médio:</h6>
			<h6 id="ticket"> </h6>				
		</div> -->
	</div>
<script src="d3/d3.min.js"></script>
<script src="js/gf-bolha-pib.js"></script>