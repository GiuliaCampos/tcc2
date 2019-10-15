var ej = [];
var base = new metodosBase();

async function start(){
  await base.montarConjuntoEjsCluster(2); 

  //Usados para criar as escalas do gráfico
  var menorFaturamento = d3.min(ej, function(d){ return d.faturamento});
  var maiorFaturamento = d3.max(ej, function(d){ return d.faturamento});
  var menorProjetos = d3.min(ej, function(d){ return d.n_projetos});
  var maiorProjetos = d3.max(ej, function(d){ return d.n_projetos});

  //Dimensões do meu svg
  var width = 1200;
  var height = 700;

  //Criação do svg
  var canvas = d3.select(".grafico")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(30 , 40)");

  //Escala no eixo x
  var widthScale = d3.scaleLinear()
                    .domain([menorFaturamento, maiorFaturamento])
                    .range([1, width - 200])
                    .nice();
  var x_axis = d3.axisBottom()
    .scale(widthScale);

  //Escala no eixo y
  var heightScale = d3.scaleLinear()
                      .domain([menorProjetos, maiorProjetos])
                      .range([height/1.5, 0])
                      .nice();
  var y_axis = d3.axisLeft()
    .scale(heightScale);

  canvas.append("g")
    .attr("transform", "translate(10, 10)")
    .call(y_axis);

  var xAxisTranslate = height/1.5 + 20;

  canvas.append("g")
    .attr("transform", "translate(10, " + xAxisTranslate  +")")
    .call(x_axis);  

  //Cluster cor
  var clusterScale = d3.scaleLinear()
    .domain([1, 2, 3, 4, 5])
    .range(['#F55F4F','#FFFF6A','#59F54F', '#4FF5F2', '#C66AFF']);

  // create a tooltip
  var Tooltip = d3.select("#div_template")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }

  var mousemove = function(d) {
    Tooltip
      .html("Nome: " + d.nome + "<br>Faturamento: R$" + d.faturamentoReal
        + "<br>Projetos: " + d.n_projetos + "<br>Cluster: " + d.cluster)
      .style("left", (d3.mouse(this)[0]+10) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }

  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }


  //Criando um circulo para cada posição do Array Federação
  var circulo = canvas.selectAll("circle")
    .data(ej)
    .enter()
      .append("circle")
      .attr("cx", function(d){ return (widthScale(d.faturamento))+30;})
      .attr("cy", function(d){ return (heightScale(d.n_projetos));})
      .attr("fill", function(d){ return (clusterScale(d.cluster));})
      .attr("r", 5)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
}
start();
