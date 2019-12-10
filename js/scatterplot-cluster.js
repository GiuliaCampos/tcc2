var base = new metodosBase();
var ej = [];
ej = base.getEj();

async function start(){
  await base.montarConjuntoEjs(ej).then(() => {
    document.getElementById('cssload-loader').style.display = 'none';   //quando obter resposta do await, muda o display da animacao
  });  
  
  //Usados para criar as escalas do gráfico
  var menorFaturamento = d3.min(ej, function(d){ return d.faturamentoMeta});
  var maiorFaturamento = d3.max(ej, function(d){ return d.faturamentoMeta});
  var menorProjetos = d3.min(ej, function(d){ return d.n_projetosMeta});
  var maiorProjetos = d3.max(ej, function(d){ return d.n_projetosMeta});

  //Dimensões do meu svg
  var width = 1200;
  var height = 700;

  //Criação do svg
  var canvas = d3.select(".grafico")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40 , 40)");

  //Escala no eixo x
  var widthScale = d3.scaleLinear()
                    .domain([menorFaturamento, 200000])
                    .range([1, width - 200])
                    .nice();
                    
  var x_axis = d3.axisBottom()
    .scale(widthScale);

  //Escala no eixo y
  var heightScale = d3.scaleLinear()
                      .domain([menorProjetos, 100])
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
        + "<br>Projetos: " + d.n_projetosMeta + "<br>Federação: " + d.federacao)
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
            "translate(540, 530)")
      .style("text-anchor", "middle")
      .text("Faturamento");

   // text label for the y axis
  canvas.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -210)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Projetos");

  //Criando um circulo para cada posição do Array Federação
  var circulo = canvas.selectAll("circle")
    .data(ej)
    .enter()
      .append("circle")
      .attr("class", function (d) { return "line" + d.cluster } )
      .attr("cx", function(d){ return (widthScale(d.faturamentoMeta)+30);})
      .attr("cy", function(d){ return (heightScale(d.n_projetosMeta));})
      .attr("fill", function(d){ return (clusterScale(d.cluster));})
      .attr("r", 5)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

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

  start()