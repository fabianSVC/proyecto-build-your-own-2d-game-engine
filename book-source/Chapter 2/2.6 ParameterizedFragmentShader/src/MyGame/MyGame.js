"use strict"; 
/**
 * Reciba un ID de lienzo HTML como parámetro y
    contiene un sombreador como variable de instancia.
 */
function MyGame(htmlCanvasID) {
    // El sombreador para dibujar
    this.mShader = null;

    // Paso A: Inicializar el contexto webGL y VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Paso B: Crea, carga y compila los sombreadores
    this.mShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",    // Path to the VertexShader
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the FragmentShader

    // Paso C: ¡Dibuja!
    // Paso C1: Limpiar el lienzo
    gEngine.Core.clearCanvas([0, 0.8, 0, 1]);

    // Paso C2: Activa el sombreador adecuado
    this.mShader.activateShader([0, 0, 1, 1]);

    // Paso C3: Dibuja con la geometría actualmente activada y el sombreador activado
    var gl = gEngine.Core.getGL();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}