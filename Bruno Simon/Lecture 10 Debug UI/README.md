# Debug UI in Three.js

Debugging and tweaking are essential for developers, designers, and even clients. A good Debug UI helps you find the perfect color, speed, quantity, and more.

## Why Use Debug UI?

- Easily tweak and debug your scene.
- Find optimal values for colors, speeds, quantities, etc.
- Useful for developers, designers, and clients.

## Options for Debug UI Libraries

You can create your own Debug UI or use a library. Popular choices include:

- **lil-gui**
- control-panel
- controlKit
- Guify
- Oui

In this guide, we'll use **lil-gui**, but you can try others as well.  
To use lil-gui, add it as a dependency (just like you did with gsap).

---

## Elements You Can Add to the Panel

| Element   | Description                                 |
|-----------|---------------------------------------------|
| Range     | Numbers with min and max values             |
| Color     | Colors in various formats                   |
| Text      | Simple text                                 |
| Checkbox  | Booleans (true/false)                       |
| Select    | Choose from a list                          |
| Button    | Trigger functions                           |
| Folder    | Organize your panel with many elements      |

---

## Adding Elements with `gui.add(...)`

- **First parameter:** Object
- **Second parameter:** Property to tweak

```js
gui.add(mesh.position, 'y')
```

### Additional Parameters

- Minimum
- Maximum
- Step (precision)

```js
gui.add(mesh.position, 'y', minimum, maximum, precision)
gui.add(mesh.position, 'y', -10, 10, 0.1)
```

You can also use `.min(...)`, `.max(...)`, and `.step(...)` methods:

```js
gui.add(cube.position, 'x').min(-10).max(10).step(0.01)
```

### Naming the Panel Element

```js
gui
    .add(cube.position, "x")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("Elevation");
```

---

## More Parameters

```js
gui.add(cube, "visible");
gui.add(material, "wireframe");
gui.addColor(material, "color");
```

**Note:** The first parameter must be an object.

---

## Custom Objects

You can create your own object and pass it in:

```js
const parameters = {
    spin: () => {
        gsap.to(cube.rotation, {
            y: cube.rotation.y + 10,
            duration: 1.5,
        });
    },
};
gui.add(parameters, "spin");
```

---

## Hide/Show the Panel

To hide the panel (e.g., for screenshots), use:

```js
window.addEventListener("keydown", (e) => {
    if (e.key == "h") {
        if (gui._hidden) {
            gui.show();
        } else {
            gui.hide();
        }
    }
});
```