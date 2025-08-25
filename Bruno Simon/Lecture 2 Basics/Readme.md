# THREE.js Basics

THREE.js is a powerful JavaScript library that enables developers to create 3D experiences for the web. It works primarily with WebGL, but you can also use SVG and CSS for rendering.

## What is WebGL?

WebGL is a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser.  
Key features:
- Renders triangles at remarkable speed
- Results are drawn in a `<canvas>`
- Compatible with most modern browsers
- Utilizes the Graphics Processing Unit (GPU)

### CPU vs GPU

- **CPU:** Performs calculations very fast, but processes tasks one by one.
- **GPU:** Slightly slower per calculation, but can handle thousands of parallel calculations.

## Drawing 3D Models

To render a 3D model, the process involves drawing many triangles at the correct positions and coloring them appropriately. The GPU positions all these points simultaneously based on various factors.

Once the points are placed, the GPU draws each visible pixel of those triangles. Thousands of pixels are calculated and rendered in parallel, making the process extremely fast.

The instructions for positioning points and drawing pixels are written in **shaders**. Developers provide information to these shaders, such as point positions, model transformations, and camera coordinates, to achieve the desired appearance.

WebGL can be complex—drawing a single triangle on a canvas might require at least 100 lines of code. However, its low-level nature allows for optimizations and greater control.

## THREE.js to the Rescue

THREE.js is a JavaScript library created by **Ricardo Cabello** (aka Mr.Doob). It drastically simplifies the process of working with WebGL. With THREE.js, you can still interact with WebGL directly, create custom shaders, and provide your own data.

### Why Use THREE.js?

- Most powerful WebGL library
- Very stable and feature-rich
- Excellent documentation
- Active community and frequent updates
- Close enough to native WebGL for advanced use cases

There are many other libraries available for 3D graphics on the web. Be curious and try them out!

---

**Happy coding with THREE.js!**