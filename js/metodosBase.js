class metodosBase{

  constructor(){
    this.ej = [];
    this.federacao = [];
  }

  getEj(){
    return this.ej;
  }

  getFed(){
    return this.federacao;
  }

  montarConjuntoFederacao(federacao){
    return new Promise((resolve, reject) => {
      d3.csv("csv/teste2.csv", function(error, data) {
        d3.csv("csv/pib_uf.csv", function(error, data1){

          //Criando o vetor com cada federação
          data1.forEach(function(e){
            e.valor = +e.valor;
            federacao.push({
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
            federacao.forEach(function(f, index){
              if(d.FED == f.nome){
                f.faturamento += d.FATURAMENTO;
                f.n_projetos += d.N_PROJETOS;
                f.projetos_impacto += d.PROJETOS_IMPACTO;
              }
              if(federacao.length === index + 1){
                resolve(federacao);
              }
            });
          });
        });
      });
    });
  }

  montarConjuntoEjs(ej){
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

  montarConjuntoEjsCluster(clusterNumber){
    return new Promise((resolve, reject) => {
      d3.csv("csv/teste2.csv", function(error, data) {
        d3.csv("csv/monthly_editado.csv", function(error, data1){

          var auxCluster;
          data.forEach(function(d){
            if(d.CLUSTER == "S/N") auxCluster = 1;
            else auxCluster = +d.CLUSTER;

            if(auxCluster == clusterNumber){
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
            }
          });
        });
      });
    });
  }

}
