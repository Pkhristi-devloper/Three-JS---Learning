We have already used the Geometry
But what is exactly the geometry is?
It is xomposed of vertices(point coordinates in 3d spaces) and faces (triangles that join those vertices to create a surface
)
can be used for meshes but also for particles
can store more data then the position(UV coordinates, normals, colors or anything we want)

Geometries
All the following geometries inherits from BufferGeometry.
This class has many built in methods translate(...), rotateX(...), normalize(),etc.

There are too many geometries like below

BoxGeometry         PlaneGeometry
CircleGeometry      ConeGeometry
RingGeometry        CylinderGeometry
TorusGeometry       TorusKnotGeometry
OctahedronGeometry  DodecahedronGeometry
TetrahedronGeometry IcosagedronGeometry
SphereGeometry      ShapeGeometry
TubeGeometry        ExtrudeGeometry
LatheGeometry       TextGeometry


We need not to memorize all of them, we can also refer the documentation to see about them

By combining those,we can create pretty complex shapes.

Box Example - understand the parameters
    1. width         : The size on the X axis
    2. height        : The size on the Y axis
    3. depthe        : The size on the Z axis
    4. widthSegments : How many subdivisions in the X axis
    5. heightSegments: How many subdivisions in the Y axis
    6. depthSegments : How many subdivisions in the Z axis

Subdivisions (or we can say segments) corresponds to how much triangles should compose a face
    1 = 2 triangles per face
    2 = 8 triangles per face
The problem is that, we can not see those triangles.
If we want to see those triangles then simple add wireframe : true to the material

Buffer Geometry
Before creating geometry, we must need to understand how to store buffer geometry data
We are going to use Float32Array
    -Typed Array
    -Can only store floats
    -Fixed length
    -Easier to handle for the computer
There are two ways to filling and creating the Float32Array

First way is to specify the length and then fill the array
like below:
<!-- first way to create a Float32Array -->
<!-- Float32Array -->
    const array = new Float32Array(9);

    <!-- first vertices -->
    array[0]=0;
    array[1]=0;
    array[2]=0;

    <!-- second vertices -->
    array[3]=0;
    array[4]=1;
    array[5]=0;

    <!-- third vertices -->
    array[6]=1;
    array[7]=0;
    array[8]=0;

<!-- another way to create array -->

    const positionArray = new Float32Array([
        0,0,0,  //first vertice
        0,1,0, //second vertice
        1,0,0  //third vertice
    ])
It's one dimension array where the first 3 values are the x,y and z coordinates of the first vertex
the next 3 values are the x,y and z coordinates of the second vertex... and so on.
We can convert Float32Array into BufferAttribute.

    const positionAttribute = new THREE.BufferAttribute(positionArray,3)
By the above line means we are creating the buffer attribute with the item size = 3, means 3 corresponds to how much values compose one vertex
We can add this BufferAttribute to our BufferGeometry with setAttribute(...) 

    const geometry = new THREE.BufferGeometry;
    geometry.setAttribute("position", positionAttribute)

here position is the name that will be used in the shaders

If we want to create too many triangles then also do in this way

    let count = 5000;
    let positionArray = new Float32Array(count * 3 * 3);
    for (let i = 0; i < count * 32 * 32; i++) {
    positionArray[i] = (Math.random() - 0.5) * 1;
    }
    const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", positionAttribute);

Index
Some geometry has faces that share the common vertices
When creating a BufferGeometry, we can specify a bunch of vertices and then the indices to create the faces and re-use vertices multiple times.
we are not going to cover this here
