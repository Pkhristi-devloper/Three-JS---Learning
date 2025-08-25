import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";

const textureLoader = new THREE.TextureLoader()
const simpleShadow = textureLoader.load("textures/simpleShadow.jpg")

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Renderer
let canvas = document.querySelector("#root");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(2, 2, 0);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024 * 2;
directionalLight.shadow.mapSize.height = 1024 * 2;

directionalLight.shadow.camera.near = 2;
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;

// directionalLight.shadow.radius= 30

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLightCameraHelper.visible = false;
scene.add(directionalLightCameraHelper);
scene.add(directionalLight);

// Ambient light for overall scene visibility
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

//spotlight
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

//point light
const pointLight = new THREE.PointLight("white", 10);
pointLight.castShadow = true;
pointLight.position.set(-2, 2, 0);
// scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
// scene.add(pointLightCameraHelper);
//common material
const material = new THREE.MeshStandardMaterial();

// Cube Geometry
const geometry = new THREE.SphereGeometry(0.5, 72, 72);
const sphere = new THREE.Mesh(geometry, material);
sphere.castShadow = true;
scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(7, 6);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, -0.8, -1.6);
plane.rotateX(-1.1416);
plane.receiveShadow = true;
scene.add(plane);

//simple shadow
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5,1.5),
  new THREE.MeshBasicMaterial({
    color:"red",
    transparent:true,
    alphaMap:simpleShadow
  })
)
plane.position.set(0, -0.8, -1.6);
sphereShadow.rotation.x = -1.1416;
sphereShadow.position.y = plane.position.y+0.01
scene.add(sphereShadow)

// GUI
const gui = new dat.GUI();

// Plane controls
{
  gui.add(plane.position, "x").min(-5).max(5).step(0.1).name("Plane X");
  gui.add(plane.position, "y").min(-5).max(5).step(0.1).name("Plane Y");
  gui.add(plane.position, "z").min(-5).max(5).step(0.1).name("Plane Z");
  gui
    .add(plane.rotation, "x")
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.1)
    .name("Plane Rotation X");
  gui
    .add(plane.rotation, "y")
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.1)
    .name("Plane Rotation Y");
  gui
    .add(plane.rotation, "z")
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.1)
    .name("Plane Rotation Z");
  gui
    .add(planeGeometry.parameters, "width")
    .min(1)
    .max(10)
    .step(0.1)
    .name("Plane Width")
    .onChange(() => {
      scene.remove(plane);
      const newGeometry = new THREE.PlaneGeometry(
        planeGeometry.parameters.width,
        planeGeometry.parameters.height
      );
      plane.geometry = newGeometry;
      scene.add(plane);
    });
  gui
    .add(planeGeometry.parameters, "height")
    .min(1)
    .max(10)
    .step(0.1)
    .name("Plane Height")
    .onChange(() => {
      scene.remove(plane);
      const newGeometry = new THREE.PlaneGeometry(
        planeGeometry.parameters.width,
        planeGeometry.parameters.height
      );
      plane.geometry = newGeometry;
      scene.add(plane);
    });
}
//controls
const controls = new OrbitControls(camera, renderer.domElement);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
