# Three.js Object Transformations

Three.js provides four main properties to transform objects:

- **position**
- **scale**
- **rotation**
- **quaternion**

All classes inheriting from `Object3D` (like `PerspectiveCamera` or `Mesh`) use these properties, which are compiled into matrices. You can view the inheritance hierarchy at the top of the [Three.js documentation](https://threejs.org/docs/).

---

## Position

The `position` property is a `Vector3` with `x`, `y`, and `z` components.

```js
cube.position.x = 1;
cube.position.y = -0.7;
cube.position.z = -1;

// Or set all at once:
cube.position.set(1, -0.7, -1);
```

### Useful Methods

- **Length of the vector:**
    ```js
    console.log(cube.position.length());
    ```
- **Distance to another vector:**
    ```js
    console.log(cube.position.distanceTo(camera.position));
    ```
- **Normalize the position:**
    ```js
    cube.position.normalize();
    ```

### Axis Helper

Setting positions in 3D can be challenging. Use `AxesHelper` to visualize axes:

```js
const axesHelper = new THREE.AxesHelper();
axesHelper.position.set(1, 1, -3);
scene.add(axesHelper);
```

---

## Scale

The `scale` property is also a `Vector3`. You can adjust the size of the mesh:

```js
cube.scale.x = 2;
cube.scale.y = 1;
cube.scale.z = 0.5;

// Or set all at once:
cube.scale.set(2, 1, 0.5);
```

---

## Rotation

Rotation uses Euler angles (`x`, `y`, `z`), expressed in radians.

```js
cube.rotation.x = Math.PI / 2;
cube.rotation.y = Math.PI / 4;
cube.rotation.z = 0;
```

### Gimbal Lock

Rotating axes in sequence can cause gimbal lock, where one axis stops working as expected. The default rotation order is `x`, `y`, `z`. Change the order if needed:

```js
cube.rotation.reorder("yxz"); // Do this before setting rotation values
```

---

## Quaternion

Quaternions provide a more robust way to represent rotation, avoiding gimbal lock. Most engines and 3D software use quaternions. In Three.js, the quaternion updates automatically when you change the rotation.

---

## lookAt Method

`Object3D` has a `lookAt` method to rotate the object so its `-z` axis faces a target:

```js
camera.lookAt(new THREE.Vector3(1, 2, 1));
```

---

## Grouping Objects

To transform multiple objects together, use a `Group`:

```js
const boxGroup = new THREE.Group();
boxGroup.add(box1);
boxGroup.add(box2);
boxGroup.add(box3);

// Apply transformations to the group:
boxGroup.position.set(0, 1, 0);
scene.add(boxGroup);
```

---

> **Tip:** All transformations (`position`, `scale`, `rotation`, `quaternion`) work similarly for groups and individual objects.

---

**Happy coding with Three.js!**
