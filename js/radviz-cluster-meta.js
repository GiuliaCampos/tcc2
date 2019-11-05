var ej = [];
var base = new metodosBase();
ej = base.getEj();

async function start(){
  await base.montarConjuntoEjs(ej).then(() => {
    document.getElementById('cssload-loader').style.display = 'none';   //quando obter resposta do await, muda o display da animacao
  }); 

    var color = d3.scale.ordinal()
      .domain([1,2,3,4,5])
      .range(['#F55F4F','#FFFF6A','#59F54F', '#4FF5F2', '#C66AFF']);

    var dimensions = ["n_projetosAtual", "faturamentoAtual", "n_membros", "tempoProjMedio"];
    var radviz = radvizComponent()
        .config({
            el: document.querySelector('.container'),
            colorAccessor: function(d){ return d['cluster']; },
            dimensions: dimensions,
            size: 800,
            margin: 80,
            useRepulsion: true,
            drawLinks: true,
            tooltipFormatter: function(d){
                return '<h1>' + d.cluster  + '</h1>'
                + d.nome + '<br>' 
                +dimensions.map(function(dB){
                    return dB + ': ' + d[dB]; 
                    })
                .join('<br />');
                }
            });
    radviz.render(ej);
}
start();