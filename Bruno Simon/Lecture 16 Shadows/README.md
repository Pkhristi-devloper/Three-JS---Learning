# 🌟 Three.js Lecture 16: Lights & Shadows

---

## 📝 Basics

- Now that we have lights, we want shadows.
- The dark shadow in the back of the objects are called **core shadows**.
- What we are missing is the **drop shadow**.
- Shadows have always been a challenge for real-time 3D rendering, and developers must find tricks to display realistic shadows at a reasonable framerate.
- Three.js has an inbuilt solution.
- It's not perfect but it's convenient.

---

## ⚙️ How It Works

- When you do one render, Three.js will do a render for each light supporting shadows.
- Those renders will simulate what the light sees as if it was a camera.
- During these light renders, a `MeshDepthMaterial` replaces all the materials.
- The light renders are stored as textures and we call that **shadow maps**.
- They are then used on every material supposed to receive shadows and projected on the geometry.

---

## 🚀 How to Use Shadows

1. **Activate the shadowMap on renderer:**
  ```js
  renderer.shadowMap.enabled = true;
  ```

2. **Decide for each object if it can cast or receive shadows:**
  ```js
  sphere.castShadow = true;
  // after declaring plane
  plane.receiveShadow = true;
  ```

3. **Supported Lights:**
  - `PointLight`
  - `DirectionalLight`
  - `SpotLight`

4. **Shadow Map Size:**
  - Default: `512 x 512`
  - You can improve it, but keep it a power of 2 for mipmapping.
  ```js
  directionalLight.shadow.mapSize.width = 1024 * 2;
  directionalLight.shadow.mapSize.height = 1024 * 2;
  ```

5. **Optimize Camera Near/Far:**
  - Set near and far values as optimized as possible.
  - Use `DirectionalLightHelper` to visualize.
  ```js
  const directionalLightCameraHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera
  );
  ```

6. **Change Near/Far Values:**
  ```js
  directionalLight.shadow.camera.near = 2;
  directionalLight.shadow.camera.far = 6;
  ```

7. **Control Camera Frustum (Directional Light uses OrthographicCamera):**
  ```js
  directionalLight.shadow.camera.top = 2;
  directionalLight.shadow.camera.left = -2;
  directionalLight.shadow.camera.right = 2;
  directionalLight.shadow.camera.bottom = -2;
  ```

  - The smaller the values, the more precise the shadow.
  - If too small, the shadow will be cropped.

8. **Hide Camera Helper:**
  ```js
  directionalLightCameraHelper.visible = false;
  ```

---

## 🌫️ Blur

- Control shadow blur with the `radius` property:
  ```js
  directionalLight.shadow.radius = 30;
  ```
- This technique doesn't use the proximity of the camera with the object; it's a general and cheap blur.

---

## 🧮 Shadow Map Algorithm

- Different algorithms for shadow maps:
  - `THREE.BasicShadowMap`: Very performant, low quality.
  - `THREE.PCFShadowMap`: Less performant, smoother edges (**default**).
  - `THREE.PCFSoftShadowMap`: Less performant, even softer edges.
  - `THREE.VSMShadowMap`: Less performant, more constraints, can have unexpected results.

- Update shadow map type:
  ```js
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  ```

---

## 🔦 SpotLight Shadows

- SpotLight uses a perspective camera.
- Change the `fov` property to adapt the amplitude.

  ```js
  const spotlight = new THREE.SpotLight("white", 0.4, 10, Math.PI * 0.3);
  spotlight.castShadow = true;
  spotlight.position.set(0, 2, 2);
  spotlight.shadow.mapSize.height = 1024;
  spotlight.shadow.mapSize.width = 1024;

  spotlight.shadow.camera.near = 2;
  spotlight.shadow.camera.far = 6;
  spotlight.shadow.camera.fov = 30;
  scene.add(spotlight);

  const spotlightCameraHelper = new THREE.CameraHelper(spotlight.shadow.camera);
  spotlightCameraHelper.visible = false;
  scene.add(spotlightCameraHelper);
  ```

---

## 💡 PointLight Shadows

```js
const pointLight = new THREE.PointLight("white", 10);
pointLight.castShadow = true;
pointLight.position.set(-2, 2, 0);
scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper);
```

- The camera helper seems to be a PerspectiveCamera facing downward.
- Three.js uses a PerspectiveCamera but in all 6 directions and finishes downward.

---

## 🍞 Baking Shadows

- A good alternative to Three.js shadows is **baked shadows**.
- Integrate shadows in textures that you can apply on materials.
- In simple language, create one plane which contains the texture of a shadow and add that plane below the object.
- The problem: you have to modify the position of the plane according to the object.
- This is also known as **static shadow**.
- The alternative is **simple shadow**.
- In simple shadow, load the shadow into structure, but here the shadow image will be different.
- The shadow image will be a circle (white circle) and outside it, you'll see black.
- The white part is called **visible shadow** and the black part is called **invisible shadow**.
- Here we have the image of the shadow (simple shadow), and will use that in our code:

  ![Simple Shadow Example](src/textures/simpleShadow.jpg)

---
