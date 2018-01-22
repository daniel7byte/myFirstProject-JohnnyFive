// Se añaden las librerias
var five = require("johnny-five");
var keypress = require("keypress");

// Empieza la magia
var board = new five.Board();

board.on("ready", function() {
  // Indicador
  console.log("Placa lista.");

  // Declaramos los puertos
  var ledAmarillo = new five.Led(11);
  var ledRojo = new five.Led(8);

  // Strobe on-off in 500ms phases
  var strobe = 500;
  var incrementador = 50;

  // Make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);

  process.stdin.on("keypress", function(ch, key){

    // Si presionamos la tecla de direccion arriba
    if (key.name === "up") {
      ledAmarillo.fadeIn();
      // Muestra el texto adelante en la consola
      console.log("\nEncendido");
    }

    // Si presionamos la tecla de direccion bajo
    if (key.name === "down") {
      ledAmarillo.fadeOut();
      // Muestra en la consola el texto
      console.log("\nApagado");
    }

    // Si presionamos la tecla de direccion derecha
    if (key.name === "right") {
      ledAmarillo.strobe(strobe);
      // Muestra en la consola el texto
      console.log("\nStrobe: " + strobe + "ms");
      // Incrementa el valor
      strobe = strobe + incrementador;
    }

    // Si presionamos la tecla de direccion izquierda
    if (key.name === "left") {
      ledAmarillo.strobe(strobe);
      // Muestra en la consola el texto
      console.log("\nStrobe: " + strobe + "ms");
      // Incrementa el valor
      strobe = strobe - incrementador;
    }

    // Si presionamos la tecla x
    if (key.name === "x") {
      ledRojo.toggle();
      // Muestra en la consola el texto
      console.log("\nSwitch on/off");
    }

    // Motor
    if (key.name === "z") {
      // Create a new `motor` hardware instance.
      motor = new five.Motor({
        pin: 5
      });

      // Inject the `motor` hardware into
      // the Repl instance's context;
      // allows direct command line access
      board.repl.inject({
        motor: motor
      });

      // Motor Event API

      // "start" events fire when the motor is started.
      motor.on("start", function() {
        console.log("start", Date.now());

        // Demonstrate motor stop in 2 seconds
        board.wait(2000, function() {
          motor.stop();
        });
      });

      // "stop" events fire when the motor is stopped.
      motor.on("stop", function() {
        console.log("stop", Date.now());
      });

      // Motor API

      // start([speed)
      // Start the motor. `isOn` property set to |true|
      // Takes an optional parameter `speed` [0-255]
      // to define the motor speed if a PWM Pin is
      // used to connect the motor.
      motor.start();

      // stop()
      // Stop the motor. `isOn` property set to |false|
    }

  });

});

console.log("\nEsperando a que inicialice el dispositivo...");
