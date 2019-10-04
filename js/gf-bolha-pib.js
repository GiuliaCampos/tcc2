//EMPRESA,FED,CLUSTER,FATURAMENTO,PORCENTAGEM,N_PROJETOS,
//ACOES_COMPARTILHADAS,PARTICIPACAO,NPS,PROJETOS_IMPACTO
var Federacao = [];

d3.csv("csv/teste2.csv", function(error, data) {
  d3.csv("csv/pib_uf.csv", function(error, data1){

  //Criando o vetor com cada federação
  data1.forEach(function(e){
    e.valor = +e.valor;
    Federacao.push({
      nome: e.federacao,
      estado: e.Unidade,
      faturamento: 0,
      n_projetos: 0,
      projetos_impacto: 0,
      ticket: 0,
      pib: e.valor,
    });
  });

  data.forEach(function(d) {
    //Transformando em valores inteiros
    d.CLUSTER = +d.CLUSTER;
    d.PORCENTAGEM = +d.PORCENTAGEM;
    d.N_PROJETOS = +d.N_PROJETOS;
    d.FATURAMENTO = +d.FATURAMENTO;
    d.ACOES_COMPARTILHADAS = +d.ACOES_COMPARTILHADAS;
    d.PARTICIPACAO_EVENTOS = +d.PARTICIPACAO_EVENTOS;
    d.NPS = +d.NPS;
    d.PROJETOS_IMPACTO = +d.PROJETOS_IMPACTO;

    //Somando as metas da ej, a meta da sua própria federação
    Federacao.forEach(function(f){
      if(d.FED == f.nome){
        f.faturamento += d.FATURAMENTO;
        f.n_projetos += d.N_PROJETOS;
        f.projetos_impacto += d.PROJETOS_IMPACTO;
      }
    });
  });

  //EIXO X =  FATURAMENTO
  //EIXO Y = PIB
  //RAIO = TICKET MÉDIO

  var ticketMedio = Federacao.forEach(function(d){
    d.ticket = (d.faturamento / d.n_projetos);
  });

  //Usados para criar as escalas do gráfico
  var menorFaturamento = d3.min(Federacao, function(d){ return d.faturamento});
  var maiorFaturamento = d3.max(Federacao, function(d){ return d.faturamento});
  var menorPib = d3.min(Federacao, function(d){ return d.pib});
  var maiorPib = d3.max(Federacao, function(d){ return d.pib});
  var menorTicket = d3.min(Federacao, function(d){ return d.ticket});
  var maiorTicket = d3.max(Federacao, function(d){ return d.ticket});

  //Dimensões do meu svg
  var width = 1200;
  var height = 700;

  //Criação do svg
  var canvas = d3.select(".grafico")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(60 , 40)");

  //Escala no eixo x
  var widthScale = d3.scaleLinear()
                    .domain([menorFaturamento, maiorFaturamento])
                    .range([1, width - 200])
                    .nice();
  var x_axis = d3.axisBottom()
    .scale(widthScale);

  //Escala no eixo y
  var heightScale = d3.scaleLinear()
                      .domain([menorPib, maiorPib])
                      .range([height/1.5, 0])
                      .nice();
  var y_axis = d3.axisLeft()
    .scale(heightScale);

  canvas.append("g")
    .attr("transform", "translate(30, 10)")
    .call(y_axis);

  var xAxisTranslate = height/1.5 + 20;

  canvas.append("g")
    .attr("transform", "translate(30, " + xAxisTranslate  +")")
    .call(x_axis);  

  //Escala para o raio
  var raioScale = d3.scaleLinear()
    .domain([menorTicket, maiorTicket])
    .range([5, 50]);

  //Uma cor diferente para cada circle
  var color = d3.scaleOrdinal(d3.schemeCategory20);

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
      .html("Nome: " + d.nome + "<br>Faturamento: " + d.faturamento
        + "<br>Pib: " + d.pib + "<br>Ticket: " + d.ticket)
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
    .data(Federacao)
    .enter()
    .append("circle")
    .attr("cx", function(d){ return (widthScale(d.faturamento))+50;})
    .attr("cy", function(d){ return (heightScale(d.pib));})
    .attr("r", 5)
    .attr("fill","black")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
    // .on("mouseup",function(d){
    //   d3.select(this);
    //   document.getElementById("nomeFed").innerHTML = d.nome;
    //   document.getElementById("fatFed").innerHTML = d.faturamento;
    //   document.getElementById("pib").innerHTML = d.pib;
    //   document.getElementById("ticket").innerHTML = d.ticket;
    // });

    //Adicionando uma animação ao carregar a página
    circulo
      .transition()
      .duration(500)
      // .attr("cy", function(d){ return (heightScale(d.pib));})
      // .attr("cx", function(d){ return (widthScale(d.faturamento))+50;})
      .transition()
      .attr("r", function(d){ return raioScale(d.ticket); })
      .attr("fill",function(d,i){return color(i);});


  });
});
