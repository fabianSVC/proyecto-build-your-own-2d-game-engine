/**
    VertexShader identifica y carga el vertexshader en memoria
    vec3 tipo una matriz de tres números de punto flotante.
    aSquareVertexPosition contendra los vertices de las posiciones
    del cuadrado.

    gl_Position convierte el vec3 en vec4 para la conversión de escaneo y
    asignar a gl_Position para pasar el vértice al sombreador de fragmentos  pasa la información
    a WebGL.                                           
   **/


attribute vec3 aSquareVertexPosition;  // Expects one vertex position
void main(void) {
    gl_Position = vec4(aSquareVertexPosition, 1.0);
}