export function formataParaReal(valor){

    var numero = Number(valor).toFixed(2).split('.');
      numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
      return numero.join(',');
   
  }

export function preparaParametrosDeOrgaos(orgaos){
  
  var paramentos = "";
  for(var item in orgaos){
        
    if( item == (orgaos.length-1) ){
      
      paramentos += `orgao=${orgaos[item]}`
    }else{

      paramentos += `orgao=${orgaos[item]}&`
    }
  }
  
  return paramentos;
}  