import "./style.css";
import "./index.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load(
  "https://c.saavncdn.com/776/Chhota-Bheem-aur-Krishna-Hindi-2008-20240515125838-500x500.jpg"
);

const geo = new THREE.BoxGeometry(1, 2, 3);
const mat = new THREE.MeshBasicMaterial({ map: texture });

const mesh = new THREE.Mesh(geo, mat);

//by using this, seems like the mesh is rotated towards the given vector
// mesh.lookAt(-1,1,0)

//the below approach is more intuitive
// mesh.lookAt(new THREE.Vector3(-1, 1, 1));

let mouse = {
  x: 0,
  y: 0,
};

window.addEventListener("resize", (e) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

window.addEventListener("mousemove", (e) => {
  (mouse.x = e.clientX / window.innerWidth),
    (mouse.y = e.clientY / window.innerHeight);
});

scene.add(mesh);
camera.position.z = 5;

const canvas = document.querySelector("#root");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
let controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;

controls.maxAzimuthAngle = Math.PI / 4;
controls.minAzimuthAngle = -Math.PI / 4;

controls.maxPolarAngle = Math.PI / 4;
controls.minPolarAngle = Math.PI / 1.25;

controls.minDistance = 3;
controls.maxDistance = 10;

function animate() {
  requestAnimationFrame(animate);
  mesh.lookAt(new THREE.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 1));
  renderer.render(scene, camera);
  controls.update();
}
animate();
