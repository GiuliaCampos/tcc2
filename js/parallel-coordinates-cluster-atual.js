var ej = [];
var base = new metodosBase();
ej = base.getEj();

async function start(){
  await base.montarConjuntoEjs(ej).then(() => {
    document.getElementById('cssload-loader').style.display = 'none';   //quando obter resposta do await, muda o display da animacao
  }); 
  
  var margin = {top: 30, right: 50, bottom: 10, left: 50},
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var dragging = {}, extents;
  // x = d3.scaleBand().rangeRound([0, width]).padding(1);

  var svg = d3.select(".grafico")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scaleOrdinal()
      .domain([1,2,3,4,5])
      .range(['#F55F4F','#FFFF6A','#59F54F', '#4FF5F2', '#C66AFF']);

    dimensions = ["tempoProjMedio", "n_membros", "n_projetosAtual", "faturamentoAtual", "indice_2020"];
    // x.domain(dimensions);

    // For each dimension, I build a linear scale. I store all in a y object
    var y = {}
      //for (i in dimensions) {
      //   name = dimensions[i]
      //   y[name] = d3.scaleLinear()
      //     //.domain( [0,8] ) // --> Same axis range for each group
      //     // --> different axis range for each group --> 
      //     //.domain( [d3.extent(data, function(d) { return +d[name]; })] )
      //     .domain( [d3.extent(ej, function(d) { return d[name]; })] )
      //     .range([height, 0])
      // }

      // console.log(y);

    var maiorProjetos = d3.max(ej, function(d){ return d.n_projetosAtual});
    var menorProjetos = d3.min(ej, function(d){ return d.n_projetosAtual});
    var maiorFaturamento = d3.max(ej, function(d){ return d.faturamentoAtual});
    var menorFaturamento = d3.min(ej, function(d){ return d.faturamentoAtual});
    var maiorMembros = d3.max(ej, function(d){ return d.n_membros});
    var menorMembros = d3.min(ej, function(d){ return d.n_membros});
    var maiorTempo = d3.max(ej, function(d){ return d.tempoProjMedio});
    var menorTempo = d3.min(ej, function(d){ return d.tempoProjMedio});

    y["n_projetosAtual"] = d3.scaleLinear()
    .domain([menorProjetos, maiorProjetos])
    .range([height, 0]);

    y["faturamentoAtual"] = d3.scaleLinear()
    .domain([menorFaturamento, maiorFaturamento])
    .range([height, 0]);

    y["n_membros"] = d3.scaleLinear()
    .domain([menorMembros, maiorMembros])
    .range([height, 0]);

    y["tempoProjMedio"] = d3.scaleLinear()
    .domain([menorTempo, maiorTempo])
    .range([height, 0]);

    y["indice_2020"] = d3.scaleLinear()
    .domain([0, 5])
    .nice()
    .range([height, 0]);

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
      .range([0, width])
      .domain(dimensions);

      extents = dimensions.map(function(p) { return [0,0]; });

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
        .style("stroke",  function(d){ return( color(d.cluster))} )
        .style("opacity", 1)
    }

  var mousemove = function(d) {
    Tooltip
      .html( d.nome + "<br>Faturamento: R$" + d.faturamentoAtual
        + "<br>Projetos: " + d.n_projetosAtual + "<br>Membros: " + d.n_membros
        + "<br>Cluster 2020: " + d.indice_2020 
        + "<br>Tempo Medio (dias): " + d.tempoProjMedio)
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
    var g = svg.selectAll("myAxis")
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
      .style("fill", "black")
      .call(d3.drag()
        .subject(function(d) { return {x: x(d)}; })
        .on("start", function(d) {
          dragging[d] = x(d);
          svg.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
          dragging[d] = Math.min(width, Math.max(0, d3.event.x));
          foreground.attr("d", path);
          dimensions.sort(function(a, b) { return position(a) - position(b); });
          x.domain(dimensions);
          svg.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        })
        .on("end", function(d) {
          delete dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
          transition(foreground).attr("d", path);
          svg
              .attr("d", path)
            .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
        })
      );

      g.append("g")
        .attr("class", "brush")
        .each(function(d) {
          d3.select(this).call(d3.brushY().extent([[-8, 0], [8,height]])
            .on("start", brushstart).on("brush", brush_parallel_chart));
        })
        .selectAll("rect")
          .attr("x", -8)
          .attr("width", 16);

      
}
  start();

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
      });


  function position(d) {
    var v = dragging[d];
    return v == null ? x(d) : v;
  }

  function transition(g) {
    return g.transition().duration(500);
  }

  function brushstart() {
    d3.event.sourceEvent.stopPropagation();
  }

 
// Handles a brush event, toggling the display of foreground lines.
function brush_parallel_chart() {    
    for(var i=0;i<dimensions.length;++i){
        if(d3.event.target==y[dimensions[i]].brush) {
            extents[i]=d3.event.selection.map(y[dimensions[i]].invert,y[dimensions[i]]);

        }
    }

      foreground.style("display", function(d) {
        return dimensions.every(function(p, i) {
            if(extents[i][0]==0 && extents[i][0]==0) {
                return true;
            }
          return extents[i][1] <= d[p] && d[p] <= extents[i][0];
        }) ? null : "none";
      });
}