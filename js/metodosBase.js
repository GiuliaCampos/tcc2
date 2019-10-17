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
              faturamentoReal: null,
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
      d3.csv("csv/annual_metrics.csv", function(error, data) {
        d3.csv("csv/monthly_updates_agosto.csv", function(error, data1){

          var nome;
          data.forEach(function(d){
            //console.log(nome);

            d.ID = +d.ID;
            d.ACOES_COMPARTILHADAS = +d.ACOES_COMPARTILHADAS;
            d.PARTICIPACAO = +d.PARTICIPACAO;
            d.NPS = +d.NPS;
            d.PROJETOS_IMPACTO = +d.PROJETOS_IMPACTO;
            d.PORCENTAGEM_MEMBROS = +d.PORCENTAGEM_MEMBROS;
            d.N_PROJETOS = +d.N_PROJETOS;
            d.FATURAMENTO = +d.FATURAMENTO;

            var tmp = d.FATURAMENTO+'00';
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
            if( tmp.length > 6 )
              tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");


            ej.push({
              ID: d.ID,
              nome: d.EMPRESA_JUNIOR,
              federacao: d.FED,
              cluster: 1,
              faturamentoMeta: d.FATURAMENTO,
              faturamentoReal: tmp,
              membrosProjetosMeta: d.PORCENTAGEM_MEMBROS,
              n_projetosMeta: d.N_PROJETOS,
              acoesCompartilhadasMeta: d.ACOES_COMPARTILHADAS,
              partcEventosMeta: d.PARTICIPACAO,
              npsMeta: d.NPS,
              projetoImpactoMeta: d.PROJETOS_IMPACTO,
              ac: null,
              tempoProjMedio: 1,
              faturamentoAtual: 0,
              n_projetosAtual: 0,
              n_membrosProjeto: 0,
              npsAtual: 0,
              n_membros: 0,
              indice_2020: 0
            }); //fim do push
          });// fim da leitura das metas
          
          var qntMembros;
          data1.forEach(function(d){
            ej.forEach(function(e, index){
              d.ID = +d.ID;
              //verifica se é a mesma ej
              if(d.ID == e.ID){
                //Armazenando nº de membros
                d.MEMBROS = +d.MEMBROS;
                e.n_membros = d.MEMBROS;

                //qnt de membros que precisam ir em eventos
                qntMembros = (d.MEMBROS * e.partcEventosMeta)/100;
                e.partcEventosMeta = qntMembros;

                //qnt de membros que precisam fazer projetos
                qntMembros = (d.MEMBROS * e.membrosProjetosMeta)/100;
                e.membrosProjetosMeta = qntMembros;

                //caso onde o cluster é NaN
                if((d.CLUSTER_2019 == "NaN") || (d.CLUSTER_2019 == NaN)) e.cluster = 1;
                else{ //caso de um cluster válido
                  d.CLUSTER_2019 = +d.CLUSTER_2019;
                  e.cluster = d.CLUSTER_2019;
                }

                //0 para ej nãoAC e 1 para ej AC
                if(d.AC == "Não") e.ac = 0;
                else e.ac = 1;

                d.TEMPO_MEDIO_DIAS = +d.TEMPO_MEDIO_DIAS;
                e.tempoProjMedio = d.TEMPO_MEDIO_DIAS;

                d.FATURAMENTO = +d.FATURAMENTO;
                e.faturamentoAtual += d.FATURAMENTO;

                e.n_projetosAtual += 1;

                //Não é possível armazenar esse valor pq é referente a apenas 1 projeto
                //d.N_MEMBROS_PROJETO = +d.N_MEMBROS_PROJETO;

                if(d.NPS == 'N/A') e.npsAtual = 0;
                else{
                  d.NPS = +d.NPS;
                  e.npsAtual = d.NPS;
                }

                var indice;
                indice = (e.tempoProjMedio * e.n_projetosAtual * e.faturamentoAtual) / (e.n_membros);
                e.indice_2020 =  indice;

                return

              }//fim do if da ej
              if(ej.length === index + 1){
                resolve(ej);
              }
            }); //fim do array de ejs
          });//fim da leitura atual da ej

        });
      });
    });
  }

  montarConjuntoEjsCluster(ej, clusterNumber){
    return new Promise((resolve, reject) => {
      this.montarConjuntoEjs(ej);
      ej.forEach(function(d, index){
        if(d.cluster != clusterNumber){
          ej.splice(index, 1);
        }
        if(ej.length === index + 1){
          resolve(ej);
        }
      });
    });
  }

}