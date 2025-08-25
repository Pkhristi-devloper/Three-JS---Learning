# Handling Canvas Controls, Resizing, Pixel Ratio, and Full Screen in Three.js

## Removing Canvas Outline

When using controllers in your code, dragging or zooming often results in a blue outline around the canvas.  
To remove this, add the following CSS:

```css
canvas {
    outline: none;
}
```

---

## Responsive Canvas: Handling Window Resize

When you resize the window, the canvas does not automatically adjust its height and width.  
To fix this, add an event listener for the `resize` event:

```js
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
```

---

## Pixel Ratio: Preventing Blurry Renders

Some screens may show blurry renders or stair-step effects on edges.  
This happens on screens with a pixel ratio greater than 1.

- **Pixel Ratio** is the number of physical pixels per software pixel.
- Older screens had a pixel ratio of 1 (1 pixel rendered per pixel).
- Modern screens (like Apple Retina) have ratios of 2, 3, or even higher.

**Examples:**
- Pixel ratio 1: 1 pixel rendered per pixel.
- Pixel ratio 2: 2×2 = 4 pixels rendered per pixel.
- Pixel ratio 3: 3×3 = 9 pixels rendered per pixel.

Higher pixel ratios are often found on weaker devices.

To set the pixel ratio in Three.js:

```js
renderer.setPixelRatio(window.devicePixelRatio);
```

To avoid extremely high pixel ratios (which can hurt performance), use:

```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

This sets the pixel ratio to the minimum of the device's pixel ratio and 2.

---

## Full Screen Mode

To make the canvas go full screen (hiding taskbars and browser chrome), use:

```js
// Full screen and exit full screen
window.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
```

> **Note:**  
> This code works perfectly on most browsers, but not on Safari.
