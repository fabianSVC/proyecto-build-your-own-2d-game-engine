"use strict";
var gSquareVertexBuffer = null;
// gGL referencia a las posiciones de los vertices del cuadrado.

/**
 * Funcion que crea y carga vertices en la GPU
 */
function initSquareBuffer() {
    //Deifine los vertices de un cuadrado
    var verticesOfSquare = [
        //Vertices (x,y,z)
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    // Paso A: Crear un búfer en el contexto gGL para nuestras posiciones de los vértices
    gSquareVertexBuffer = gGL.createBuffer();

    // Paso B: Activar el VertexBuffer
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);

    // Paso C: Carga verticesOfSquare en el vertexBuffer
    gGL.bufferData(gGL.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gGL.STATIC_DRAW);
}