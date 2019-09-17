//EMPRESA,FED,CLUSTER,FATURAMENTO,PORCENTAGEM,N_PROJETOS,
//ACOES_COMPARTILHADAS,PARTICIPACAO,NPS,PROJETOS_IMPACTO
var Federacao = [];

d3.csv("csv/teste2.csv", function(error, data) {
  //Criando o vetor com cada federação e faturamento igual a 0
  data.forEach(function(d){
    var controle = true;
    Federacao.forEach(function(f){
      if(d.FED == f.nome)
        controle = false;
    });
    if(controle){
      Federacao.push({
        nome: d.FED,
        faturamento : 0,
        n_projetos : 0,
        projetos_impacto : 0
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


  //Usados para criar as escalas do gráfico
  var menorFaturamento = d3.min(Federacao, function(d){ return d.faturamento});
  var maiorFaturamento = d3.max(Federacao, function(d){ return d.faturamento});
  var maiorProjetos = d3.max(Federacao, function(d){ return d.n_projetos});
  var menorProjetos = d3.min(Federacao, function(d){ return d.n_projetos});
  var maiorProjetosImp = d3.max(Federacao, function(d){ return d.projetos_impacto});
  var menorProjetosImp = d3.min(Federacao, function(d){ return d.projetos_impacto});


  //Dimensões do meu svg
  var width = 1100;
  var height = 750;

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
                    .range([0, width - 200])
                    .nice();
    var x_axis = d3.axisBottom()
        .scale(widthScale);

  //Escala no eixo y
  var heightScale = d3.scaleLinear()
                    .domain([menorProjetos, maiorProjetos])
                    .range([height/1.5, 0])
                    .nice();
    var y_axis = d3.axisLeft()
      .scale(heightScale);

  canvas.append("g")
    .attr("transform", "translate(0, 10)")
    .call(y_axis);

  var xAxisTranslate = height/1.5 + 10;

  canvas.append("g")
    .attr("transform", "translate(5, " + xAxisTranslate  +")")
    .call(x_axis);  

  //Escala para o raio
  var raioScale = d3.scaleLinear()
                    .domain([menorProjetosImp, maiorProjetosImp])
                    .range([5, 50]);

  //Uma cor diferente para cada circle
  var color = d3.scaleOrdinal(d3.schemeCategory20);


  //Criando um circulo para cada posição do Array Federação
  var circulo = canvas.selectAll("circle")
                  .data(Federacao)
                  .enter()
                    .append("circle")
                    .attr("cx", 10)
                    .attr("cy", 10)
                    .attr("r", 5)
                    .attr("fill","black")
                    .on("mouseup",function(d){
                        d3.select(this);
                                    
                        console.log(d.nome);
                    });

    //Adicionando uma animação ao carregar a página
    circulo
        .transition()
          .duration(2000)
          .attr("cy", function(d){ return (heightScale(d.n_projetos));})
          .attr("cx", function(d){ return (widthScale(d.faturamento))+5;})
        .transition()
          .attr("r", function(d){ return raioScale(d.projetos_impacto); })
          .attr("fill",function(d,i){return color(i);});
});
