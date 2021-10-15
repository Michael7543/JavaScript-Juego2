var canvas, ctx;
      window.onload = function() {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        document.addEventListener("keydown", keyDownEvent);
        //renderizar X veces por segundo
        var x = 8;
        setInterval(draw, 1000 / x);
      };
      // mundo del juego
      var gridSize = (tileSize = 20); // 20 x 20 = 400
      var nextX = (nextY = 0);
      // serpiente
      var defaultTailSize = 3;
      var tailSize = defaultTailSize;
      var snakeTrail = [];
      var snakeX = (snakeY = 10);
      // comida
      var appleX = (appleY = 15);
      // dibujar
      function draw() {
        // mover la serpiente en la siguiente posición
        snakeX += nextX;
        snakeY += nextY;
        // serpiente sobre el mundo del juego
        if (snakeX < 0) {
          snakeX = gridSize - 1;
        }
        if (snakeX > gridSize - 1) {
          snakeX = 0;
        }
        if (snakeY < 0) {
          snakeY = gridSize - 1;
        }
        if (snakeY > gridSize - 1) {
          snakeY = 0;
        }
        //manzana mordida por serpiente
        if (snakeX == appleX && snakeY == appleY) {
          tailSize++;
          appleX = Math.floor(Math.random() * gridSize);
          appleY = Math.floor(Math.random() * gridSize);
        }
        //fondo de pintura
        ctx.fillStyle = "#1C1D24";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // serpiente de pintura
        // Crear gradiente
      // Crear gradiente
      grd = ctx.createLinearGradient(0.000, 150.000, 300.000, 150.000);
      // Añadir colores
      grd.addColorStop(0.000, 'rgba(247, 149, 51, 1.000)');
     
        ctx.fillStyle = grd;
        for (var i = 0; i < snakeTrail.length; i++) {
          ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
          );
          //la serpiente se muerde la cola
          if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            tailSize = defaultTailSize;
          }
        }
        // manzana para pintar
        ctx.fillStyle = grd;
        ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
        //establecer el rastro de la serpiente
        snakeTrail.push({ x: snakeX, y: snakeY });
        while (snakeTrail.length > tailSize) {
          snakeTrail.shift();
        }
      }
      // entrada
      function keyDownEvent(e) {
        switch (e.keyCode) {
          case 37:
            nextX = -1;
            nextY = 0;
            break;
          case 38:
            nextX = 0;
            nextY = -1;
            break;
          case 39:
            nextX = 1;
            nextY = 0;
            break;
          case 40:
            nextX = 0;
            nextY = 1;
            break;
        }
      }
