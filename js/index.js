var ejs = [];
// d3.csv("csv/teste2.csv", function(data) {
//   for (var i = 0; i < data.length; i++) {
//     ejs.push(data[i]);
//   }
// });

d3.csv("csv/teste2.csv", function(error, data) {
  // Convert strings to numbers.
  data.forEach(function(d) {
    d.FATURAMENTO = +d.FATURAMENTO;
    d.N_PROJETOS = +d.N_PROJETOS;
    //console.log(d.EMPRESA);
    ejs.push(d);
  });
 });