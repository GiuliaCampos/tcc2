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
		<div class="grafico" style="width: 100%;" onload="document.getElementById('cssload-loader').style.visibility = "hidden">
			<h2 class="titulo">Análise Trimestral das Federações</h2>
			<div id="div_template"></div>
		</div>
		<div class="informacao" style="width: 20%;">
			<div class="infoLegenda"><b>Legenda:</b></div>
			<div class="infoLegenda vermelho sombraLegenda" style="margin-top: 15px">
				<input id="line1" type="checkbox" checked data-toggle="toggle">
				Roraima Júnior
			</div>
			<div class="infoLegenda amarelo sombraLegenda" style="margin-top: 15px">
				<input id="line2" type="checkbox" checked data-toggle="toggle">
				Acre Júnior
			</div>
			<div class="infoLegenda verde sombraLegenda" style="margin-top: 15px">
				<input id="line3" type="checkbox" checked data-toggle="toggle">
				FEJEAP
			</div>
			<div class="infoLegenda ciano sombraLegenda" style="margin-top: 15px">
				<input id="line4" type="checkbox" checked data-toggle="toggle">
				Tocantins Júnior
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line5" type="checkbox" checked data-toggle="toggle">
				SERJÚNIOR
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line6" type="checkbox" checked data-toggle="toggle">
				FEJERO
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line7" type="checkbox" checked data-toggle="toggle">
				Piauí Júnior
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line8" type="checkbox" checked data-toggle="toggle">
				FEJEA
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line9" type="checkbox" checked data-toggle="toggle">
				PB Júnior
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line10" type="checkbox" checked data-toggle="toggle">
				RN Júnior
			</div>
		</div>
		<div class="informacao">
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line11" type="checkbox" checked data-toggle="toggle">
				Maranhão Júnior
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line12" type="checkbox" checked data-toggle="toggle">
				Baré Júnior
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line13" type="checkbox" checked data-toggle="toggle">
				FEJEMS
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line14" type="checkbox" checked data-toggle="toggle">
				Juniores
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line15" type="checkbox" checked data-toggle="toggle">
				FEMTEJ
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line16" type="checkbox" checked data-toggle="toggle">
				Pará Júnior
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line17" type="checkbox" checked data-toggle="toggle">
				FEJECE
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line18" type="checkbox" checked data-toggle="toggle">
				FEJEPE
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line19" type="checkbox" checked data-toggle="toggle">
				Goiás Júnior
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line20" type="checkbox" checked data-toggle="toggle">
				Concentro
			</div>		
		</div>
		<div class="informacao">
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line21" type="checkbox" checked data-toggle="toggle">
				FEJESC
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line22" type="checkbox" checked data-toggle="toggle">
				UNIJr-BA
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line23" type="checkbox" checked data-toggle="toggle">
				FEPAR
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line24" type="checkbox" checked data-toggle="toggle">
				FEJERS
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line25" type="checkbox" checked data-toggle="toggle">
				FEJEMG
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line26" type="checkbox" checked data-toggle="toggle">
				RioJunior
			</div>
			<div class="infoLegenda roxo sombraLegenda" style="margin-top: 15px">
				<input id="line27" type="checkbox" checked data-toggle="toggle">
				FEJESP
			</div>
		</div>
	</div>

<script src="js/metodosBase.js"></script>
<script src="d3/d3.min.js"></script>
<script src="js/parallel-coordinates-federacao.js"></script>