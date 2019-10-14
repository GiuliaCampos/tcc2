<head>
	<link rel="stylesheet" href="css/bootstrap.css">
	<script src="bootstrap-4.3.1-dist/bootstrap-4.3.1-dist/js/bootstrap.js"></script>
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
</head>

<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #3A527B;">
	<a class="navbar-brand" href="index.php?menu=home">Início</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação">
		<span class="navbar-toggler-icon"></span>
	</button>

	<div class="collapse navbar-collapse" id="conteudoNavbarSuportado">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">ScatterPlot</a>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="index.php?menu=gf-bolha">Faturamento x nº Proj</a>
					<a class="dropdown-item" href="index.php?menu=gf-bolha-pib">Faturamento x Pib Estadual</a>
					<a class="dropdown-item" href="index.php?menu=gf-scatterplot-cluster">Cluster Ejs</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="index.php?menu=bubble">Bolhas</a>
				</div>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">ScatterPlot Cluster</a>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="index.php?menu=gf-scatterplot-cluster1">Cluster 1</a>
					<a class="dropdown-item" href="index.php?menu=gf-scatterplot-cluster2">Cluster 2</a>
					<a class="dropdown-item" href="index.php?menu=gf-scatterplot-cluster3">Cluster 3</a>
					<a class="dropdown-item" href="index.php?menu=gf-scatterplot-cluster4">Cluster 4</a>
					<a class="dropdown-item" href="index.php?menu=gf-scatterplot-cluster5">Cluster 5</a>
				</div>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Graficos de Barras</a>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="index.php?menu=gf-faturamento-estadualBarras">Faturamento Estadual</a>
					<a class="dropdown-item" href="index.php?menu=gf-empilhamento">Empilhamento</a>
				</div>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Coordenada Paralela</a>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="index.php?menu=parallel-coordinates-cluster">Cluster</a>
					<a class="dropdown-item" href="index.php?menu=parallel-coordinates-part-eventos">Participação em eventos</a>
				</div>
			</li>
		</ul>
			<!-- <form class="form-inline my-2 my-lg-0">
				<input class="form-control mr-sm-2" type="search" placeholder="Pesquisar" aria-label="Pesquisar">
				<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Pesquisar</button>
			</form> -->
		</div>
	</nav>

	<script src="d3/d3.min.js"></script>
	<script src="js/index.js"></script>
