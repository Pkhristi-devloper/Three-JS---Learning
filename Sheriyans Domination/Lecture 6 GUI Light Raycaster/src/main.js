import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
let gui = new GUI();

//we have another light named point light
//point light works similarly to the sun
//means when we add this light, this will create one pint and this point behaves like sun
//intensity of the light decreases with the increase in distance

// here in the pointLight we will give 4 params
//first one is the color: which defines the color of the light
// second one is intensity : which defines the intensity of the light to that particular position
// third oneis distance : this property defines that for how much distance the light is visible
// fourth one is decay : which shows that the intensity of the light will decrease with the increae of distance from the light position
let pointLight = new THREE.PointLight("white", 30, 10);
pointLight.position.x = 2;
pointLight.position.y = 2;
pointLight.position.z = 2;
scene.add(pointLight);

let pointHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointHelper);

const lightFolder = gui.addFolder("Point Light");
lightFolder.add(pointLight.position, "x", -10, 10).name("Position X");
lightFolder.add(pointLight.position, "y", -10, 10).name("Position Y");
lightFolder.add(pointLight.position, "z", -10, 10).name("Position Z");
/*
let light = new THREE.DirectionalLight("white", 10);
light.position.set(2, 4, 5);
scene.add(light);

//here the directional light is only aplied in one direction
// so we also use ambient light to see the other side of the object
//wewill use a little dim ambient light to see the other side

// let amb = new THREE.AmbientLight("white", 0.5);
// scene.add(amb);

let helper = new THREE.DirectionalLightHelper(light, 3);
scene.add(helper);


const lightFolder = gui.addFolder("Directional Light");
lightFolder.add(light.position, "x", -10, 10);
lightFolder.add(light.position, "y", -10, 10);
lightFolder.open();
let meshProp = {
  width: 1,
  height: 2,
  depth: 3,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  color: "red",
  wireframe: false,
};
*/
let amb = new THREE.AmbientLight(0xffffff, 1);
// amb.position.z =2
scene.add(amb);
let geo = new THREE.BoxGeometry(1, 2, 3);
let mat = new THREE.MeshPhysicalMaterial({
  color: "red",
  metalness: 0.99,
  roughness: 0,
  reflectivity: 5,
});
let mesh = new THREE.Mesh(geo, mat);

/*
let controlFolder = gui.addFolder("Controls");
controlFolder.add(meshProp, "width", 1, 10).onChange((value) => {
  mesh.geometry.dispose();
  mesh.geometry = new THREE.BoxGeometry(value, meshProp.height, meshProp.depth);
});
controlFolder.add(meshProp, "height", 1, 10).onChange((value) => {
  mesh.geometry.dispose();
  mesh.geometry = new THREE.BoxGeometry(meshProp.width, value, meshProp.depth);
});
controlFolder.add(meshProp, "depth", 1, 10).onChange((value) => {
  mesh.geometry.dispose();
  mesh.geometry = new THREE.BoxGeometry(meshProp.width, meshProp.height, value);
});
controlFolder.addColor(meshProp, "color").onChange((value) => {
  mesh.material.color.set(value);
});
controlFolder.add(meshProp, "rotationX", 0, Math.PI * 2).onChange((value) => {
  mesh.rotation.x = value;
});
controlFolder.add(meshProp, "rotationY", 0, Math.PI * 2).onChange((value) => {
  mesh.rotation.y = value;
});
controlFolder.add(meshProp, "rotationZ", 0, Math.PI * 2).onChange((value) => {
  mesh.rotation.z = value;
});
controlFolder.add(meshProp, "wireframe").onChange((value) => {
  mesh.material.wireframe = value;
});
*/
camera.position.z = 5;
let canvas = document.querySelector("#root");
let renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

let controls = new OrbitControls(camera, canvas);
scene.add(mesh);

function animate() {
  window.requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
