"use strict";

/**
 * Funcion que carga, compila y vincula los sombreadores
    en un programa y para crear una referencia para cargar desde el búfer de vértices de WebGL para dibujar.
 */
function SimpleShader(vertexShaderID, fragmentShaderID) {

    this.mCompiledShader = null;
    // referencia al sombreador compilado en el contexto webgl
    this.mShaderVertexPositionAttribute = null;
    // referencia a SquareVertexPosition en el sombreador

    var gl = gEngine.Core.getGL();

    // Paso A: carga y compila sombreadores de vértices y fragmentos
    var vertexShader = this._loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
    var fragmentShader = this._loadAndCompileShader(fragmentShaderID,
        gl.FRAGMENT_SHADER);

    // Paso B: Crea y vincula los sombreadores a un programa.
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);

    // Paso C: verifique el error
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }

    // Paso D: Obtiene una referencia al atributo aSquareVertexPosition
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader,
        "aSquareVertexPosition");

    // Paso E: Activa el búfer de vértice cargado en Engine.Core_VertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());

    /// Paso F: Describe la característica del atributo de posición del vértice
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,              // cada elemento es un 3-float (x, y.z)
        gl.FLOAT,       // el tipo de datos es FLOAT
        false,          // si el contenido son vectores normalizados
        0,              // número de bytes para saltar entre elementos
        0);             // compensaciones al primer elemento
}
SimpleShader.prototype.getShader = function () { return this.mCompiledShader; };

SimpleShader.prototype.activateShader = function () {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,              // each element is a 3-float (x,y.z)
        gl.FLOAT,       // data type is FLOAT
        false,          // if the content is normalized vectors
        0,              // number of bytes to skip in between elements
        0);             // offsets to the first element
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
};

// Devuelve un sombreador cumplido de un sombreador en el dom.
// El id es el id del script en la etiqueta html. 
SimpleShader.prototype._loadAndCompileShader = function(filePath, shaderType){

    var xmlReq, shaderSource = null, compiledShader = null;
    var gl = gEngine.Core.getGL();

    // Paso A: Solicite el texto de la ubicación del archivo dado.
    xmlReq = new XMLHttpRequest();
    xmlReq.open('GET', filePath, false);
    try {
        xmlReq.send();
    } catch (error) {
        alert("Failed to load shader: " + filePath + " [Hint: you cannot double click index.html to run this project. " +
                "The index.html file must be loaded by a web-server.]");
        return null;
    }
    shaderSource = xmlReq.responseText;

    if (shaderSource === null) {
        alert("WARNING: Loading of:" + filePath + " Failed!");
        return null;
    }


    // Paso B: Crea el sombreador basado en el tipo de sombreador: vértice o fragmento
    compiledShader = gl.createShader(shaderType);

    // Paso C: compila el sombreador creado
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    // Paso D: verifica errores y devuelve resultados (nulo si hay error)
    // La información de registro es cómo se muestran normalmente los errores de compilación del sombreador.
    // Esto es útil para depurar los sombreadores.
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " +
            gl.getShaderInfoLog(compiledShader));
    }



    return compiledShader;
};