var federacao = [];
var base = new metodosBase();

async function start(){
  await base.montarConjuntoFederacao(federacao).then(() => {
    document.getElementById('cssload-loader').style.display = 'none';   //quando obter resposta do await, muda o display da animacao
  }); 

  var faturamentoReal = federacao.forEach(function(d){
    var tmp = d.faturamento+'00';
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
          if( tmp.length > 6 )
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    d.faturamentoReal = tmp;
  }); 

  //Usados para criar as escalas do gráfico
  var menorFaturamento = d3.min(federacao, function(d){ return d.faturamento});
  var maiorFaturamento = d3.max(federacao, function(d){ return d.faturamento});
  var maiorProjetos = d3.max(federacao, function(d){ return d.n_projetos});
  var menorProjetos = d3.min(federacao, function(d){ return d.n_projetos});
  var maiorPIB = d3.max(federacao, function(d){ return d.pib});
  var menorPIB = d3.min(federacao, function(d){ return d.pib});
  var maiorProjetosImp = d3.max(federacao, function(d){ return d.projetos_impacto});
  var menorProjetosImp = d3.min(federacao, function(d){ return d.projetos_impacto});


  //Dimensões do meu svg
  var width = 1200;
  var height = 750;

  //Criação do svg
  var canvas = d3.select(".grafico")
                .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                .append("g")
                  .attr("transform", "translate(60 , 60)");

  //Escala no eixo x
  var widthScale = d3.scaleLinear()
                    .domain([menorProjetos, maiorProjetos])
                    .range([0, width - 200])
                    .nice();
    var x_axis = d3.axisBottom()
        .scale(widthScale);

  //Escala no eixo y
  var heightScale = d3.scaleLinear()
                    .domain([menorPIB, 640185780])
                    .range([height/1.5, 0])
                    .nice();
    var y_axis = d3.axisLeft()
      .scale(heightScale);

  canvas.append("g")
    .attr("transform", "translate(30, 10)")
    .call(y_axis);

  var xAxisTranslate = height/1.5 + 10;

  canvas.append("g")
    .attr("transform", "translate(35, " + xAxisTranslate  +")")
    .call(x_axis);  

  //Escala para o raio
  var raioScale = d3.scaleLinear()
                    .domain([menorProjetosImp, maiorProjetosImp])
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
    .style("padding", "5px");

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
      .html("Nome: " + d.nome + "<br>PIB: R$" + d.pib
        + "<br>Nº Projetos: " + d.n_projetos 
        + "<br>Projetos de Impacto: " + d.projetos_impacto
        + "<br>Estado: " + d.estado)
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

  // text label for the x axis
  canvas.append("text")             
      .attr("transform",
            "translate(550, 550)")
      .style("text-anchor", "middle")
      .text("Número de Projetos");

   // text label for the y axis
  canvas.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -60)
      .attr("x", -210)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("PIB");   


  //Criando um circulo para cada posição do Array Federação
  var circulo = canvas.selectAll("circle")
                  .data(federacao)
                  .enter()
                    .append("circle")
                    .attr("cx", function(d){ return (widthScale(d.n_projetos))+35;})
                    .attr("cy", function(d){ return (heightScale(d.pib));})
                    .attr("r", 5)
                    .attr("fill","black")
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseleave", mouseleave);

    //Adicionando uma animação ao carregar a página
    circulo
        .transition()
          .duration(1000)
        .transition()
          .attr("r", function(d){ return raioScale(d.projetos_impacto); })
          .attr("fill",function(d,i){return color(i);});
}
start();
