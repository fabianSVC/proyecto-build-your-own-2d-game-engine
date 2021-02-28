precision mediump float;   // establece la precisión para el cálculo de punto flotante
uniform vec4 uPixelColor;  // para transformar la posición del vértice
void main(void) {
    gl_FragColor = uPixelColor;
}