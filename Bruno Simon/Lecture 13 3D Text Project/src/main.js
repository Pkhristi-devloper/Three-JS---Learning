import {
  FontLoader,
  OrbitControls,
  TextGeometry,
} from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import typefaceFonts from "three/examples/fonts/helvetiker_regular.typeface.json";

// Scene
const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

//axis helper
// const axisHelper = new THREE.AxesHelper()
// scene.add(axisHelper)

//texture loader
const textureLoader = new THREE.TextureLoader();
let matcapTexture = textureLoader.load("/3.png");
let matcapTexture1 = textureLoader.load("/4.png");

//font loader

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Priyanshu Khristi", {
    font: font,
    size: 0.5,
    curveSegments: 10,
    depth: 0.2,
    bevelEnabled: true,
    bevelSize: 0.02,
    bevelThickness: 0.01,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  const material = new THREE.MeshMatcapMaterial();
  material.matcap = matcapTexture;
  const text = new THREE.Mesh(textGeometry, material);
  // textGeometry.computeBoundingBox()

  // textGeometry.translate(
  //   - textGeometry.boundingBox.max.x * 0.5,
  //   - textGeometry.boundingBox.max.y * 0.5,
  //   - textGeometry.boundingBox.max.z * 0.5
  // )
  // console.log(textGeometry.boundingBox)
  textGeometry.center();
  scene.add(text);
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

// Renderer
let canvas = document.querySelector("#root");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Cube Geometry & Material
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

//this is javascript method to measure the time
//for that we will simply pass the name as a string and will measure the time by the timeEnd and with the same name as below
//here we have named the variable "donut"

console.time("donut")

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const donutMaterial = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture1,
});
for (let i = 0; i < 1000; i++) {
  const donut = new THREE.Mesh(donutGeometry, donutMaterial);

  donut.position.x = (Math.random() - 0.5) * 40;
  donut.position.y = (Math.random() - 0.5) * 40;
  donut.position.z = (Math.random() - 0.5) * 40;

  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;

  const donutScale = Math.random();
  donut.scale.set(donutScale, donutScale, donutScale);

  scene.add(donut);
}
console.timeEnd("donut")
let controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = true;
controls.enableDamping = true;
controls.enableZoom = true;
// Animation Loop
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
