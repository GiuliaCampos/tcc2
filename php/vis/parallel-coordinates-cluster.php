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
			<h2 class="titulo">Análise Cluster</h2>
			<div id="div_template"></div>
		</div>
		<div class="informacao" style="width: 20%;">
			<div class="infoLegenda"><b>Legenda:</b></div>
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

<script src="js/metodosBase.js"></script>
<script src="d3/d3.min.js"></script>
<script src="js/parallel-coordinates-cluster.js"></script>
<script>
	// var ej = [];
	// var base = new metodosBase();
	// ej = base.getEj();
	
	// async function _gerarCsv (){
	// 	await base.montarConjuntoEjs(ej)
     
	// 	var csv = 'id; faturamento; projetos; tempo; membros; cluster\n';

	// 	console.log(ej);
	//     ej.forEach(function(row, index) {
	//     	// console.log(index);
	//         csv += row.ID;
	//         csv += ';'+ row.faturamentoMeta;
	//         csv += ';'+ row.n_projetosMeta;
	//         csv += ';'+ row.tempoProjMedio;
	//         csv += ';'+ row.n_membros;
	//         csv += ';'+ row.cluster;
	//         csv += '\n';
	//     });
	  
	// 	    var hiddenElement = document.createElement('a');
	// 		    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
	// 		    hiddenElement.target = '_blank';
	// 		    hiddenElement.download = 'pex.csv';
	// 		    hiddenElement.click();
	// };
	
	// _gerarCsv();
</script>