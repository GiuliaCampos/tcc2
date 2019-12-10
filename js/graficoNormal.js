var federacao = [];
var base = new metodosBase();

async function start(){
  federacao = await base.getFed();
  await base.montarConjuntoFederacao(federacao); 

  var menorFaturamento = d3.min(federacao, function(d){ return d.faturamento});
  var maiorFaturamento = d3.max(federacao, function(d){ return d.faturamento});
  var medioFaturamento = (maiorFaturamento + menorFaturamento)/2;

  var width = 1000;
  var height = 700;

  federacao.sort(function compare(a,b){
    if(a.faturamento < b.faturamento) return -1;
    if(a.faturamento > b.faturamento) return 1;
    return 0;
  });

  var canvas = d3.select(".grafico")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("transform", "translate(15, 0)");

  var widthScale = d3.scaleLinear()
                    .domain([menorFaturamento, maiorFaturamento])
                    .range([5, width - 150])
                    .nice(); 

  var colorScale = d3.scaleLinear()
                    .domain([menorFaturamento, medioFaturamento, maiorFaturamento])
                    .range(['#F74444','#E4F744', '#44F771']);

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
      .html("Nome: " + d.nome + "<br>Faturamento: " + d.faturamento)
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

    var bars = canvas.selectAll("rect")
              .data(federacao)
              .enter()
                .append("rect")
                .attr("width", 15)
                .attr("height", 10)
                .attr("fill", "#000")
                .attr("y", 0)
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);
      bars
        .transition()
          .attr("y", function(d, i){ return (i+1) * 20})
        .transition()
          .duration(1500)
          .attr("width", function(d){ return widthScale(d.faturamento); })
          .attr("fill", function(d){ return colorScale(d.faturamento); });


  var nome = canvas.selectAll("text")
    .data(federacao)
    .enter()
    .append("text")
      
      .attr("x", function(d){return widthScale(d.faturamento) + 10})
      .attr("y", function(d, i){ return (i+1) * 20 + 10})
      .attr("fill", "black")
      .attr("font-size", 15)
      .attr("font-family", "sans-serif");

    nome
      .transition()
      .delay(1500)
        .text(function(d){ return d.nome + " (" + d.estado + ")"});

  var x_axis = d3.axisBottom()
        .scale(widthScale);

  var xAxisTranslate = 0;

  canvas.append("g")
    .attr("transform", "translate(-5 , " + xAxisTranslate  +")")
    .call(x_axis);


  var x_axis2 = d3.axisBottom()
        .scale(widthScale);

  var xAxisTranslate2 = height - 130;

  canvas.append("g")
    .attr("transform", "translate(-5, " + xAxisTranslate2  +")")
    .call(x_axis2);
}
start();
