var eventos = require('events');
var moment = require('moment');

var EmisorEventos = eventos.EventEmitter; 
var ee = new EmisorEventos(); 
//funcion manejadora de eventos que se asocia al evento definido en datos (osea ee.emit)
ee.on('datos', function(fecha){ 
   console.log(fecha); 
}); 

//ee.emit('datos', Date.now());

setInterval(function(){ 
   ee.emit('datos', moment().format()); 
}, 500);
