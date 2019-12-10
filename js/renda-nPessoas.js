var federacao = [];
var ej = [];
var base = new metodosBase();

async function start(){
  //federacao = await base.getFed();
  await base.adicionarNumeroMembrosFederacao(ej, federacao).then(() => {
    document.getElementById('cssload-loader').style.display = 'none';   //quando obter resposta do await, muda o display da animacao
  });

  

 }

 start();