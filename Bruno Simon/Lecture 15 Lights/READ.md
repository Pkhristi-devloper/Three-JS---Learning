# Three.js Lights - Lecture 15 Notes

## Overview
Lighting is essential in Three.js to create realistic scenes and highlight objects. Different types of lights simulate various real-world lighting effects.

## Types of Lights

### 1. AmbientLight
- Lights up everything in the scene evenly, like a soft glow.
- Does not cast shadows.
- Good for basic overall brightness.
- Syntax:  
    ```js
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    ```

### 2. PointLight
- Shines light in all directions from one spot, like a light bulb.
- Can cast shadows.
- The position matters—closer objects get more light.
- Syntax:  
    ```js
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    ```

### 3. DirectionalLight
- Acts like sunlight, shining in one direction.
- Casts shadows.
- The position sets the direction of the light, not where it starts.
- Syntax:  
    ```js
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    ```

### 4. HemisphereLight
- Simulates outdoor lighting with sky and ground colors.
- Does not cast shadows.
- First is sky color, second is ground color, and the third param is intensity.
- Works like ambient light and comes from everywhere, but the ground and the sky will have different colors as mentioned above.
- Syntax:  
    ```js
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);
    ```

### 5. SpotLight
- Shines a cone of light, like a flashlight or stage spotlight.
- Can cast shadows.
- The angle and position control where the light goes.
- Syntax:  
    ```js
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(15, 40, 35);
    scene.add(spotLight);
    ```

## Shadows
- Only certain lights (Directional, Point, Spot) can cast shadows.
- Enable shadow mapping on renderer and objects:
    ```js
    renderer.shadowMap.enabled = true;
    light.castShadow = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    ```

## Tips
- Combine multiple lights for realistic effects.
- Adjust intensity and color for mood.
- Use helpers (e.g., `THREE.DirectionalLightHelper`) for debugging.

## Resources
- [Three.js Documentation - Lights](https://threejs.org/docs/#api/en/lights/Light)
- [Three.js Fundamentals - Lighting](https://threejs.org/manual/)
