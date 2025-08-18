import "./style.css";
import * as THREE from "three";
import colorImage from "./assets/textures/color.jpg";
import { OrbitControls } from "three/examples/jsm/Addons.js";

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
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

/*
//image load

let image = new Image();
const texture = new THREE.Texture(image);
image.onload = () => {
  texture.needsUpdate = true;
};

image.src = colorImage;
*/

//texture loader

let loadingManager = new THREE.LoadingManager();

// loadingManager.onStart =()=>{
//     console.log("Loading started")
// }
// loadingManager.onLoad = ()=>{
//     console.log("Loading finished");
// }
// loadingManager.onProgress = () =>{
//     console.log("Loading Progressing")
// }
// loadingManager.onError=() =>{
//     console.log("Error occurred")
// }
let textureLoader = new THREE.TextureLoader(loadingManager);
let texture = textureLoader.load("/src/assets/textures/color.jpg");

//transform texture
// texture.repeat.x = 2;
// texture.repeat.y = 3;
// texture.wrapS = THREE.RepeatWrapping
// texture.wrapT = THREE.RepeatWrapping
// texture.offset.x = 0.5
// texture.offset.y = 0.5

texture.minFilter= THREE.NearestFilter
// Cube Geometry & Material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// console.log(geometry.attributes.uv);

//controls
let controls = new OrbitControls(camera,renderer.domElement)

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update()
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
