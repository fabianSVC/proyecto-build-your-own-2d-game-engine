"use strict"; 
var gEngine = gEngine || {};

gEngine.VertexBuffer = (function () {
    // Primero: define los vértices de un cuadrado
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    // referencia a las posiciones de los vértices del cuadrado en el contexto gl
    var mSquareVertexBuffer = null;

    var getGLVertexRef = function () { return mSquareVertexBuffer; };

    var initialize = function () {
        var gl = gEngine.Core.getGL();
        // Paso A: Crea un búfer en el contexto gGL para nuestras posiciones de vértice
        
        mSquareVertexBuffer = gl.createBuffer();
        // Paso B: Activar vertexBuffer
        
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
       // Paso C: carga verticesOfSquare en vertexBuffer
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare),
            gl.STATIC_DRAW);
    };

    var getGLVertexRef = function () { return mSquareVertexBuffer; };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef
    };
    return mPublic;
}());
