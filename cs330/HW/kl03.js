"use strict";
var gl;

var color = vec4(1.0,0.65,0.0,1.0);
var colorA = vec4(1.0,0.65,0.0,1.0);
var colorB = vec4(0.0,0.0,1.0,1.0);
var colorLoc;

var delay = 100;
var toggleMorph = true;

var tParam=0.0;
var tLoc;
var deltaT = 0.01;

init();

function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    //defining shape arrays

    var triangleA = [
        vec2(-0.5,-0.6),
        //vec2(0,0.8),
        vec2(0,0.8),
        //vec2(0.6,-0.3),
        vec2(0.6,-0.3),
        //vec2(-0.5,-0.6)
    ];

    var triangleB = [
        vec2(-0.2,-0.3),
        //vec2(0.3,0.4),
        vec2(0.3,0.4),
        //vec2(0.8,-0.6),
        vec2(0.8,-0.6),
        //vec2(-0.2,-0.3)
    ];

    //  Configure WebGL

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var bufferIdA = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdA);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(triangleA), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var positionLocA = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLocA, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocA);

    // Load the data into the GPU
    var bufferIdB = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdB);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(triangleB), gl.STATIC_DRAW);
    
    // Associate out shader variables with our data buffer
    var positionLocB = gl.getAttribLocation(program, "bPosition");
    gl.vertexAttribPointer(positionLocB, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocB);

    //from lab 7
    tLoc = gl.getUniformLocation( program, "t" );

    colorLoc = gl.getUniformLocation( program, "inColor" );

    // Toggle Button
    var Btn = document.getElementById("toggleBtn");
    Btn.addEventListener("click", toggleMorph);

    // Change morph on or off
    function toggleMorph() {
        if (toggleMorph == false){
            toggleMorph == true;
        } else {
            toggleMorph == false;
        }
    }

    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

    if (toggleMorph) {
        tParam += deltaT;
        if (tParam >= 1.0 || tParam <= 0.0) {
            deltaT = -deltaT;
        }
    }
// just hardcoding the t value
    tParam = 1.0
    gl.uniform1f(tLoc, tParam);

// set the color
    color = mix(colorA,colorB,tParam);
    gl.uniform4fv(colorLoc,color);

    gl.drawArrays( gl.LINE_LOOP, 0, 3);

    setTimeout(
        function (){requestAnimationFrame(render);}, delay
    );
}