# Animating in Three.js

One renderer is cool, but animation is better!  
Animating in Three.js is like doing stop motion:

1. Move the object
2. Take a picture
3. Move the object a bit more
4. Take a picture
5. Repeat...

Most screens run at **60 frames per second (FPS)**, but not always.  
Your animation must look the same regardless of the framerate.

---

## Rendering on Each Frame

We need to update objects and render on each frame.  
This is done using a function called with [`window.requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame):

```js
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

- The `animate` function is called on each frame.
- The scene is rendered with the camera every frame.

> **Note:** Higher framerate means faster animation.  
> We need to fix this so animation speed is consistent.

---

## Making Animation Framerate-Independent

To solve this, calculate how much time has passed since the last frame:

```js
let time = Date.now();

function animate() {
  requestAnimationFrame(animate);

  let currentTime = Date.now();
  let deltaTime = currentTime - time;
  time = currentTime;
  console.log(deltaTime);
}
animate();
```

- `deltaTime` is the time difference between frames.
- On faster devices, `deltaTime` will be smaller.

---

## Using Three.js Clock

Three.js provides an inbuilt solution: [`THREE.Clock`](https://threejs.org/docs/#api/en/core/Clock).

```js
let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x = clock.getElapsedTime();
  renderer.render(scene, camera);
}
animate();
```

### Circular Motion Example

Move the cube in a circular path:

```js
let time = clock.getElapsedTime();
cube.position.x = Math.sin(time);
cube.position.y = Math.cos(time);
```

---

## Advanced Animations with GSAP

For more control (tweens, timelines, etc.), use [GSAP](https://greensock.com/gsap/):

```js
gsap.to(cube.position, {
  x: 2,
  duration: 1,
  delay: 1
});
```

Render the scene on each frame:

```js
let click = () => {
  window.requestAnimationFrame(click);
  renderer.render(scene, camera);
};
click();
```

---

## Summary

- Use `requestAnimationFrame` for smooth updates.
- Make animations framerate-independent using time calculations or `THREE.Clock`.
- For complex animations, consider GSAP.

---

> **Happy Animating with Three.js!**