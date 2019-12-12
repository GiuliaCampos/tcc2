<title></title>
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/estilo.css">
<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
<!-- <style type="text/css">
	rect .overlay{
		opacity: 0;
	}
</style> -->
<meta charset="utf-8">
	<!-- <div id="cssload-loader">
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
		<div class="cssload-dot"></div>
	</div> -->
	<div class="container">
		<div class="grafico" style="width: 100%;" onload="document.getElementById('cssload-loader').style.visibility = "hidden">
			<h2 class="titulo">Análise Cluster</h2>
			<div id="screePlot"></div>
		</div>
		<div class="informacao" style="width: 20%;">
			<!-- <div class="infoLegenda"><b>Legenda:</b></div>
			<div class="infoLegenda vermelho sombraLegenda" style="margin-top: 15px">
				<input id="cluster1" type="checkbox" checked data-toggle="toggle">
				Vermelho: Cluster 1
			</div>	 -->
		</div>
	</div>
<script src="d3/d3.min.js"></script>
<script src="js/metodosBase.js"></script>
<script src="d3-screeplot/d3-screeplot/dist/libs/jquery-3.2.1.min.js"></script>
<script rel="stylesheet" href="d3-screeplot/d3-screeplot/dist/ScreePlot.css"></script>
<script src="d3-screeplot/d3-screeplot/dist/ScreePlot.js"></script>
<script>

// nro estado, nro pessoas, renda media
var screePlotData = [
	{
		"factor":1,
		"eigenvalue":41,
		"cumulative_eigenvalue":1204
	},
	{
		"factor":2,
		"eigenvalue":13,
		"cumulative_eigenvalue":909
	},
	{
		"factor":3,
		"eigenvalue":0,
		"cumulative_eigenvalue":857
	},
	{
		"factor":4,
		"eigenvalue":54,
		"cumulative_eigenvalue":1045
	},
	{
		"factor":5,
		"eigenvalue":257,
		"cumulative_eigenvalue":906
	}, 
	{
		"factor":6,
		"eigenvalue":27,
		"cumulative_eigenvalue":1113
	},
	{
		"factor":7,
		"eigenvalue":63,
		"cumulative_eigenvalue":817
	},
	{
		"factor":8,
		"eigenvalue":280,
		"cumulative_eigenvalue":714
	},
	{
		"factor":9,
		"eigenvalue":435,
		"cumulative_eigenvalue":898
	},
	{
		"factor":10,
		"eigenvalue":695,
		"cumulative_eigenvalue":956
	},
	{
		"factor":11,
		"eigenvalue":155,
		"cumulative_eigenvalue":605
	},
	{
		"factor":12,
		"eigenvalue":136,
		"cumulative_eigenvalue":791
	},
	{
		"factor":13,
		"eigenvalue":357,
		"cumulative_eigenvalue":1439
	},
	{
		"factor":14,
		"eigenvalue":627,
		"cumulative_eigenvalue":1295
	},
	{
		"factor":15,
		"eigenvalue":68,
		"cumulative_eigenvalue":1386
	},
	{
		"factor":16,
		"eigenvalue":277,
		"cumulative_eigenvalue":863
	},
	{
		"factor":17,
		"eigenvalue":898,
		"cumulative_eigenvalue":855
	},
	{
		"factor":18,
		"eigenvalue":653,
		"cumulative_eigenvalue":871
	},
	{
		"factor":19,
		"eigenvalue":280,
		"cumulative_eigenvalue":1323
	},
	{
		"factor":20,
		"eigenvalue":1314,
		"cumulative_eigenvalue":2460
	},
	{
		"factor":21,
		"eigenvalue":737,
		"cumulative_eigenvalue":1660
	},
	{
		"factor":22,
		"eigenvalue":1103,
		"cumulative_eigenvalue":841
	},
	{
		"factor":23,
		"eigenvalue":1473,
		"cumulative_eigenvalue":1607
	},
	{
		"factor":24,
		"eigenvalue":875,
		"cumulative_eigenvalue":1705
	},
	{
		"factor":25,
		"eigenvalue":3633,
		"cumulative_eigenvalue":1322
	},
	{
		"factor":26,
		"eigenvalue":1293,
		"cumulative_eigenvalue":1689
	},
	{
		"factor":27,
		"eigenvalue":3225,
		"cumulative_eigenvalue":1898
	}
];

	var screePlotCSSOptions = {
        domElement: "#screePlot",
        width: $('#screePlot').parent().width(),
        height: 550,
        margin:{top: 20,right: 20,bottom: 20,left: 50},
        showGridlines: true,
        noOfGridlines: 10,
        showAxes:false,
        svgBackground:'#FFFFFF',
        barFill: "rgb(0,64,128)",
        barStroke:'#FFFFFF',
        barStrokeWidth:0,
        selBarFill:'rgb(255,0,128)',
        selBarStroke:'#FFFFFF',
        selBarStrokeWidth:0,
        circleFill:'rgb(0,64,128)',
        circleStroke:'#FFFFFF',
        circleStrokeWidth:1,
        selCircleFill:'rgb(255,183,255)',
        selCircleStroke:'#FFFFFF',
        selCircleStrokeWidth:1,
        lineStrokeWidth:2,
        filterLineStrokeWidth:2,
        nodeTextColor:"black"
    };

    var screePlotDataOptions = {
        factorSelected:1
    }

    var screePlot = new ScreePlot(screePlotCSSOptions);
    screePlot.initialize(); // initializes the SVG and UI elements
    screePlot.render(screePlotData,screePlotDataOptions); // Use this to render as well as update with new data and configurations.
	d3.select(".overlay").style("opacity", 0);
</script>