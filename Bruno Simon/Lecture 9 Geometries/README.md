# Geometries in Three.js

We have already used the **Geometry**.  
But what exactly is geometry?

- It is composed of **vertices** (point coordinates in 3D space) and **faces** (triangles that join those vertices to create a surface).
- Can be used for **meshes** but also for **particles**.
- Can store more data than just position (UV coordinates, normals, colors, or anything we want).

---

## Geometries

All the following geometries inherit from `BufferGeometry`.  
This class has many built-in methods:  
`translate(...)`, `rotateX(...)`, `normalize()`, etc.

There are many geometries, such as:

| Geometry Type         | Geometry Type         |
|---------------------- |----------------------|
| BoxGeometry           | PlaneGeometry        |
| CircleGeometry        | ConeGeometry         |
| RingGeometry          | CylinderGeometry     |
| TorusGeometry         | TorusKnotGeometry    |
| OctahedronGeometry    | DodecahedronGeometry |
| TetrahedronGeometry   | IcosagedronGeometry  |
| SphereGeometry        | ShapeGeometry        |
| TubeGeometry          | ExtrudeGeometry      |
| LatheGeometry         | TextGeometry         |

We do **not** need to memorize all of them.  
You can always refer to the documentation for details.

By combining these, we can create pretty complex shapes.

---

## Box Example – Understanding the Parameters

1. **width**: The size on the X axis  
2. **height**: The size on the Y axis  
3. **depth**: The size on the Z axis  
4. **widthSegments**: How many subdivisions in the X axis  
5. **heightSegments**: How many subdivisions in the Y axis  
6. **depthSegments**: How many subdivisions in the Z axis  

**Subdivisions** (or segments) correspond to how many triangles should compose a face:

- `1` = 2 triangles per face
- `2` = 8 triangles per face

The problem is that we cannot see those triangles.  
If you want to see them, simply add `wireframe: true` to the material.

---

## Buffer Geometry

Before creating geometry, we must understand how to store buffer geometry data.  
We are going to use `Float32Array`:

- Typed Array
- Can only store floats
- Fixed length
- Easier to handle for the computer

There are two ways to fill and create the `Float32Array`:

### First way: Specify the length and then fill the array

```js
// Float32Array
const array = new Float32Array(9);

// first vertex
array[0] = 0;
array[1] = 0;
array[2] = 0;

// second vertex
array[3] = 0;
array[4] = 1;
array[5] = 0;

// third vertex
array[6] = 1;
array[7] = 0;
array[8] = 0;
```

### Another way: Create array directly

```js
const positionArray = new Float32Array([
    0, 0, 0,  // first vertex
    0, 1, 0,  // second vertex
    1, 0, 0   // third vertex
]);
```

It's a one-dimensional array where the first 3 values are the x, y, and z coordinates of the first vertex,  
the next 3 values are the x, y, and z coordinates of the second vertex, and so on.

We can convert `Float32Array` into `BufferAttribute`:

```js
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
```

This means we are creating the buffer attribute with `itemSize = 3`,  
which corresponds to how many values compose one vertex.

We can add this `BufferAttribute` to our `BufferGeometry` with `setAttribute(...)`:

```js
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionAttribute);
```

Here, `"position"` is the name that will be used in the shaders.

---

If we want to create many triangles, we can do it this way:

```js
let count = 5000;
let positionArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 32 * 32; i++) {
    positionArray[i] = (Math.random() - 0.5) * 1;
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionAttribute);
```

---

## Index

Some geometry has faces that share common vertices.  
When creating a `BufferGeometry`, we can specify a bunch of vertices and then the indices to create the faces and re-use vertices multiple times.

We are **not** going to cover this here.

