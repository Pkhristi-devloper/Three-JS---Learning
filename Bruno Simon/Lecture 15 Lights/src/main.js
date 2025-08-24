import {
  OrbitControls,
  RectAreaLightHelper,
} from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";

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

//material will be common
const material = new THREE.MeshStandardMaterial();

// Cube
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const cube = new THREE.Mesh(cubeGeometry, material);
cube.position.z = -2.2;
scene.add(cube);

//sphere
const sphereGeometry = new THREE.SphereGeometry(0.5, 72, 72);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = -2;
sphere.position.z = -2.2;
scene.add(sphere);

//donut
const donutGeometry = new THREE.TorusGeometry(0.5, 0.2, 32, 32);
const donut = new THREE.Mesh(donutGeometry, material);
donut.position.x = 2;
donut.position.z = -2.2;
scene.add(donut);

//plane
const planeGeometry = new THREE.PlaneGeometry(10, 5);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -0.21;
plane.position.y = -1.26;
plane.position.z = -2.9;
plane.rotation.x = -Math.PI / 3;
scene.add(plane);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
// Lights group
const lightsGroup = new THREE.Group();

// Ambient and Point lights group
const ambientPointGroup = new THREE.Group();

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
ambientPointGroup.add(ambientLight);

const directionLight = new THREE.DirectionalLight("white", 1);
directionLight.position.set(0.5, 1, -10);
scene.add(directionLight);

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(5, 1, -2);
ambientPointGroup.add(pointLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1);
ambientPointGroup.add(hemisphereLight);

const rectAreaLight = new THREE.RectAreaLight("red", 3, 2, 2);
scene.add(rectAreaLight);

const spotlight = new THREE.SpotLight("green", 3, 10, Math.PI * 0.1);
spotlight.position.set(0, 2, 0); // Position above the center
spotlight.target = cube; // Target the cube (center object)
scene.add(spotlight);

// Add ambientPointGroup to lightsGroup
lightsGroup.add(ambientPointGroup);

// Add lights to scene
scene.add(lightsGroup);

// GUI panel
const gui = new GUI();

// Lights folder
const lightsFolder = gui.addFolder("Lights");
const ambientFolder = lightsFolder.addFolder("Ambient Light");
ambientFolder
  .addColor({ color: ambientLight.color.getHex() }, "color")
  .onChange((v) => ambientLight.color.setHex(v));
ambientFolder.add(ambientLight, "intensity", 0, 2, 0.01);

// Spotlight controls in GUI
const spotlightFolder = lightsFolder.addFolder('Spotlight');
spotlightFolder.addColor({ color: spotlight.color.getHex() }, 'color')
  .onChange(v => spotlight.color.setHex(v));
spotlightFolder.add(spotlight, 'intensity', 0, 10, 0.01);
spotlightFolder.add(spotlight.position, 'x', -5, 5, 0.01);
spotlightFolder.add(spotlight.position, 'y', -5, 5, 0.01);
spotlightFolder.add(spotlight.position, 'z', -5, 5, 0.01);
spotlightFolder.add(spotlight, 'angle', 0, Math.PI / 2, 0.01);
spotlightFolder.add(spotlight, 'penumbra', 0, 1, 0.01);

const pointFolder = lightsFolder.addFolder("Point Light");
pointFolder
  .addColor({ color: pointLight.color.getHex() }, "color")
  .onChange((v) => pointLight.color.setHex(v));
pointFolder.add(pointLight, "intensity", 0, 10, 0.01);
pointFolder.add(pointLight.position, "x", -5, 5, 0.01);
pointFolder.add(pointLight.position, "y", -5, 5, 0.01);
pointFolder.add(pointLight.position, "z", -5, 5, 0.01);

const rectAreaFolder = lightsFolder.addFolder("Rect Area Light");
rectAreaFolder
  .addColor({ color: rectAreaLight.color.getHex() }, "color")
  .onChange((v) => rectAreaLight.color.setHex(v));
rectAreaFolder.add(rectAreaLight, "intensity", 0, 10, 0.01);
rectAreaFolder.add(rectAreaLight.position, "x", -10, 10, 0.01);
rectAreaFolder.add(rectAreaLight.position, "y", -10, 10, 0.01);
rectAreaFolder.add(rectAreaLight.position, "z", -10, 10, 0.01);
rectAreaFolder.add(rectAreaLight, "width", 0.1, 10, 0.01);
rectAreaFolder.add(rectAreaLight, "height", 0.1, 10, 0.01);

const hemisphereFolder = lightsFolder.addFolder("Hemisphere Light");
hemisphereFolder
  .addColor({ skyColor: hemisphereLight.color.getHex() }, "skyColor")
  .onChange((v) => hemisphereLight.color.setHex(v));
hemisphereFolder
  .addColor(
    { groundColor: hemisphereLight.groundColor.getHex() },
    "groundColor"
  )
  .onChange((v) => hemisphereLight.groundColor.setHex(v));
hemisphereFolder.add(hemisphereLight, "intensity", 0, 2, 0.01);

// Meshes group
const meshesFolder = gui.addFolder("Meshes");
const cubeFolder = meshesFolder.addFolder("Cube");
cubeFolder.add(cube.position, "x", -5, 5, 0.01);
cubeFolder.add(cube.position, "y", -5, 5, 0.01);
cubeFolder.add(cube.position, "z", -5, 5, 0.01);
cubeFolder.add(cube.scale, "x", 0.1, 3, 0.01).name("scaleX");
cubeFolder.add(cube.scale, "y", 0.1, 3, 0.01).name("scaleY");
cubeFolder.add(cube.scale, "z", 0.1, 3, 0.01).name("scaleZ");

const sphereFolder = meshesFolder.addFolder("Sphere");
sphereFolder.add(sphere.position, "x", -5, 5, 0.01);
sphereFolder.add(sphere.position, "y", -5, 5, 0.01);
sphereFolder.add(sphere.position, "z", -5, 5, 0.01);
sphereFolder.add(sphere.scale, "x", 0.1, 3, 0.01).name("scaleX");
sphereFolder.add(sphere.scale, "y", 0.1, 3, 0.01).name("scaleY");
sphereFolder.add(sphere.scale, "z", 0.1, 3, 0.01).name("scaleZ");

const donutFolder = meshesFolder.addFolder("Donut");
donutFolder.add(donut.position, "x", -5, 5, 0.01);
donutFolder.add(donut.position, "y", -5, 5, 0.01);
donutFolder.add(donut.position, "z", -5, 5, 0.01);
donutFolder.add(donut.scale, "x", 0.1, 3, 0.01).name("scaleX");
donutFolder.add(donut.scale, "y", 0.1, 3, 0.01).name("scaleY");
donutFolder.add(donut.scale, "z", 0.1, 3, 0.01).name("scaleZ");

const planeFolder = meshesFolder.addFolder("Plane");
planeFolder.add(plane.position, "x", -10, 10, 0.01);
planeFolder.add(plane.position, "y", -10, 10, 0.01);
planeFolder.add(plane.position, "z", -10, 10, 0.01);
planeFolder.add(plane.scale, "x", 0.1, 5, 0.01).name("scaleX");
planeFolder.add(plane.scale, "y", 0.1, 5, 0.01).name("scaleY");
planeFolder.add(plane.scale, "z", 0.1, 5, 0.01).name("scaleZ");
planeFolder.add(plane.rotation, "x", -Math.PI, Math.PI, 0.01).name("rotationX");
planeFolder.add(plane.rotation, "y", -Math.PI, Math.PI, 0.01).name("rotationY");
planeFolder.add(plane.rotation, "z", -Math.PI, Math.PI, 0.01).name("rotationZ");

// Directional Light controls
const directionalFolder = lightsFolder.addFolder("Directional Light");
directionalFolder
  .addColor({ color: directionLight.color.getHex() }, "color")
  .onChange((v) => directionLight.color.setHex(v));
directionalFolder.add(directionLight, "intensity", 0, 10, 0.01);
directionalFolder.add(directionLight.position, "x", -10, 10, 0.01);
directionalFolder.add(directionLight.position, "y", -10, 10, 0.01);
directionalFolder.add(directionLight.position, "z", -10, 10, 0.01);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionLight,
  1
);
scene.add(directionalLightHelper);

const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.5
);
scene.add(hemisphereLightHelper);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

const spotlightHelper = new THREE.SpotLightHelper(spotlight);
scene.add(spotlightHelper);

window.requestAnimationFrame(function(){
  spotlightHelper.update()
})

// Animation Loop
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  donut.rotation.x += 0.01;
  donut.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
