function SimpleShader(vertexShaderID, fragmentShaderID) {

    this.mCompiledShader = null;
    // referencia al sombreador compilado en el contexto webgl

    this.mShaderVertexPositionAttribute = null;
    // referencia a SquareVertexPosition en el sombreador

    var gl = gEngine.Core.getGL();

    // Paso A: cargar y compilar sombreadores de vértices y fragmentos
    var vertexShader = this._loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
    var fragmentShader = this._loadAndCompileShader(fragmentShaderID,
        gl.FRAGMENT_SHADER);

    // Paso B: Crea y vincula los sombreadores a un programa.
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);

    // Paso C: buscar error
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

// Acceso al sombreador compilado
SimpleShader.prototype.getShader = function () { return this.mCompiledShader; };

// Activa el sombreador para renderizar
SimpleShader.prototype.activateShader = function () {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,              // cada elemento es un 3-float (x, y.z)
        gl.FLOAT,       // el tipo de datos es FLOAT
        false,          // si el contenido son vectores normalizados
        0,              // número de bytes para saltar entre elementos
        0);             // compensaciones al primer elemento
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
};

// Devuelve un sombreador compilado de un sombreador en el dom.
// El id es el id del script en la etiqueta html.
SimpleShader.prototype._loadAndCompileShader = function (id, shaderType) {
    var shaderText, shaderSource, compiledShader;
    var gl = gEngine.Core.getGL();

    // Paso A: Obtén la fuente del sombreador de index.html
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;

    // Paso B: Crea el sombreador basado en el tipo de sombreador: vértice o fragmento
    compiledShader = gl.createShader(shaderType);

    // Paso C: compila el sombreador creado
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    // Paso D: verificar errores y devolver resultados (nulo si hay error)
     // La información de registro es cómo se muestran normalmente los errores de compilación del sombreador.
     // Esto es útil para depurar los sombreadores.
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " +
            gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
};