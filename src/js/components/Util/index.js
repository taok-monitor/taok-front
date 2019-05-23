export function formataParaReal(valor){

    var numero = Number(valor).toFixed(2).split('.');
      numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
      return numero.join(',');
   
  }