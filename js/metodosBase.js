console.log("Métodos base carregados")

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
      d3.csv("csv/annual_metrics.csv", function(error, data) {
        d3.csv("csv/pib_uf.csv", function(error, data1){

          //Criando o vetor com cada federação
          data1.forEach(function(e){
            e.valor = +e.valor;
            e.renda = +e.renda;
            federacao.push({
              nome: e.federacao,
              estado: e.Unidade,
              faturamento: 0,
              faturamentoReal: 0,
              n_projetos: 0,
              projetos_impacto: 0,
              ticket: 0,
              n_empresa:0,
              n_pessoas:0,
              renda: e.renda,
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
                f.n_empresa += 1;
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

  montarConjuntoFederacaoComDadosAtuais(federacao){
    return new Promise((resolve, reject) => {
      d3.csv("csv/monthly_updates_agosto-_1_.csv", function(error, data) {
        d3.csv("csv/pib_uf.csv", function(error, data1){
          var id;
          //Criando o vetor com cada federação por trimestre
          data1.forEach(function(e){
            id = +e.ID;
            federacao.push({
              nome: e.federacao,
              estado: e.Unidade,
              trimestre: 1,
              faturamento: 0,
              n_projetos: 0,
              n_projetosConectados: 0,
              ID: id,
            });
            federacao.push({
              nome: e.federacao,
              estado: e.Unidade,
              trimestre: 2,
              faturamento: 0,
              n_projetos: 0,
              n_projetosConectados: 0,
              ID: id,
            });
            federacao.push({
              nome: e.federacao,
              estado: e.Unidade,
              trimestre: 3,
              faturamento: 0,
              n_projetos: 0,
              n_projetosConectados: 0,
              ID: id,
            });
          });

          data.forEach(function(d) {
            //Transformando em valores inteiros
            d.FATURAMENTO = +d.FATURAMENTO;

            //Somando as metas da ej, a meta da sua própria federação
            federacao.forEach(function(f, index){
              if(d.FEDERACAO == f.nome){
                if(f.trimestre == 1){
                  if((d.MES == 1)||(d.MES == 2)||(d.MES == 3)){
                    f.faturamento += d.FATURAMENTO;
                    f.n_projetos += 1;
                    if(d.ACAO_COMPARTILHADA == 'Sim') f.n_projetosConectados += 1;
                  }
                }
                else if(f.trimestre == 2){
                  if((d.MES == 4)||(d.MES == 5)||(d.MES == 6)){
                    f.faturamento += d.FATURAMENTO;
                    f.n_projetos += 1;
                    if(d.ACAO_COMPARTILHADA == 'Sim') f.n_projetosConectados += 1;
                  }
                }
                else if(f.trimestre == 3){
                  if((d.MES == 7)||(d.MES == 8)||(d.MES == 9)){
                    f.faturamento += d.FATURAMENTO;
                    f.n_projetos += 1;
                    if(d.ACAO_COMPARTILHADA == 'Sim') f.n_projetosConectados += 1;
                  }
                }
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

  async montarConjuntoEjs(ej){
    return new Promise((resolve, reject) => {
      d3.csv("csv/annual_metrics.csv", function(error, data) {
        d3.csv("csv/monthly_updates_agosto.csv", function(error, data1){

          var nome, cluster;
          data.forEach(function(d){

            if(d.CLUSTER == 'S/N') {
              cluster = 1;
              //console.log("Id: " + d.ID + " cluster: " + cluster);
            }
            else {
              d.CLUSTER = +d.CLUSTER;
              cluster = d.CLUSTER;
            }

            //console.log(nome);

            d.ID = +d.ID;
            //if(d.ID == 7) console.log(cluster);
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
              cluster: cluster,
              faturamentoMeta: d.FATURAMENTO,
              faturamentoReal: tmp,
              membrosProjetosMeta: d.PORCENTAGEM_MEMBROS,
              membrosProjetosRealMeta: 0,
              n_projetosMeta: d.N_PROJETOS,
              acoesCompartilhadasMeta: d.ACOES_COMPARTILHADAS,
              partcEventosMeta: d.PARTICIPACAO,
              partcEventosRealMeta: 0,
              npsMeta: d.NPS,
              projetoImpactoMeta: d.PROJETOS_IMPACTO,
              ac: 0,
              tempoProjMedio: 1,
              faturamentoAtual: 0,
              n_projetosAtual: 0,
              n_membrosProjeto: 0,
              npsAtual: 0,
              n_membros: 0,
              indice_2020: 0,
              faturamento_membro: 0
            }); //fim do push
          });// fim da leitura das metas
          
          data1.forEach(function(d){
            ej.forEach(function(e, index){
              var qntMembros;
              d.ID = +d.ID;

              //verifica se é a mesma ej
              if(d.ID == e.ID){
                qntMembros = 0;

                //Armazenando nº de membros
                if(e.n_membros == 0){
                  //if(e.ID == 28) console.log(d.MEMBROS);
                  d.MEMBROS = +d.MEMBROS;
                  e.n_membros = d.MEMBROS;
                }
                
                //qnt de membros que precisam ir em eventos
                qntMembros = (+d.MEMBROS * e.partcEventosMeta)/100;
                e.partcEventosRealMeta = qntMembros;

                //qnt de membros que precisam fazer projetos
                qntMembros = (+d.MEMBROS * e.membrosProjetosMeta)/100;
                e.membrosProjetosRealMeta = qntMembros;

                //caso onde o cluster é NaN
                if(e.cluster == 1){
                  if((d.CLUSTER_2019 == "N/A") || (d.CLUSTER_2019 == NaN)){
                    e.cluster = 1;
                  }  
                  else{ //caso de um cluster válido
                    d.CLUSTER_2019 = +d.CLUSTER_2019;
                    e.cluster = d.CLUSTER_2019;
                  }   
                }

                //0 para ej nãoAC e 1 para ej AC
                if(d.AC == "Não") e.ac = 0;
                else e.ac = 1;

                if(e.tempoProjMedio == 1){
                  d.TEMPO_MEDIO_DIAS = +d.TEMPO_MEDIO_DIAS;
                  e.tempoProjMedio = d.TEMPO_MEDIO_DIAS;
                }

                d.FATURAMENTO = +d.FATURAMENTO;
                e.faturamentoAtual += d.FATURAMENTO;

                e.faturamento_membro = e.faturamentoAtual/e.n_membros;

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
                if(indice == 0) e.indice_2020 = 1;
                else if(indice > 4943241) e.indice_2020 = 5;
                else if((indice > 1480970)&&(indice < 4943241)) e.indice_2020 = 4;
                else if((indice > 544805)&&(indice < 1480970)) e.indice_2020 = 3;
                else if((indice > 118523)&&(indice < 544805)) e.indice_2020 = 2;
                else e.indice_2020 = 1;

                // if(indice > 4943241) e.indice_2020 = 4943242;
                // else e.indice_2020 =  indice;

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

  async montarConjuntoEjsCluster(ej, clusterNumber){
    return new Promise(async (resolve, reject) => {

      let ejs = await this.montarConjuntoEjs(ej);
      let ejsFiltradas = [];

      ejs.forEach(function(d, index){
        if(d.cluster == clusterNumber) //  verifica se o cluster da iteracao eh o mesmo do desejado
          ejsFiltradas.push(d) //guarda a ej na auxiliar
      })

      resolve(ejsFiltradas); //retorna a auxiliar
    });
  }

  async adicionarNumeroMembrosFederacao(ej, fed){
    return new Promise(async(resolve,reject) => {
      let ejs = await this.montarConjuntoEjs(ej);
      let federacao = await this.montarConjuntoFederacao(fed);

      ejs.forEach(function(d){
        federacao.forEach(function(f){
          //console.log(d.federacao);  
          if(d.federacao == f.nome){
            f.n_pessoas += d.n_membros;
          }
        });
      });
      resolve(federacao);
    });
  }

}