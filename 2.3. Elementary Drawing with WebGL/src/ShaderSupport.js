"use strict";

var gSimpleShader = null;
    // Guarda la referencia del programa de sombreado 

var gShaderVertexPositionAttribute = null;
    // gGL referencia para ser usado por el VertexShader

// Carga / compila / vincula programas de sombreado al contexto gGL 
function initSimpleShader(vertexShaderID, fragmentShaderID) {
    // Paso A: Carga y compilar sombreadores de vértices y fragmentos 
    var vertexShader = loadAndCompileShader(vertexShaderID, gGL.VERTEX_SHADER);
    var fragmentShader = loadAndCompileShader(fragmentShaderID, gGL.FRAGMENT_SHADER);

    // Paso B: Crea y vincula los sombreadores en el programa.
    gSimpleShader = gGL.createProgram();
    gGL.attachShader(gSimpleShader, vertexShader);
    gGL.attachShader(gSimpleShader, fragmentShader);
    gGL.linkProgram(gSimpleShader);

    // Paso C: Busca por un error.
    if (!gGL.getProgramParameter(gSimpleShader, gGL.LINK_STATUS)) {
        alert("Error linking shader");
    }

    // Paso D: Ubica y almacena la referencia al atributo aSquareVetexPosition definido en su sombreador de vértices. 
    gShaderVertexPositionAttribute = gGL.getAttribLocation(gSimpleShader, "aSquareVertexPosition");
        // SquareVertexPosition: is defined in the VertexShader (in the index.html file)

    // Paso E: Activa el búfer de vértices que cargó en VertexBuffer.js,
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);

    // Paso F: Conecta el búfer activado al atributo aSquareVertexPosition mediante describiendo el formato de datos del búfer de vértice, donde cada posición de vértice es una posición de tres flotantes (x, y, z). 
    gGL.vertexAttribPointer(gShaderVertexPositionAttribute, // variable initialized above
        3,          // each vertex element is a 3-float (x,y,z)
        gGL.FLOAT,  // Tipo de dato es flotante
        false,      // si el contenido son vectores normalizados
        0,          // número de bytes para saltar entre elementos
        0);         // compensaciones al primer elemento
}

// Funcion que carga y compila la funcion una sombra desde index.html 
function loadAndCompileShader(id, shaderType) {
    var shaderText, shaderSource, compiledShader;

    // Paso A: Busca el código fuente del sombreador del archivo index.html. 
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;

    // Paso B: Crea un sombreador específico (ya sea vértice o fragmento) en la GPU. 
    compiledShader = gGL.createShader(shaderType);

    // Paso C: Especifica el código fuente del sombreador y compila el sombreador.
    gGL.shaderSource(compiledShader, shaderSource);
    gGL.compileShader(compiledShader);

    // Paso D: el paso D comprueba y devuelve la referencia al sombreador compilado donde un error dará como resultado un valor nulo
    if (!gGL.getShaderParameter(compiledShader, gGL.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gGL.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
}