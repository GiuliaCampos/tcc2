var federacao = [];
var base = new metodosBase();
// federacao = base.getEj();

async function start(){
  await base.montarConjuntoFederacaoComDadosAtuais(federacao).then(() => {
    document.getElementById('cssload-loader').style.display = 'none';   //quando obter resposta do await, muda o display da animacao
  }); 
  
  // set the dimensions and margins of the graph
  var margin = {top: 30, right: 50, bottom: 10, left: 80},
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
    var color = d3.scaleLinear()
      .domain([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,27,27])
      .range(['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
      '#66664D', '#991AFF']);

    // Here I set the list of dimension manually to control the order of axis:
    dimensions = ["faturamento", "n_projetos", "n_projetosConectados"];

    // For each dimension, I build a linear scale. I store all in a y object
    var y = {};

    var maiorProjetos = d3.max(federacao, function(d){ return d.n_projetos});
    var menorProjetos = d3.min(federacao, function(d){ return d.n_projetos});
    var maiorFaturamento = d3.max(federacao, function(d){ return d.faturamento});
    var menorFaturamento = d3.min(federacao, function(d){ return d.faturamento});
    var maiorn_projetosConectados = d3.max(federacao, function(d){ return d.n_projetosConectados});
    var menorn_projetosConectados = d3.min(federacao, function(d){ return d.n_projetosConectados});

    y["n_projetos"] = d3.scaleLinear()
    .domain([menorProjetos, maiorProjetos])
    .range([height, 0]);

    y["faturamento"] = d3.scaleLinear()
    .domain([menorFaturamento, maiorFaturamento])
    .range([height, 0]);

    y["n_projetosConectados"] = d3.scaleLinear()
    .domain([menorn_projetosConectados, maiorn_projetosConectados])
    .range([height, 0]);

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
        .style("stroke",  function(d){ return( color(d.ID))} )
        .style("opacity", 1)
    }
  var mousemove = function(d) {
    Tooltip
      .html( d.nome + "<br>Faturamento: R$" + d.faturamento
        + "<br>Projetos: " + d.n_projetos 
        + "<br>Projetos Conectados: " + d.n_projetosConectados
        + "<br>Trimestre: " + d.trimestre)
      .style("left", (d3.mouse(this)[0]+20) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.selectAll("path")
        .style("opacity", 1)
    d3.select(this)
      .style("stroke", function(d){ return( color(d.ID))} )
      .style("opacity", 1)
  }

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
      return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    // Draw the lines
    svg
    .selectAll("myPath")
    .data(federacao)
    .enter()
    .append("path")
        .attr("class", function (d) { return "line" + d.ID } ) // 2 class for each line: 'line' and the group name
        .attr("d",  path)
        .style("fill", "none" )
        .style("stroke", function(d){ return( color(d.ID))} )
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
        $('#line1').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line1").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line1").style("visibility", 'visible');
          }
        });
        $('#line2').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line2").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line2").style("visibility", 'visible');
          }
        });
        $('#line3').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line3").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line3").style("visibility", 'visible');
          }
        });
        $('#line4').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line4").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line4").style("visibility", 'visible');
          }
        });
        $('#line5').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line5").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line5").style("visibility", 'visible');
          }
        });
        $('#line6').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line6").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line6").style("visibility", 'visible');
          }
        });
        $('#line7').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line7").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line7").style("visibility", 'visible');
          }
        });
        $('#line8').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line8").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line8").style("visibility", 'visible');
          }
        });
        $('#line9').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line9").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line9").style("visibility", 'visible');
          }
        });
        $('#line10').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line10").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line10").style("visibility", 'visible');
          }
        });
        $('#line11').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line11").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line11").style("visibility", 'visible');
          }
        });
        $('#line12').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line12").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line12").style("visibility", 'visible');
          }
        });
        $('#line13').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line13").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line13").style("visibility", 'visible');
          }
        });
        $('#line14').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line14").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line14").style("visibility", 'visible');
          }
        });
        $('#line15').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line15").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line15").style("visibility", 'visible');
          }
        });
        $('#line16').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line16").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line16").style("visibility", 'visible');
          }
        });
        $('#line17').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line17").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line17").style("visibility", 'visible');
          }
        });
        $('#line18').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line18").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line18").style("visibility", 'visible');
          }
        });
        $('#line19').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line19").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line19").style("visibility", 'visible');
          }
        });
        $('#line20').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line20").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line20").style("visibility", 'visible');
          }
        });
        $('#line21').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line21").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line21").style("visibility", 'visible');
          }
        });
        $('#line21').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line21").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line21").style("visibility", 'visible');
          }
        });
        $('#line22').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line22").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line22").style("visibility", 'visible');
          }
        });
        $('#line23').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line23").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line23").style("visibility", 'visible');
          }
        });
        $('#line24').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line24").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line24").style("visibility", 'visible');
          }
        });
        $('#line25').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line25").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line25").style("visibility", 'visible');
          }
        });
        $('#line26').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line26").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line26").style("visibility", 'visible');
          }
        });
        $('#line27').change(function(){
          if(!($(this).prop('checked'))){
            d3.selectAll(".line27").style("visibility", 'hidden');
          }  
          if(($(this).prop('checked'))){
            d3.selectAll(".line27").style("visibility", 'visible');
          }
        });
      })
}

  start();

