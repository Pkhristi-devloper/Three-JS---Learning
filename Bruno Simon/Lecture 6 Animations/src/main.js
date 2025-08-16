import * as THREE from "three";
import "./style.css";
import gsap from "gsap"
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

// Cube Geometry & Material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
renderer.render(scene,camera)
gsap.to(cube.position,{
  x:2,
  duration:1,
  delay:1
})

let click = () => {
  window.requestAnimationFrame(click)
  renderer.render(scene,camera)
}
click()

// Animation Loop
// let time = Date.now();
/*
let clock = new THREE.Clock()
function animate() {
  requestAnimationFrame(animate);
  let time = clock.getElapsedTime()
  cube.position.x = Math.sin(time)
  cube.position.y = Math.cos(time)
  cube.rotation.y = time
  cube.rotation.x = time
  // let currentTime = Date.now();
  // let deltaTime = currentTime - time;
  // time= currentTime
  // cube.rotation.x += deltaTime * 0.004;
  renderer.render(scene,camera)
}
animate();

*/
// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
