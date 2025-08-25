# Materials in Three.js

Materials are used to put a color on each visible pixel of the geometries.  
The algorithms are written in programs called **shaders**.  
We don't need to write shaders and can use built-in materials.

---

Until now, we have applied only `Mesh.BasicMaterial` to all objects, which applies a uniform color or a texture on our geometry.

---

## 1. Mesh Basic Material

It is one of the most basic materials.

Most material properties can be set in two ways:

```js
const material = new THREE.MeshBasicMaterial({ map: texture });
```

Or:

```js
const material = new THREE.MeshBasicMaterial();
material.map = texture;
```

If we want to use the color property, there are two different methods:

```js
material.color = new THREE.Color("blue");
material.color.set("#ff7070");
```

Both ways set the color property.

We can also add opacity to the material.  
To add opacity, set the `transparent` property to `true`:

```js
material.transparent = true;
material.opacity = 0.5;
```

**Alphamap** - Controls transparency with a texture:

```js
material.transparent = true;
material.alphaMap = doorAlphaTexture;
```

---

## MeshNormalMaterial

The `MeshNormalMaterial` displays a nice purple color that looks like the normal structure we saw in the texture lessons.

Normals can be used for lighting, reflection, refraction, etc.  
`MeshNormalMaterial` shares some common properties with `MeshBasicMaterial` like `wireframe`, `transparent`, `opacity`, and `side`, but there is also a `flatShading` property:

```js
material.flatShading = true;
```

Flat shading will flatten the faces, meaning the normals won't be interpolated between the vertices.  
`MeshNormalMaterial` is usually used to debug normals, but the color looks great so we can also use it for our projects.

---

## MeshMatcapMaterial

`MeshMatcapMaterial` displays a color by using the normals as a reference to pick the right color on a texture that looks like a sphere.

Set the matcap texture with the `matcap` property:

```js
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
```

We get the illusion that the objects are being illuminated.

---

## MeshDepthMaterial

`MeshDepthMaterial` will simply color the geometry in white if it's close to the near and in black if it's close to the far value of the camera.

---

## MeshLambertMaterial

```js
const material = new THREE.MeshLambertMaterial();
```

---

## MeshPhongMaterial

```js
const material = new THREE.MeshPhongMaterial();
material.shininess = 1000;
```

**Specular**  
Used to change the color of reflection:

```js
material.specular = new THREE.Color(0x112811);
```

---

## MeshToonMaterial

A little bit cartoonish material:

```js
const gradientTexture = textureLoader.load(gradientImg);
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const material = new THREE.MeshToonMaterial();
material.map = gradientTexture;
```

---

## MeshStandardMaterial

```js
const material = new THREE.MeshStandardMaterial();
```

Mesh standard material uses **PBR (Physically Based Rendering)** principles.

```js
const material = new THREE.MeshStandardMaterial();
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclutionTexture;
material.alphaMap = doorAlphaTexture;
material.roughnessMap = doorRoughnessTexture;
material.metalnessMap = doorMetallnessTexture;
material.transparent = true;
```

---

## MeshPhysicalMaterial

This is the same as `MeshStandardMaterial` but with support for clear coat effect.

---

## PointsMaterial

We can use `PointsMaterial` with particles.

---

## ShaderMaterial & RawShaderMaterial

Both are used to create our own materials.

---

## Environment Map

**EnvironmentMap** is the image of what is surrounding the scene.  
It can be used for reflection or refraction, but also for general lighting.  
Environment maps are supported by multiple materials, but we are going to use `MeshStandardMaterial`.  
We can also add the background and all using `CubeTextureLoader`:

```js
const cubeTextureLoader = new THREE.CubeTextureLoader();
```
