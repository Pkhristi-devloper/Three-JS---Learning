# Getting Started with Three.js: Basic Scene

To begin with Three.js, you need **four essential elements**:

1. **Scene**  
    A container for all objects, models, lights, etc.  
    At some point, you ask Three.js to render this scene.

2. **Objects**  
    These can be:
    - Primitive geometries
    - Imported models
    - Particles
    - Lights
    - And more

    > **Tip:** Start with a simple cube!  
    To create a cube, you need a **Mesh**—a combination of geometry (the shape) and material (how it looks).

    **Steps to create a Mesh:**
    1. Create a geometry
    2. Create a material
    3. Combine them into a mesh
    4. Add the mesh to the scene

3. **Camera**  
    - Not visible in the scene
    - Serves as the point of view for rendering
    - You can have multiple cameras and switch between them
    - Different types available; we'll use `PerspectiveCamera`

    **Camera Parameters:**
    - **Field Of View (fov):**  
      Vertical vision angle (in degrees).  
      Determines how much the camera can see.
    - **Aspect Ratio:**  
      Width of render divided by height.  
      If you don't have a render yet, use the window's width and height, or define an object:

      ```js
      const sizes = {
         width: 800,
         height: 600
      };
      // Usage: sizes.width & sizes.height
      ```

4. **Renderer**  
    - Renders the scene from the camera's point of view
    - Draws the result into a **canvas** (an HTML element)
    - Three.js uses **WebGL** to render inside this canvas
    - You can create the canvas yourself, or let Three.js handle it

---

> **Summary:**  
> - Create a scene  
> - Add objects (like a cube mesh)  
> - Set up a camera  
> - Render everything with a renderer

Happy coding with Three.js!