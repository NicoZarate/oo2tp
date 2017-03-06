
// funciones para el select
var tipos = traerJsonParaSelect();    

function traerJsonParaSelect(){
       var jsonData = $.ajax({
          url: "./model_widgets.json",
          dataType: "json",
          async: false
          }).responseText;
      var myJson = JSON.parse(jsonData);
      myJson=convertJsonForVis(myJson);
      return eval("("+myJson+")");

 }


 function convertJsonForVis(json){
       var array = [];

       for (var key in json) {
    		jsonInArrangement(key, array);;
		}

        return JSON.stringify(array);
  }


  function jsonInArrangement(key, array){
     var j = {
      "name": key
     };
     array.push(j);

  }