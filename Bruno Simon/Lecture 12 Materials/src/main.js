import "./style.css";
import * as THREE from "three";
// import GUI from "lil-gui";
import * as LIL from "lil-gui";

import doorColorImg from "./textures/door/color.jpg";
import doorAlphaImg from "./textures/door/alpha.jpg";
import doorAmbientOcclusionImg from "./textures/door/ambientOcclusion.jpg";
import doorHeightImg from "./textures/door/height.jpg";
import doorMetalnessImg from "./textures/door/metalness.jpg";
import doorNormalImg from "./textures/door/normal.jpg";
import doorRoughnessImg from "./textures/door/roughness.jpg";
import matcapImg from "./textures/matcaps/3.png";
import cubeTextureImgNx from "./textures/environmentMaps/0/nx.jpg"
import cubeTextureImgPx from "./textures/environmentMaps/0/px.jpg"
import cubeTextureImgNy from "./textures/environmentMaps/0/ny.jpg"
import cubeTextureImgPy from "./textures/environmentMaps/0/py.jpg"
import cubeTextureImgNz from "./textures/environmentMaps/0/nz.jpg"
import cubeTextureImgPz from "./textures/environmentMaps/0/pz.jpg"
import gradientImg from "./textures/gradients/5.jpg";
import { OrbitControls } from "three/examples/jsm/Addons.js";

//create a GUI panel
const gui = new LIL.GUI();
//textures
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load(doorColorImg);
const doorAlphaTexture = textureLoader.load(doorAlphaImg);
const doorAmbientOcclutionTexture = textureLoader.load(doorAmbientOcclusionImg);
const doorHeightTexture = textureLoader.load(doorHeightImg);
const doorMetallnessTexture = textureLoader.load(doorMetalnessImg);
const doorNormalTexture = textureLoader.load(doorNormalImg);
const doorRoughnessTexture = textureLoader.load(doorRoughnessImg);

const matcapTexture = textureLoader.load(matcapImg);
const gradientTexture = textureLoader.load(gradientImg);
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

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

// const material = new THREE.MeshBasicMaterial();
// material.color.set("#ff7070");

// material.map = doorColorTexture;
// console.log(doorColorTexture)
// material.color = new THREE.Color("blue");
// material.wireframe=true
// material.transparent=true
// material.alphaMap= doorAlphaTexture
// material.opacity=0.5

//normal material
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

//matcap material
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

//mesh depth material
// const material = new THREE.MeshDepthMaterial();

//mesh labmer material
// const material = new THREE.MeshLambertMaterial();

//mesh phong material
// const material = new THREE.MeshPhongMaterial()
// material.shininess=1000

// specular
// material.specular= new THREE.Color(0x112811)

//mesh toon material
// const material = new THREE.MeshToonMaterial()
// material.map=gradientTexture

// const material = new THREE.MeshStandardMaterial();
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclutionTexture;
// material.alphaMap = doorAlphaTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.metalnessMap = doorMetallnessTexture;
// material.transparent=true

const material = new THREE.MeshStandardMaterial();
const environmentTexture = cubeTextureLoader.load([
  cubeTextureImgPx,cubeTextureImgNx,cubeTextureImgPy,cubeTextureImgNy,cubeTextureImgPz,cubeTextureImgNz
])

material.envMap= environmentTexture
gui.add(material, "metalness").min(0).max(3).step(0.001);
gui.add(material, "roughness", 0, 3, 0.001);
gui.add(material, "aoMapIntensity", 0, 3, 0.001);

// Cube
const cube = new THREE.Mesh(new THREE.BoxGeometry(), material);
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 31, 31), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.2, 30, 30),
  material
);

sphere.position.x = -1.5;
torus.position.x = 1.5;
scene.add(cube, sphere, torus);

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.x = 2;
pointLight.position.y = 0;
pointLight.position.z = 2;

scene.add(pointLight);
const helperLight = new THREE.PointLightHelper(pointLight, 1, "white");
scene.add(helperLight);

let controls = new OrbitControls(camera, renderer.domElement);
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
