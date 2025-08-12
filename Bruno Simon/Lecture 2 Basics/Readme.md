THREE.js is a 3d javascript library that enables developers to create 3d experience for the web.
It works with webGL, but you can make it worth using SVG and CSS.

What is webGL ?
    -javascript API
    -Renders triangles at remarkable speed
    -Result can be drawn in a <canvas>
    -compatible with most modern browsers
    -uses the Graphic Processing Unit(GPU)

The cPU can do calculations very very fast but one by one
The GPU is little slower but can do thousands of parallel calculations

To draw a  3d model, the idea is to draw many triangles at the right position and colorize them so that they look the way we want
The GPU will position all those points at once according to many factors.

Once the points are placed, the GPU will draw eash visible pixel of those triangles.
Again, those thousands of pixels will be calculatedand drawn in parallel extremely fast.
The instructions to place the points and draw the pixels are written in shaders.
We provide a bunch of information of those shaders like the points positions, model transformations, camera coordinates and things get positions and colorize the way we want.
This is why the webGL is so hard.
Drawing a single triangle on a canvas would take atleast 100 lines of code. 

Native webGL benefits from existing at a low level which enables optimizations and more control

THREE js comes to rescue

THREE JS
    - javascript library
    -Creator : Ricard Cabello aka Mr.Doob

THREE.js will drastically simplify this process of all of this.
We can still interact with WebGL and we can create our own shader and provide our own information.

Three.js is the most powerful WebGL library, it's very stable, it provides many features, the documentation is remarkable, the community is working hard on updates, and it's still close enough to native WebGL.
But there are many other libraries.

Be curious and trynthem out.