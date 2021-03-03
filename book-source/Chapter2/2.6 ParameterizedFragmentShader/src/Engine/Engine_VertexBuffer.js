"use strict";  

var gEngine = gEngine || {};

// El objeto VertexBuffer
gEngine.VertexBuffer = (function () {
   
    // Primero: define los vértices de un cuadrado
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    // referencia a las posiciones de los vértices para el cuadrado en el contexto gl
    var mSquareVertexBuffer = null;

    var getGLVertexRef = function () { return mSquareVertexBuffer; };

    var initialize = function () {
        var gl = gEngine.Core.getGL();

        // Paso A: crear un búfer en el contexto gGL para nuestras posiciones de vértice
        mSquareVertexBuffer = gl.createBuffer();

        // Paso B: activar vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

        // Paso C: carga verticesOfSquare en el vertexBuffer  
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare),
            gl.STATIC_DRAW);
    };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef
    };
    return mPublic;
}());