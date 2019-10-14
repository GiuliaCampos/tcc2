class metodosBase{
montarConjuntoEjs(){
  return new Promise((resolve, reject) => {
    d3.csv("csv/teste2.csv", function(error, data) {
      d3.csv("csv/monthly_editado.csv", function(error, data1){

        var auxCluster;
        data.forEach(function(d){
          if(d.CLUSTER == "S/N") auxCluster = 1;
          else auxCluster = +d.CLUSTER;

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
            cluster: auxCluster,
            faturamento: d.FATURAMENTO,
            n_projetos: d.N_PROJETOS,
            n_membros: 0,
            tempoProj: 1,
            indice_2020: 0
          });

        });

        data1.forEach(function(d){
          ej.forEach(function(e, index){
            if(d.EMPRESA_JUNIOR == e.nome){
              d.MEMBROS = +d.MEMBROS;
              e.n_membros = d.MEMBROS;
              if( (d.TEMPO_MEDIO_DIAS == "NaN") || (d.TEMPO_MEDIO_DIAS == "N/A")){
                e.tempoProj = 1;
              }
              else{
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


montarConjuntoFederacao(){
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
    });
  });
}
}
