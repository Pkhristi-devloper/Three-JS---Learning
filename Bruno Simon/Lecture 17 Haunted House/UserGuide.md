# Haunted House - Three.js Project

This README documents the steps performed in `main.js` for the Haunted House project using Three.js. Each step includes a brief description and example code.

---

## 1. Initialize Scene

Create a new Three.js scene.

```js
const scene = new THREE.Scene();
```

---

## 2. Create Camera

Set up a Perspective Camera to view the scene.

```js
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(4, 2, 8);
scene.add(camera);
```

---

## 3. Add Renderer

Create a WebGL renderer and attach it to the DOM.

```js
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

---

## 4. Create Ground Plane

Add a plane to represent the ground and rotate it.

```js
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);
```

---

## 5. Build Haunted House

Create the house walls, roof, and door.
here the wall is a little below the plane, so tat for making it upside the plane, we will simply make it half of it's height in y axes
here the height is 2.5 so we will move the walls in y direction of 2.5/2 = 1.25 units
similarly roof geometry will also be moved in y direction
first it will be moved 2.5 as the height of box is 2.5
now it will further moved 0.5 as it has height of 1 unit
so the total movement will be 2.5 + 0.5 = 3

```js
// Walls
const wallsGeometry = new THREE.BoxGeometry(4, 2.5, 4);
const wallsMaterial = new THREE.MeshStandardMaterial({ color: 0xb2b2b2 });
const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
walls.position.y = 1.25;
scene.add(walls);

// Roof
const roofGeometry = new THREE.ConeGeometry(3.5, 1, 4);
const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b3e2f });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 3;
roof.rotation.y = Math.PI / 4;
scene.add(roof);
```

---

## Add Door

Here we will create a simple plane
we will position it from y to 1 unit, as the total height is 2.2, if we move it 1.1 then it would be slight upper of the walls
or we can say it would be a little upside of the surface, so we have moved it only 1
and the walls have width of 4 unit
so to make it outside the walls, i have positioned it 2 units on the z axes
but we know the concept of z-fighting
just beacause of overlapping, we will move the door slightly outside the wall (here 0.001 unit)

    ```js
        const door = new THREE.Mesh(
        new THREE.PlaneGeometry(2.2,2.2),
        new THREE.MeshStandardMaterial({color:"red"})
        )
        door.position.y = 1;
        door.position.z = 2 + 0.001
        house.add(door)
    ```

## Add bushes

- to add the bushes we have created one common materail and common geometry which will be used in all bushes
- we have differenciated their values or differenciated the scale by using scale method as below.

```js
const bushMaterial = new THREE.MeshStandardMaterial();
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
house.add(bush1);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
house.add(bush2);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
house.add(bush3);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
house.add(bush4);
```

- now we can see that we have added 4 bushes in 4 times,but we can also add all the bushes in same line like below

## Graves

- here we have created one group of graves and inside that group, I've added all the graves.
- means here i have created 30 graves.
- for positioning them , i have used random value around 2 \* PI
- after that to position them, by using trigonometry, i got two values using cos and sin value
- and set the x and z values according to that
- so it will take some different positions on the plane
- but still all of those were of same height, so we bring some of them upward and some of them as it is by positioning them in y direction
- here the height of the grave is 0.8 that's why we have positioned them like 0.4 ( half of the height)
- then the radius will be between 3 and 7
- because there is a house in the radius 3 and outside the 7, there is nothing
- to generate this value we have used the below line
  (const radius = 3 + Math.random() \* 4)

```js
const graves = new THREE.Group();
scene.add(graves);

const graveMaterial = new THREE.MeshStandardMaterial();
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);

// use for loop to add 30 random graves
for (let i = 0; i < 29; i++) {
  let random = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const x = Math.cos(random) * radius;
  const z = Math.sin(random) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;
  graves.add(grave);
}
```

## Textures

- Setting up textures is a long process
  - Find a good place with nice textures
  - Make sure you area allowed to use them
  - Download and optimize them
  - Apply them to the object with a different approach depending on how different textures are mapped

---

- We are going to use the textures from Polyheaven
  - Realistic
  - Easy to download
  - You can change what's being downloaded
  - Free and under CC0 license(you can do whatever you want with them)

---

- When we are downloading the textures from poly heaven, we will see these kind of options while downloads
  1. AO (Ambient Occlusion) : Prevents the ambient light being applied to crevices
  2. Diffuse : The actual color
  3. Displacement : Will move the vertices up and down to create elevations
  4. Normal : will fake the orientation to create details. DX and GL are different ways of orienting the normals and we need to go for GL
  5. Rough : How smooth our rough the material is
  6. Bump : Like the normal map, but it's grayscale value (we don't need it)
  7. Metal : Defines the metallic parts(we need this one if available)
  8. AO/Rough/Metal will combine those three maps into one by saving them in the different channels(red, green, blue) which is perfect in our case since having fewer textures is good for performance

## map and all

- when we use map and try to map this texture like this, then it is becoming a little bluryy.
- ```js
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
      alphaMap: floorAlphaTexture,
      transparent: true,
      map: floorColorTexture,
    })
  );
  ```
- to solve this we will simply first make the texture repeation and will repeat it for more times.
- to increase the repeation, we will use the following lines
- ```js
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
      alphaMap: floorAlphaTexture,
      transparent: true,
      map: floorColorTexture,
    })
  );
  ```

````
- after repeatation, we also have to change the property of wrapT and wrapS.

```js
  floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

````

- Now after solving this, we can see that the image is a little more clear then before
- now the color is too much light
- so to make the color more realistic, we will use sRGB property

  ```js
  floorColorTexture.colorSpace = THREE.SRGBColorSpace;
  ```

````

## Door Texture

- After creating all of the above, we will create the door texture as the same way
- Then we will put some,
```js
  displacementBias: -0.05,
    displacementScale: 0.15,
````

- this will help us to make the door realistic

## Lights

- Set the light color different from the white
- then you can do this changes in the code

```js
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);
```

## Ghosts
- After adding all the textures and lights, we will add some ghosts.
- Off course, we are not going to ad the advance levle ghosts, but will add some lights which will move like ghosts.
- For this, we will write the below code.
```js
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);
```

## Animate the Ghosts
- To animate the ghost, we want animation on each frame, so we will simply create animation inside animate function which will be called on each frames
- first we will get elapsed time and on the basis of that we will create a circular way on which it will run.
- if we want to move the ghost in up and downside also then we will have to get one unfiltered or uncertain way.
- now if we multipy the two more sin values, then the answer will be a less accurate and also be in between -1 to 1.
- so the final animate function will look like this.
- ```js
  function animate() {
    timer.update();
    const elapsed = timer.getElapsed();
    const ghost1Angle = elapsed * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y =
      Math.sin(ghost1Angle) *
      Math.sin(ghost1Angle * 2.34) *
      Math.sin(ghost1Angle * 3.45);

      const ghost2Angle = -elapsed * 0.38;
      ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y =
      Math.sin(ghost2Angle) *
      Math.sin(ghost2Angle * 2.34) *
      Math.sin(ghost2Angle * 3.45);

      const ghost3Angle = elapsed * 0.23
      ghost3.position.x = Math.cos(ghost3Angle) * 6;
    ghost3.position.z = Math.sin(ghost3Angle) * 6;
    ghost3.position.y =
      Math.sin(ghost3Angle) *
      Math.sin(ghost3Angle * 2.34) *
      Math.sin(ghost3Angle * 3.45);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
```
## Shadow part
- We will create this part after the renderer section
```js
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
```
- after that add the shadow to roof, walls also
```js
walls.castShadow = true
walls.receiveShadow= true
roof.castShadow= true
plane.receiveShadow= true;
```
- we will also add the shadow into the graves like this
```js

```
## Sky
- we are almost done, just add sky and fog
- we have inbuilt sky in three.js so we will import Sky an will use that like this
```js
import { OrbitControls, Sky } from "three/examples/jsm/Addons.js";
const sky = new Sky()
scene.add(sky)
```

- But we won't be able to see the scene.
- for that we have to change some of the properties of sky
- to tweak the parameters of the sky, we need to update some uniforms on the material of sky(don't forget value)
```js
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);
```
- after doing this we will simply increase the scale of the sky by 100 times

## Fog
- now the last part is sky
- we have 2 types of fog in three js. Fog and FogExp2
- The difference between two is how the desity is calculated
---
```js
  scene.fog = new THREE.Fog("#ff0000",1,13)
```
- Here in this we are passing three parameters.
- First parameter is color
- Second parameter is near and the third is far value.
    - Color : Color of the fogg
    - near : How far away from the camera does the fogg start
    - far : How far away from the camera will the fog be fully opaque
- These Fog is used when we want the full control over fog.
---
- The second way is FogExp2.
```js
scene.fog = new THREE.FogExp2("red",0.1)
```
-These takes two parameters. color and density
- The further away from the camera, the higher density will be
    - color : color of the fog
    - density : How fast will the fog become opaque
- More realistic approach

---

- For chhosing the color, we will select the color which is same as the background color
- For that we can use the color picker and pick the color from the bottom of the sky

## Texture Optimization
- These textures are too big and heavy which is bad for loading but also for the GPU
- They take up more memory, but also generate a small freeze when they are being uploaded to the GPU
- We are not only going to resize the textures, but also compress them
- currently we have jpg, which is already a good start, but there is even better format called WEBP.
  - Supported by most all browsers
  - Lossy compression
  - Loseless compression
  - Supports transparency
- You might not want to apply a lossy compression for textures that are being used as data, like the normal map
- In the case of such a grungy scene, you can do it safely, even for the normal map
- There are plenty of tools :
  - Squoosh , CloudConvert, TinyPNG

  ## Completion

  I have successfully completed the Haunted House project using Three.js. All features, including textures, lighting, shadows, ghosts, sky, and fog, have been implemented as described above. The final scene looks realistic and interactive, demonstrating a solid understanding of Three.js fundamentals and advanced techniques.

  Feel free to explore the code and experiment with different parameters to further enhance the haunted house experience!