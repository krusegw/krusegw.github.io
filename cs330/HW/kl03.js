var canvas;
var gl;

var bufferId;
var bufferIdA;
var bufferIdB;

var triangleA;
var triangleB;

var delay = 100;
var toggleMorph = true;

var deltaT = 0.01;
var tLoc;
var tParam;

init();

function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    //defining shape arrays

    triangleA = [
        vec2(-0.5,-0.6),
        //vec2(0,0.8),
        vec2(0,0.8),
        //vec2(0.6,-0.3),
        vec2(0.6,-0.3),
        //vec2(-0.5,-0.6)
    ];

    triangleB = [
        vec2(-0.2,-0.3),
        //vec2(0.3,0.4),
        vec2(0.3,0.4),
        //vec2(0.8,-0.6),
        vec2(0.8,-0.6),
        //vec2(-0.2,-0.3)
    ];

    out = []

    out=triangleA;

    //  Configure WebGL

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    bufferIdA = gl.createBuffer();
    bufferIdB = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdA);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdB);
    //gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(triangleA));
    //gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(triangleB));

    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, 8*Math.pow(3, 6), gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(out));

    // Associate out shader variables with our data buffer

    var positionLocA = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLocA, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocA);

    var positionLocB = gl.getAttribLocation(program, "bPosition");
    gl.vertexAttribPointer(positionLocB, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocB);


    //from lab 7
    tLoc = gl.getUniformLocation( program, "t" );
    //thetaLoc = gl.getUniformLocation( program, "uTheta" );

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
    gl.uniform1f(tLoc, tParam);

    //use uniform to set and send t
    //from lab 7
    //theta += (rotation ? 0.1 : 0.0);
    //gl.uniform1f(thetaLoc, theta);

    gl.drawArrays( gl.LINE_LOOP, 0, out.length);
    //gl.drawArrays( gl.LINE_LOOP, 0, triangleB.length);

    setTimeout(
        function (){requestAnimationFrame(render);}, delay
    );
}