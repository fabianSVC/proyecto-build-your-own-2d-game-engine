"use strict";  

function MyGame(htmlCanvasID) {
    // El sombreador para dibujar
    this.mShader = null;

    // Paso A: Inicializar el contexto webGL y VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Paso B: Crea, carga y compila los sombreadores
    this.mShader = new SimpleShader("VertexShader", "FragmentShader");

    // Paso C: ¡Dibuja!
    // Paso C1: Limpiar el lienzo
    gEngine.Core.clearCanvas([0, 0.7, 0, 1]);

    // Paso C2: Activa el sombreador adecuado
    this.mShader.activateShader();

    // Paso C3: Dibuja con la geometría activada actualmente y el sombreador activado
    var gl = gEngine.Core.getGL();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}