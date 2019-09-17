//EMPRESA,FED,CLUSTER,FATURAMENTO,PORCENTAGEM,N_PROJETOS,
//ACOES_COMPARTILHADAS,PARTICIPACAO,NPS,PROJETOS_IMPACTO
var fatFederacao = [];

d3.csv("csv/teste2.csv", function(error, data) {
  //Criando o vetor com cada federação e faturamento igual a 0
  data.forEach(function(d){
    var controle = true;
    fatFederacao.forEach(function(f){
      if(d.FED == f.nome)
        controle = false;
    });
    if(controle){
      fatFederacao.push({
        nome: d.FED,
        faturamento : 0
      });
    }
  });

  data.forEach(function(d) {
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
    });

  });

  var menorFaturamento = d3.min(fatFederacao, function(d){ return d.faturamento});
  var maiorFaturamento = d3.max(fatFederacao, function(d){ return d.faturamento});
  var medioFaturamento = (maiorFaturamento + menorFaturamento)/2;

  var width = 1200;
  var height = 1000;

  var canvas = d3.select(".grafico")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("transform", "translate(0 , 0)");

  var widthScale = d3.scaleLinear()
                    .domain([menorFaturamento, maiorFaturamento])
                    .range([5, width - 100])
                    .nice(); 

  var colorScale = d3.scaleLinear()
                    .domain([menorFaturamento, medioFaturamento, maiorFaturamento])
                    .range(['#F74444','#E4F744', '#44F771']);

    var bars = canvas.selectAll("rect")
              .data(fatFederacao)
              .enter()
                .append("rect")
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", "#000")
                .attr("y", 0);

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
        .text(function(d){ return d.nome});


  var x_axis = d3.axisBottom()
        .scale(widthScale);

  var xAxisTranslate = 5;

  canvas.append("g")
    .attr("transform", "translate(0 , " + xAxisTranslate  +")")
    .call(x_axis);


  var x_axis2 = d3.axisBottom()
        .scale(widthScale);

  var xAxisTranslate2 = height - 280;

  canvas.append("g")
    .attr("transform", "translate(0 , " + xAxisTranslate2  +")")
    .call(x_axis2);

  
});
