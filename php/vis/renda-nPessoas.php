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
var screePlotData = [
	{
		"factor":1,
		"eigenvalue":4,
		"cumulative_eigenvalue":1204
	},
	{
		"factor":2,
		"eigenvalue":4,
		"cumulative_eigenvalue":909
	},
	{
		"factor":3,
		"eigenvalue":3,
		"cumulative_eigenvalue":857
	},
	{
		"factor":4,
		"eigenvalue":5,
		"cumulative_eigenvalue":1045
	},
	{
		"factor":5,
		"eigenvalue":10,
		"cumulative_eigenvalue":906
	}, 
	{
		"factor":6,
		"eigenvalue":4,
		"cumulative_eigenvalue":1113
	},
	{
		"factor":7,
		"eigenvalue":5,
		"cumulative_eigenvalue":817
	},
	{
		"factor":8,
		"eigenvalue":17,
		"cumulative_eigenvalue":714
	},
	{
		"factor":9,
		"eigenvalue":23,
		"cumulative_eigenvalue":898
	},
	{
		"factor":10,
		"eigenvalue":28,
		"cumulative_eigenvalue":956
	},
	{
		"factor":11,
		"eigenvalue":13,
		"cumulative_eigenvalue":605
	},
	{
		"factor":12,
		"eigenvalue":12,
		"cumulative_eigenvalue":791
	},
	{
		"factor":13,
		"eigenvalue":18,
		"cumulative_eigenvalue":1439
	},
	{
		"factor":14,
		"eigenvalue":35,
		"cumulative_eigenvalue":1295
	},
	{
		"factor":15,
		"eigenvalue":14,
		"cumulative_eigenvalue":1386
	},
	{
		"factor":16,
		"eigenvalue":21,
		"cumulative_eigenvalue":863
	},
	{
		"factor":17,
		"eigenvalue":39,
		"cumulative_eigenvalue":855
	},
	{
		"factor":18,
		"eigenvalue":23,
		"cumulative_eigenvalue":871
	},
	{
		"factor":19,
		"eigenvalue":18,
		"cumulative_eigenvalue":1323
	},
	{
		"factor":20,
		"eigenvalue":52,
		"cumulative_eigenvalue":2460
	},
	{
		"factor":21,
		"eigenvalue":43,
		"cumulative_eigenvalue":1660
	},
	{
		"factor":22,
		"eigenvalue":41,
		"cumulative_eigenvalue":841
	},
	{
		"factor":23,
		"eigenvalue":64,
		"cumulative_eigenvalue":1607
	},
	{
		"factor":24,
		"eigenvalue":48,
		"cumulative_eigenvalue":1705
	},
	{
		"factor":25,
		"eigenvalue":131,
		"cumulative_eigenvalue":1322
	},
	{
		"factor":26,
		"eigenvalue":50,
		"cumulative_eigenvalue":1689
	},
	{
		"factor":27,
		"eigenvalue":114,
		"cumulative_eigenvalue":1898
	}
];

	var screePlotCSSOptions = {
        domElement: "#screePlot",
        width: $('#screePlot').parent().width(),
        height: 550,
        margin:{top: 20,right: 20,bottom: 20,left: 35},
        showGridlines:true,
        noOfGridlines:10,
        showAxes:false,
        svgBackground:'#FFFFFF',
        barFill:'#3498db',
        barStroke:'#FFFFFF',
        barStrokeWidth:0,
        selBarFill:'#2ECC71',
        selBarStroke:'#FFFFFF',
        selBarStrokeWidth:0,
        circleFill:'#3498db',
        circleStroke:'#FFFFFF',
        circleStrokeWidth:1,
        selCircleFill:'#2ECC71',
        selCircleStroke:'#FFFFFF',
        selCircleStrokeWidth:1,
        lineStrokeWidth:2,
        filterLineStrokeWidth:2,
        nodeTextColor:"#ffff00"
    };

    var screePlotDataOptions = {
        factorSelected:5
    }

    var screePlot = new ScreePlot(screePlotCSSOptions);
    screePlot.initialize(); // initializes the SVG and UI elements
    screePlot.render(screePlotData,screePlotDataOptions); // Use this to render as well as update with new data and configurations.
	d3.select(".overlay").style("opacity", 0);
</script>