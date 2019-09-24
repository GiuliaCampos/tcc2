<head>
	<title>Gráfico de barra</title>
	<link rel="stylesheet" href="css/estilo.css">
	<link rel="stylesheet" href="css/bootstrap.css">
	<style>
	.chart div {
		font: 12px sans-serif;
		/*background-color: #8A2BE2;*/
		padding: 4px;
		margin: 2px;
		/*color:  #FFF8DC;*/
	}
	#dashboard {
		width: 450px;
		border: 1px solid white;
	}

	svg {
		font: 10px sans-serif;
	}

	.y.axis path {
		display: none;
	}

	.y.axis line {
		stroke: #fff;
		stroke-opacity: .2;
		shape-rendering: crispEdges;
	}

	.y.axis .zero line {
		stroke: #000;
		stroke-opacity: 1;
	}

	.title {
		font: 300 78px Helvetica Neue;
		fill: #666;
	}

	.birthyear,
	.age {
		text-anchor: middle;
	}

	.birthyear {
		fill: #fff;
	}

	rect {
		fill-opacity: .6;
		fill: #e377c2;
	}

	rect:first-child {
		fill: #1f77b4;
	}


</style>
</head>
<div class="teste">

</div>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="js/index.js"></script>
<script src="js/gf.js"></script>
