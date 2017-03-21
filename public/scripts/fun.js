
// funciones para el select


/*
  function siguiente(){
  	$('#myModal').modal('hide');
  	$('#myModal2').modal('show');
  }
*/

$( "#addform" ).submit(function( event ) {


    var nombre = document.getElementById("nombre").value;
    var tipo = document.getElementById("tipo").value;
    var start = Number(document.getElementById("start").value);
    var end = Number(document.getElementById("end").value);
    var tran1 = document.getElementById("tran1").value;
    var tran2 = document.getElementById("tran2").value;

    var ejemplo = {
       "start":start,
       "end":end,
       "widget_id": tipo,
       "transition_in": tran1,
       "transition_out": tran2,
       "content": nombre
     };

     var data = items.get({
      type: {
        start: 'ISODate',
        end: 'ISODate'
      }
    });


     data.push(ejemplo);

     items.clear();
     items.add(data);
     timeline.fit();


     $('#myModal').modal('hide');

});

