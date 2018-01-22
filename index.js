// Se añaden las librerias
var five = require("johnny-five");
var keypress = require("keypress");

// Empieza la magia
var board = new five.Board();

board.on("ready", function() {

  // Make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);
  console.log("Placa lista.");

  // Declaramos los puertos
  var led = new five.Led(11);

  // Strobe on-off in 500ms phases
  var strobe = 500;

  process.stdin.on("keypress", function(ch, key){

    // Si presionamos la tecla de direccion arriba
    if (key.name === "up") {
      led.fadeIn();
      // Muestra el texto adelante en la consola
      console.log("\nEncendido");
    }

    // Si presionamos la tecla de direccion bajo
    if (key.name === "down") {
      led.fadeOut();
      // Muestra en la consola el texto Atras
      console.log("\nApagado");
    }

    // Si presionamos la tecla de direccion derecha
    if (key.name === "right") {
      led.strobe(strobe);
      // Muestra en la consola el texto Atras
      console.log("\nStrobe: " + strobe + "ms");
      // Incrementa el valor
      strobe = strobe + 10;
    }

    // Si presionamos la tecla de direccion izquierda
    if (key.name === "left") {
      led.strobe(strobe);
      // Muestra en la consola el texto Atras
      console.log("\nStrobe: " + strobe + "ms");
      // Incrementa el valor
      strobe = strobe - 10;
    }

  });

});

console.log("\nEsperando a que inicialice el dispositivo...");
