var ej = [];
var base = new metodosBase();
ej = base.getEj();

async function start(){
  await base.montarConjuntoEjs(ej).then(() => {
    document.getElementById('cssload-loader').style.display = 'none';   //quando obter resposta do await, muda o display da animacao
  }); 
  
  // set the dimensions and margins of the graph
  var margin = {top: 30, right: 50, bottom: 10, left: 50},
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select(".grafico")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Color scale: give me a specie name, I return a color
    var color = d3.scaleOrdinal()
      .domain([1, 2, 3, 4, 5, 1211])
      .range(['#F55F4F','#FFFF6A','#59F54F', '#4FF5F2', '#C66AFF', 'black']);

    // Here I set the list of dimension manually to control the order of axis:
    dimensions = ["n_projetosMeta", "n_projetosAtual", "faturamentoMeta", "faturamentoAtual"];

    // For each dimension, I build a linear scale. I store all in a y object
    var y = {};

    var maiorProjetos = d3.max(ej, function(d){ return d.n_projetosAtual});
    var menorProjetos = d3.min(ej, function(d){ return d.n_projetosAtual});
    var maiorFaturamento = d3.max(ej, function(d){ return d.faturamentoAtual});
    var menorFaturamento = d3.min(ej, function(d){ return d.faturamentoAtual});
    var maiorProjetosMeta = d3.max(ej, function(d){ return d.n_projetosMeta});
    var menorProjetosMeta = d3.min(ej, function(d){ return d.n_projetosMeta});
    var maiorFaturamentoMeta = d3.max(ej, function(d){ return d.faturamentoMeta});
    var menorFaturamentoMeta = d3.min(ej, function(d){ return d.faturamentoMeta});

    y["n_projetosAtual"] = d3.scaleLinear()
    .domain([menorProjetos, maiorProjetos])
    .range([height, 0]);

    y["faturamentoAtual"] = d3.scaleLinear()
    .domain([menorFaturamento, maiorFaturamento])
    .range([height, 0]);

    y["n_projetosMeta"] = d3.scaleLinear()
    .domain([menorProjetos, maiorProjetos])
    .range([height, 0]);

    y["faturamentoMeta"] = d3.scaleLinear()
    .domain([menorFaturamentoMeta, maiorFaturamentoMeta])
    .range([height, 0]);

    // y["ac"] = d3.scaleLinear()
    // .domain([0, 1])
    // .range([height, 0]);

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
    .range([0, width])
    .domain(dimensions);

    var Tooltip = d3.select("#div_template")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

    var mouseover = function(d) {
      Tooltip
        .style("opacity", 1)
      d3.selectAll("path")
        .style("opacity", 0.03)
      d3.select(this)
        .style("stroke",  "black" )
        .style("opacity", 1)
    }
  var mousemove = function(d) {
    Tooltip
      .html( d.nome + "<br>Faturamento: R$" + d.faturamentoAtual
            +"<br>Faturamento Meta: R$" + d.faturamentoMeta
            + "<br>Projetos: " + d.n_projetosAtual
            +"<br>Projetos Meta: " + d.n_projetosMeta)
      .style("left", (d3.mouse(this)[0]+20) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.selectAll("path")
        .style("opacity", 1)
    d3.select(this)
      .style("stroke", function(d){ return( color(d.cluster))} )
      .style("opacity", 1)
  }

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
      return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    // Draw the lines
    svg
    .selectAll("myPath")
    .data(ej)
    .enter()
    .append("path")
        .attr("class", function (d) { return "line" + d.cluster } ) // 2 class for each line: 'line' and the group name
        .attr("d",  path)
        .style("fill", "none" )
        .style("stroke", function(d){ return( color(d.cluster))} )
        .style("stroke-width", 3)
        .style("opacity", 1)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    // Draw the axis:
    svg.selectAll("myAxis")
      // For each dimension of the dataset I add a 'g' element:
      .data(dimensions).enter()
      .append("g")
      .attr("class", "axis")
      // I translate this element to its right position on the x axis
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
      // And I build the axis with the call function
      .each(function(d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); })
      // Add axis title
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d; })
      .style("fill", "black");


      $(function(){
        $('#cluster1').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line1").style("visibility", 'hidden');
            d3.selectAll(".lineNaN").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line1").style("visibility", 'visible');
            d3.selectAll(".lineNaN").style("visibility", 'visible');
          }
        });
        $('#cluster2').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line2").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line2").style("visibility", 'visible');
          }
        });
        $('#cluster3').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line3").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line3").style("visibility", 'visible');
          }
        });
        $('#cluster4').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line4").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line4").style("visibility", 'visible');
          }
        });
        $('#cluster5').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line5").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line5").style("visibility", 'visible');
          }
        });
      })
}

  start();

