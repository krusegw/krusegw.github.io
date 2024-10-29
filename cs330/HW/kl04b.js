"use strict";

var canvas;
var gl;

var numPositions  = 144;

var positionsU = [];
var positionsI = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [0, 0, 0];

var thetaLoc;

var tParam = 0.5;
var tLoc;
var deltaT = 0.01;
var morph = true;

var flag = false;

var verticesU = [
    vec4(-0.5, -0.50,  0.5, 1.0),
    vec4(-0.5, -0.25,  0.5, 1.0),
    vec4( 0.5, -0.25,  0.5, 1.0),
    vec4( 0.5, -0.50,  0.5, 1.0),
    vec4(-0.5, -0.50, -0.5, 1.0),
    vec4(-0.5, -0.25, -0.5, 1.0),
    vec4( 0.5, -0.25, -0.5, 1.0),
    vec4( 0.5, -0.50, -0.5, 1.0),

    vec4(-0.25, -0.25,  0.5, 1.0),
    vec4(-0.25,  0.00,  0.5, 1.0),
    vec4( 0.25,  0.00,  0.5, 1.0),
    vec4( 0.25, -0.25,  0.5, 1.0),
    vec4(-0.25, -0.25, -0.5, 1.0),
    vec4(-0.25,  0.00, -0.5, 1.0),
    vec4( 0.25,  0.00, -0.5, 1.0),
    vec4( 0.25, -0.25, -0.5, 1.0),

    vec4( 0.25, -0.25,  0.5, 1.0),
    vec4( 0.25,  0.00,  0.5, 1.0),
    vec4( 0.50,  0.00,  0.5, 1.0),
    vec4( 0.50, -0.25,  0.5, 1.0),
    vec4( 0.25, -0.25, -0.5, 1.0),
    vec4( 0.25,  0.00, -0.5, 1.0),
    vec4( 0.50,  0.00, -0.5, 1.0),
    vec4( 0.50, -0.25, -0.5, 1.0),

    vec4(-0.25, -0.25,  0.5, 1.0),
    vec4(-0.25,  0.00,  0.5, 1.0),
    vec4(-0.50,  0.00,  0.5, 1.0),
    vec4(-0.50, -0.25,  0.5, 1.0),
    vec4(-0.25, -0.25, -0.5, 1.0),
    vec4(-0.25,  0.00, -0.5, 1.0),
    vec4(-0.50,  0.00, -0.5, 1.0),
    vec4(-0.50, -0.25, -0.5, 1.0)
];

var verticesI = [
    vec4(-0.5, -0.50,  0.5, 1.0),
    vec4(-0.5, -0.25,  0.5, 1.0),
    vec4( 0.5, -0.25,  0.5, 1.0),
    vec4( 0.5, -0.50,  0.5, 1.0),
    vec4(-0.5, -0.50, -0.5, 1.0),
    vec4(-0.5, -0.25, -0.5, 1.0),
    vec4( 0.5, -0.25, -0.5, 1.0),
    vec4( 0.5, -0.50, -0.5, 1.0),

    vec4(-0.25, -0.25,  0.5, 1.0),
    vec4(-0.25,  0.50,  0.5, 1.0),
    vec4( 0.25,  0.50,  0.5, 1.0),
    vec4( 0.25, -0.25,  0.5, 1.0),
    vec4(-0.25, -0.25, -0.5, 1.0),
    vec4(-0.25,  0.50, -0.5, 1.0),
    vec4( 0.25,  0.50, -0.5, 1.0),
    vec4( 0.25, -0.25, -0.5, 1.0),

    vec4( 0.25,  0.25,  0.5, 1.0),
    vec4( 0.25,  0.50,  0.5, 1.0),
    vec4( 0.50,  0.50,  0.5, 1.0),
    vec4( 0.50,  0.25,  0.5, 1.0),
    vec4( 0.25,  0.25, -0.5, 1.0),
    vec4( 0.25,  0.50, -0.5, 1.0),
    vec4( 0.50,  0.50, -0.5, 1.0),
    vec4( 0.50,  0.25, -0.5, 1.0),

    vec4(-0.25,  0.25,  0.5, 1.0),
    vec4(-0.25,  0.50,  0.5, 1.0),
    vec4(-0.50,  0.50,  0.5, 1.0),
    vec4(-0.50,  0.25,  0.5, 1.0),
    vec4(-0.25,  0.25, -0.5, 1.0),
    vec4(-0.25,  0.50, -0.5, 1.0),
    vec4(-0.50,  0.50, -0.5, 1.0),
    vec4(-0.50,  0.25, -0.5, 1.0)
];

var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0),  // black
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(0.0, 1.0, 1.0, 1.0),  // cyan
    vec4(1.0, 1.0, 1.0, 1.0),  // white

    vec4(0.0, 0.0, 0.0, 1.0),  // black
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(0.0, 1.0, 1.0, 1.0),  // cyan
    vec4(1.0, 1.0, 1.0, 1.0),  // white

    vec4(0.0, 0.0, 0.0, 1.0),  // black
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(0.0, 1.0, 1.0, 1.0),  // cyan
    vec4(1.0, 1.0, 1.0, 1.0),  // white

    vec4(0.0, 0.0, 0.0, 1.0),  // black
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(0.0, 1.0, 1.0, 1.0),  // cyan
    vec4(1.0, 1.0, 1.0, 1.0)   // white
];

init();

function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    colorObj();

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation( program, "aColor" );
    gl.vertexAttribPointer( colorLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( colorLoc );

    var uBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positionsU), gl.STATIC_DRAW);
    var upositionLoc = gl.getAttribLocation(program, "uPosition");
    gl.vertexAttribPointer(upositionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(upositionLoc);
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positionsI), gl.STATIC_DRAW);
    var ipositionLoc = gl.getAttribLocation(program, "iPosition");
    gl.vertexAttribPointer(ipositionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ipositionLoc);

    thetaLoc = gl.getUniformLocation(program, "uTheta");
    tLoc = gl.getUniformLocation( program, "t" );

    //event listeners for buttons

    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };
    document.getElementById("ButtonT").onclick = function(){flag = !flag;};

    // Initialize event handlers
    document.getElementById("Morph").onclick = function () {
        morph = !morph;
    };

    window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch(key) {
          case '1':
            morph = !morph;
            break;

          case '2':
            deltaT /= 2.0;
            break;

          case '3':
            deltaT *= 2.0;
            break;
        }
    };

    render();
}

function colorObj()
{
    var cubeNum=0;
    quad(1, 0, 3, 2,cubeNum);
    quad(2, 3, 7, 6,cubeNum);
    quad(3, 0, 4, 7,cubeNum);
    quad(6, 5, 1, 2,cubeNum);
    quad(4, 5, 6, 7,cubeNum);
    quad(5, 4, 0, 1,cubeNum);

    quad(9, 8, 11, 10,cubeNum);
    quad(10, 11, 15, 14,cubeNum);
    quad(11, 8, 12, 15,cubeNum);
    quad(14, 13, 9, 10,cubeNum);
    quad(12, 13, 14, 15,cubeNum);
    quad(13, 12, 8, 9,cubeNum);

    quad(17, 16, 19, 18,cubeNum);
    quad(18, 19, 23, 22,cubeNum);
    quad(19, 16, 20, 23,cubeNum);
    quad(22, 21, 17, 18,cubeNum);
    quad(20, 21, 22, 23,cubeNum);
    quad(21, 20, 20, 17,cubeNum);

    quad(25, 24, 27, 26,cubeNum);
    quad(26, 27, 31, 30,cubeNum);
    quad(27, 24, 28, 31,cubeNum);
    quad(30, 29, 25, 26,cubeNum);
    quad(28, 29, 30, 31,cubeNum);
    quad(29, 28, 28, 25,cubeNum);

    var cubeNum=1;
    quad(1, 0, 3, 2,cubeNum);
    quad(2, 3, 7, 6,cubeNum);
    quad(3, 0, 4, 7,cubeNum);
    quad(6, 5, 1, 2,cubeNum);
    quad(4, 5, 6, 7,cubeNum);
    quad(5, 4, 0, 1,cubeNum);

    quad(9, 8, 11, 10,cubeNum);
    quad(10, 11, 15, 14,cubeNum);
    quad(11, 8, 12, 15,cubeNum);
    quad(14, 13, 9, 10,cubeNum);
    quad(12, 13, 14, 15,cubeNum);
    quad(13, 12, 8, 9,cubeNum);

    quad(17, 16, 19, 18,cubeNum);
    quad(18, 19, 23, 22,cubeNum);
    quad(19, 16, 20, 23,cubeNum);
    quad(22, 21, 17, 18,cubeNum);
    quad(20, 21, 22, 23,cubeNum);
    quad(21, 20, 20, 17,cubeNum);

    quad(25, 24, 27, 26,cubeNum);
    quad(26, 27, 31, 30,cubeNum);
    quad(27, 24, 28, 31,cubeNum);
    quad(30, 29, 25, 26,cubeNum);
    quad(28, 29, 30, 31,cubeNum);
    quad(29, 28, 28, 25,cubeNum);
}

function quad(a, b, c, d,cubeNum)
{

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex

    var indices = [a, b, c, a, c, d];
    
    if (cubeNum == 0)
    {
      for ( var i = 0; i < indices.length; ++i ) {
        positionsU.push( verticesU[indices[i]] );
        // for solid colored faces use
        colors.push(vertexColors[a]);
      }
    }
    if (cubeNum == 1)
    {
      for ( var i = 0; i < indices.length; ++i ) {
        positionsI.push( verticesI[indices[i]] );
        // for solid colored faces use
        colors.push(vertexColors[a]);
      }
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (morph) tParam += deltaT;
    if (tParam>=1.0 || tParam<= 0.0) deltaT = -deltaT;
    gl.uniform1f(tLoc, tParam);

    if(flag) theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawArrays(gl.TRIANGLES, 0, numPositions);
    requestAnimationFrame(render);
}
