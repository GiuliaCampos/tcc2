//EMPRESA,FED,CLUSTER,FATURAMENTO,PORCENTAGEM,N_PROJETOS,
//ACOES_COMPARTILHADAS,PARTICIPACAO,NPS,PROJETOS_IMPACTO
var fatFederacao = [];

d3.csv("csv/teste2.csv", function(error, data) {
  d3.csv("csv/pib_uf.csv", function(error, data1){
  //Criando o vetor com cada federação e faturamento igual a 0
  data.forEach(function(d){
    data1.forEach(function(e){
      var controle = true;
      fatFederacao.forEach(function(f){
        if(d.FED == f.nome)
          controle = false;
      });
      if(controle){
        fatFederacao.push({
          nome: d.FED,
          faturamento : 0,
          estado: null
        });
      }
    });
  });

  data.forEach(function(d) {
    data1.forEach(function(e){
      //Transformando em valores inteiros
      d.CLUSTER = +d.CLUSTER;
      d.PORCENTAGEM = +d.PORCENTAGEM;
      d.N_PROJETOS = +d.N_PROJETOS;
      d.FATURAMENTO = +d.FATURAMENTO;
      d.ACOES_COMPARTILHADAS = +d.ACOES_COMPARTILHADAS;
      d.PARTICIPACAO = +d.PARTICIPACAO;
      d.NPS = +d.NPS;
      d.PROJETOS_IMPACTO = +d.PROJETOS_IMPACTO;

      //Somando meta de faturamento da ej a meta da sua própria federação
      fatFederacao.forEach(function(f){
        if(d.FED == f.nome)
          f.faturamento += d.FATURAMENTO;
        if(f.nome == e.federacao){
          f.estado = e.Unidade;
        }
      });
    });
  });

  var menorFaturamento = d3.min(fatFederacao, function(d){ return d.faturamento});
  var maiorFaturamento = d3.max(fatFederacao, function(d){ return d.faturamento});
  var medioFaturamento = (maiorFaturamento + menorFaturamento)/2;

  var width = 1000;
  var height = 800;

  var canvas = d3.select(".grafico")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("transform", "translate(0 , 0)");

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
      .style("opacity", 0.8)
  }

    var bars = canvas.selectAll("rect")
              .data(fatFederacao)
              .enter()
                .append("rect")
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", "#000")
                .attr("y", 0)
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);
                // .on("mouseup",function(d){
                //   d3.select(this);
                //     document.getElementById("nomeFed").innerHTML = d.nome;
                //     document.getElementById("fatFed").innerHTML = d.faturamento;
                // });

      bars
        .transition()
          .attr("y", function(d, i){ return (i+1) * 25})
        .transition()
          .duration(1500)
          .attr("width", function(d){ return widthScale(d.faturamento); })
          .attr("fill", function(d){ return colorScale(d.faturamento); });


  var nome = canvas.selectAll("text")
    .data(fatFederacao)
    .enter()
    .append("text")
      
      .attr("x", function(d){return widthScale(d.faturamento) + 10})
      .attr("y", function(d, i){ return (i+1) * 25 + 15})
      .attr("fill", "black")
      .attr("font-size", 15)
      .attr("font-family", "sans-serif");

    nome
      .transition()
      .delay(1500)
        .text(function(d){ return d.nome + " (" + d.estado + ")"});
        // .text(function(d){ return d.nome + ´(${d.estado})´ });


  var x_axis = d3.axisBottom()
        .scale(widthScale);

  var xAxisTranslate = 5;

  canvas.append("g")
    .attr("transform", "translate(0 , " + xAxisTranslate  +")")
    .call(x_axis);


  var x_axis2 = d3.axisBottom()
        .scale(widthScale);

  var xAxisTranslate2 = height - 60;

  canvas.append("g")
    .attr("transform", "translate(0 , " + xAxisTranslate2  +")")
    .call(x_axis2);

  });
});
