# 3D Text in Three.js

We are going to use the `TextBufferGeometry` class, but we need a particular font format called **typeface**.  
If you're using a typeface you've downloaded, then you must have the right to use it.

Three.js also provides fonts you can use:  
Go to the `/node_modules/three/examples/fonts` folder.  
You can copy those fonts to your `/static` folder or import them directly.

---

## Bounding for Efficiency

To improve the efficiency of our site, we use **bounding**.  
In the 3D world, bounding means covering the whole object inside a simple invisible box or sphere.

### Frustum Culling

**Frustum culling** means rendering only the objects inside the view area.  
This improves efficiency.

> **Simple language:**  
> Frustum culling = Ignore the objects outside the frustum (view area).

---

## Types of Bounding

In bounding, there are two types:
- **Box bounding**
- **Sphere bounding**

By default, Three.js uses **sphere bounding**.

```js
textGeometry.computeBoundingBox()
console.log(textGeometry.boundingBox)
```

The result is an instance of a `Box3` with `min` and `max` properties.  
The `min` property isn't at 0 because of `bevelThickness` and `bevelSize`.

---

## Centering the Text

**First way:**  
```js
textGeometry.computeBoundingBox()
textGeometry.translate(
    - textGeometry.boundingBox.max.x * 0.5,
    - textGeometry.boundingBox.max.y * 0.5,
    - textGeometry.boundingBox.max.z * 0.5
)
```

This centers the text geometry.

**Another (simpler) way:**  
```js
textGeometry.center()
```