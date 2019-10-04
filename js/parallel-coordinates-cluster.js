var ej = [];


function montarConjuntoEjs(){
  return new Promise((resolve, reject) => {
    d3.csv("csv/teste2.csv", function(error, data) {
      d3.csv("csv/monthly_editado.csv", function(error, data1){

        data.forEach(function(d){

          d.CLUSTER = +d.CLUSTER;
          d.PORCENTAGEM = +d.PORCENTAGEM;
          d.N_PROJETOS = +d.N_PROJETOS;
          d.FATURAMENTO = +d.FATURAMENTO;
          d.ACOES_COMPARTILHADAS = +d.ACOES_COMPARTILHADAS;
          d.PARTICIPACAO_EVENTOS = +d.PARTICIPACAO_EVENTOS;
          d.NPS = +d.NPS;
          d.PROJETOS_IMPACTO = +d.PROJETOS_IMPACTO;

          ej.push({
            nome: d.EMPRESA_JUNIOR,
            federacao: d.FED,
            cluster: d.CLUSTER,
            faturamento: d.FATURAMENTO,
            n_projetos: d.N_PROJETOS,
            n_membros: 0,
            tempoProj: 0
          });

        });

        data1.forEach(function(d){
          d.MEMBROS = +d.MEMBROS;
          ej.forEach(function(e, index){
            if(d.EMPRESA_JUNIOR == e.nome){
              e.n_membros = d.MEMBROS;
              if(d.TEMPO_MEDIO_DIAS == 'NaN'){
                e.tempoProj = 0;
              }
              else{
                // Tratamento para as ejs que não tem o tempo médio de execução
                d.TEMPO_MEDIO_DIAS = +d.TEMPO_MEDIO_DIAS;
                e.tempoProj = d.TEMPO_MEDIO_DIAS;
              }
            }
            if(ej.length === index + 1){
              resolve(ej);
            }
          });
        });
      });
    });
  });
}

async function start(){
  await montarConjuntoEjs(); 

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
      .domain([1,2,3,4,5])
      .range(['#F55F4F','#FFFF6A','#59F54F', '#4FF5F2', '#C66AFF']);

    // Here I set the list of dimension manually to control the order of axis:
    dimensions = ["n_projetos", "faturamento", "n_membros", "tempoProj"];

    // For each dimension, I build a linear scale. I store all in a y object
    var y = {};

    var maiorProjetos = d3.max(ej, function(d){ return d.n_projetos});
    var menorProjetos = d3.min(ej, function(d){ return d.n_projetos});
    var maiorFaturamento = d3.max(ej, function(d){ return d.faturamento});
    var menorFaturamento = d3.min(ej, function(d){ return d.faturamento});
    var maiorMembros = d3.max(ej, function(d){ return d.n_membros});
    var menorMembros = d3.min(ej, function(d){ return d.n_membros});
    var maiorTempo = d3.max(ej, function(d){ return d.tempoProj});
    var menorTempo = d3.min(ej, function(d){ return d.tempoProj});
    console.log(maiorProjetos);

    y["n_projetos"] = d3.scaleLinear()
    .domain([menorProjetos, maiorProjetos])
    .range([height, 0]);

    y["faturamento"] = d3.scaleLinear()
    .domain([menorFaturamento, maiorFaturamento])
    .range([height, 0]);

    y["n_membros"] = d3.scaleLinear()
    .domain([menorMembros, maiorMembros])
    .range([height, 0]);

    y["tempoProj"] = d3.scaleLinear()
    .domain([menorTempo, maiorTempo])
    .range([height, 0]);

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
    .range([0, width])
    .domain(dimensions);

    // Highlight the specie that is hovered
    var highlight = function(d){

      selected_cluster = d.cluster;

      // first every group turns grey
      d3.selectAll(".line")
        .transition().duration(200)
        .style("stroke", "lightgrey")
        .style("opacity", "1");
      // Second the hovered specie takes its color
      d3.selectAll("." + selected_cluster)
        .transition().duration(200)
        .style("stroke", color(selected_cluster))
        .style("opacity", "1");
    }

    // Unhighlight
    var doNotHighlight = function(d){
      d3.selectAll(".line")
      .transition().duration(200)
      .style("stroke", function(d){ return( color(d.cluster))} )
      .style("opacity", "1")
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
        .attr("class", function (d) { return "line " + d.cluster } ) // 2 class for each line: 'line' and the group name
        .attr("d",  path)
        .style("fill", "none" )
        .style("stroke", function(d){ return( color(d.cluster))} )
        .style("opacity", 0.5)
        .on("mouseover", highlight)
        .on("mouseleave", doNotHighlight )

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
}

  start();

