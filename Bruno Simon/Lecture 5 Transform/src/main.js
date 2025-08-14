import "./style.css";
import * as THREE from "three";

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

//canvas
const canvas = document.querySelector("canvas");
// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube Geometry & Material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);

cube.position.x = 1;
cube.position.y = -0.7;
cube.position.z = -1;
// cube.position.set(1,-0.7,-1)

// cube.scale.x=2;
// cube.scale.y=1;
// cube.scale.z=0.5;
// cube.scale.set(2,1,0.5)
scene.add(cube);
cube.position.normalize();

const axesHelper = new THREE.AxesHelper();
axesHelper.position.set(1, 1, -3);
scene.add(axesHelper);
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

camera.lookAt(new THREE.Vector3(1,2,1))