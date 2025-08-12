// postcss index.css -o style.css --watch
// main.js
import "./style.css";
import "./index.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

let geo = new THREE.BufferGeometry();

//this is the first way to create a geometry
// let vertices = new Float32Array([
//   1,-1,1, // Vertex 1
//   -1,-2,1, // Vertex 2
//   -1,-1,1, // Vertex 3
//   3,-2,1, // Vertex 4
//   1,1,-1, // Vertex 5
//   -1,1,-1, // Vertex 6
// ])

//this is the second way to create a geometry
let vertices = new Float32Array(999);
for (let i = 0; i < 999; i++) {
  vertices[i] = (Math.random() - 0.5);
}
geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

const mat = new THREE.MeshBasicMaterial({ color: "crimson" , wireframe:true});
let mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

let canvas = document.querySelector("canvas");
let renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera,canvas)
camera.position.z = 5;
// renderer.render(scene, camera);
controls.enableDamping = true; // an option to make the controls smoother
controls.dampingFactor = 0.05; // the factor of damping, the higher the smoother
function animate() {
  window.requestAnimationFrame(animate);
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;
  // mesh.rotation.z += 0.01;
  // mesh.scale.x += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// let cubeGeo = new THREE.BoxGeometry(2, 2, 2);
// let cubeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// let cube = new THREE.Mesh(cubeGeo, cubeMat);
// // scene.add(cube);
// cube.position.x = -2;

// let sphereGeo = new THREE.SphereGeometry(1, 65, 55);
// let sphereMat = new THREE.MeshBasicMaterial({ color: "green" , wireframe:true});
// let sphere = new THREE.Mesh(sphereGeo, sphereMat);
// // scene.add(sphere);
// sphere.position.x = 2;
// sphere.scale.set(1.5, 1.5, 1.5); // Scale the sphere to 1.5 its size
// let group = new THREE.Group();
// group.add(cube);
// group.add(sphere);
// group.position.x = 2;
// scene.add(group);
// let canvas = document.querySelector("canvas");
// let renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.z = 5;

// /*
// In the below code, we are using cube.rotation.x and cube.rotation.y to animate the cube.
// but this is dependent of the FPS of the system. if the FPS is high, the cube will rotate faster, and if the FPS is low, it will rotate slower.
// So, we use clock to make the animation independent of the FPS.
// so we will define a clock one time and will use it while rendering the scene.
// so the animation function will be as below.
// */

// const clock = new THREE.Clock();
// function animate() {
//   requestAnimationFrame(animate);
// //   cube.rotation.y = clock.getElapsedTime();
// //if we want to move it faster, we can multiply it by a number
//   cube.rotation.y = clock.getElapsedTime() * 2;
//   sphere.rotation.x = clock.getElapsedTime() ;
//   renderer.render(scene, camera);
// }

// // function animate() {
// //   requestAnimationFrame(animate);
// //   cube.rotation.x += 0.01;
// //   cube.rotation.y += 0.01;
// //   sphere.rotation.x += 0.01;
// //   sphere.rotation.y += 0.01;
// //   renderer.render(scene, camera);
// // }

// animate();
