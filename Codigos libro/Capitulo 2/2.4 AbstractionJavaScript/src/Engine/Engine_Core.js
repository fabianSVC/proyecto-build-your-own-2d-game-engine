"use strict"; // Operate in Strict mode

 // variable global que representa el núcleo del motor del juego
var gEngine = gEngine || { };


 gEngine.Core = (function() {
    // variable de instancia: el contexto gráfico para dibujar 
    var mGL = null;
   
    // Accesor del contexto webgl
    var getGL = function() { return mGL; };

    // inicializar el WebGL, el búfer de vértices y compilar los sombreadores 
    var initializeWebGL = function(htmlCanvasID) {
    var canvas = document.getElementById(htmlCanvasID);
         
         // Obtenga el webgl estándar o experimental y se vincule al área de Canvas 
         // almacenar los resultados en la variable de instancia mGL
         mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

         if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
         }

      // Inicializamos VertexBuffer
      gEngine.VertexBuffer.initialize();
   };

   // Limpia el área de dibujo y dibuja un cuadrado
   var clearCanvas = function(color) {
      mGL.clearColor(color[0], color[1], color[2], color[3]); // establece el color a borrar
      mGL.clear(mGL.COLOR_BUFFER_BIT); // Claro al color previamente establecido
  };

   // Contiene las funciones y variables a las que se podrá acceder.
  var mPublic = {
        getGL: getGL,
        initializeWebGL: initializeWebGL,
        clearCanvas: clearCanvas
    };
    return mPublic;
   }());