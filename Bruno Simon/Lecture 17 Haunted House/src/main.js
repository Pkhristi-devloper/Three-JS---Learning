import { OrbitControls, Sky } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

// Texture imports
import floorAlphaTextureSrc from "../static/floor/alpha.jpg";
import floorColorTextureSrc from "../static/textures/coast_sand_rocks_02_diff_1k.jpg";
import floorARMTextureSrc from "../static/textures/coast_sand_rocks_02_arm_1k.jpg";
import floorNormalTextureSrc from "../static/textures/coast_sand_rocks_02_nor_gl_1k.jpg";
import floorDisplacementTextureSrc from "../static/textures/coast_sand_rocks_02_disp_1k.jpg";

import brickColorTextureSrc from "../static/textures/bricks/castle_brick_broken_06_diff_1k.jpg";
import brickARMTextureSrc from "../static/textures/bricks/castle_brick_broken_06_arm_1k.jpg";
import brickNormalTextureSrc from "../static/textures/bricks/castle_brick_broken_06_nor_gl_1k.jpg";

import roofColorTextureSrc from "../static/textures/roofs/roof_slates_02_diff_1k.jpg";
import roofARMTextureSrc from "../static/textures/roofs/roof_slates_02_arm_1k.jpg";
import roofNormalTextureSrc from "../static/textures/roofs/roof_slates_02_nor_gl_1k.jpg";

import doorColorTextureSrc from "../static/door/color.jpg";
import doorAmbientOcclusionTextureSrc from "../static/door/ambientOcclusion.jpg";
import doorAlphaTextureSrc from "../static/door/alpha.jpg";
import doorHeightTextureSrc from "../static/door/height.jpg";
import doorMetalnessTextureSrc from "../static/door/metalness.jpg";
import doorNormalTextureSrc from "../static/door/normal.jpg";
import doorRoughnessTextureSrc from "../static/door/roughness.jpg";

import bushColorTextureSrc from "../static/textures/bushes/leaves_forest_ground_diff_1k.jpg";
import bushARMTextureSrc from "../static/textures/bushes/leaves_forest_ground_arm_1k.jpg";
import bushNormalTextureSrc from "../static/textures/bushes/leaves_forest_ground_nor_gl_1k.jpg";

import graveColorTextureSrc from "../static/textures/graves/plastered_stone_wall_diff_1k.jpg";
import graveARMTextureSrc from "../static/textures/graves/plastered_stone_wall_arm_1k.jpg";
import graveNormalTextureSrc from "../static/textures/graves/plastered_stone_wall_nor_gl_1k.jpg";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

//lights
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

//door light
const doorLight = new THREE.PointLight("#ff7d46", 5);
doorLight.position.set(0, 2.2, 2.5);
scene.add(doorLight);

//ghosts
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);

// Renderer
let canvas = document.querySelector("#root");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

//texuter loader
const textureLoader = new THREE.TextureLoader();

//texture
const floorAlphaTexture = textureLoader.load(floorAlphaTextureSrc);
const floorColorTexture = textureLoader.load(floorColorTextureSrc);
const floorARMTexture = textureLoader.load(floorARMTextureSrc);
const floorNormalTexture = textureLoader.load(floorNormalTextureSrc);
const floorDisplacementTexture = textureLoader.load(floorDisplacementTextureSrc);

floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

//bricks texture
const brickColorTexture = textureLoader.load(brickColorTextureSrc);
const brickARMTexture = textureLoader.load(brickARMTextureSrc);
const brickNormalTexture = textureLoader.load(brickNormalTextureSrc);
brickColorTexture.colorSpace = THREE.SRGBColorSpace;

//plane geometry
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
  })
);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// house group
const house = new THREE.Group();
scene.add(house);

//walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: brickColorTexture,
    aoMap: brickARMTexture,
    roughnessMap: brickARMTexture,
    metalnessMap: brickARMTexture,
    normalMap: brickNormalTexture,
  })
);
//here the house has height 2.5 unit and it is in the center,so the half is above the plane and the other half is below the plane
//so we will move the walls in y direction of 2.5/2 = 1.25 units
walls.position.y = 1.25;
house.add(walls);

//roof textures
const roofColorTexture = textureLoader.load(roofColorTextureSrc);
const roofARMTexture = textureLoader.load(roofARMTextureSrc);
const roofNormalTexture = textureLoader.load(roofNormalTextureSrc);
roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofColorTexture.repeat.set(4, 1);
roofARMTexture.repeat.set(4, 1);
roofNormalTexture.repeat.set(4, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;

// pyramid / roof of the house

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
);
house.add(roof);

//we will move the roof 2.5 + 1.25 because 2.5 is height of walls and 2.5 is total height of pyramid
roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI / 4;

//door textures
const doorColorTexture = textureLoader.load(doorColorTextureSrc);
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionTextureSrc);
const doorAlphaTexture = textureLoader.load(doorAlphaTextureSrc);
const doorHeightTexture = textureLoader.load(doorHeightTextureSrc);
const doorMetalnessTexture = textureLoader.load(doorMetalnessTextureSrc);
const doorNormalTexture = textureLoader.load(doorNormalTextureSrc);
const doorRoughnessTexture = textureLoader.load(doorRoughnessTextureSrc);

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
//door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementBias: -0.05,
    displacementScale: 0.15,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.position.y = 1;
door.position.z = 2 + 0.001;
house.add(door);

// bushes texture
const bushColorTexture = textureLoader.load(bushColorTextureSrc);
const bushARMTexture = textureLoader.load(bushARMTextureSrc);
const bushNormalTexture = textureLoader.load(bushNormalTextureSrc);

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

bushColorTexture.repeat.set(2, 1);
bushARMTexture.repeat.set(2, 1);
bushNormalTexture.repeat.set(2, 1);

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;

//bushes
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
});
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;
house.add(bush1, bush2, bush3, bush4);

// graves texture
const graveColorTexture = textureLoader.load(graveColorTextureSrc);
const graveARMTexture = textureLoader.load(graveARMTextureSrc);
const graveNormalTexture = textureLoader.load(graveNormalTextureSrc);

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveColorTexture.repeat.set(0.4, 0.3);
graveARMTexture.repeat.set(0.4, 0.3);
graveNormalTexture.repeat.set(0.4, 0.3);

//graves
const graves = new THREE.Group();
scene.add(graves);

const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
});
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);

// shadow fo wall, roof, floor
walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
plane.receiveShadow = true;

// use for loop to add 30 random graves
for (let i = 0; i < 29; i++) {
  let random = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const x = Math.cos(random) * radius;
  const z = Math.sin(random) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  //rotation
  grave.rotation.x = (Math.random() - 0.5) * 0.5;
  grave.rotation.y = (Math.random() - 0.5) * 0.5;
  grave.rotation.z = (Math.random() - 0.5) * 0.5;

  //position
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;
  graves.add(grave);
}
for (const grave of graves.children) {
  grave.castShadow = true;
  grave.receiveShadow = true;
}

//set the mapping

directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.height = 256;
ghost1.shadow.mapSize.width = 256;
directionalLight.shadow.camera.far = 20;

ghost2.shadow.mapSize.height = 256;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.camera.far = 20;

ghost3.shadow.mapSize.height = 256;
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.camera.far = 20;

//sky
const sky = new Sky();
// sky.scale.set(100,100,100)
//but all values are same, so we can use setScalar
sky.scale.setScalar(100)
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

//fogg
// scene.fog = new THREE.Fog("#ff0000",1,13)
scene.fog = new THREE.FogExp2("#06343f",0.1)
// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const timer = new THREE.Timer();

// Animation Loop
function animate() {
  timer.update();
  const elapsed = timer.getElapsed();
  const ghost1Angle = elapsed * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y =
    Math.sin(ghost1Angle) *
    Math.sin(ghost1Angle * 2.34) *
    Math.sin(ghost1Angle * 3.45);

  const ghost2Angle = -elapsed * 0.38;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y =
    Math.sin(ghost2Angle) *
    Math.sin(ghost2Angle * 2.34) *
    Math.sin(ghost2Angle * 3.45);

  const ghost3Angle = elapsed * 0.23;
  ghost3.position.x = Math.cos(ghost3Angle) * 6;
  ghost3.position.z = Math.sin(ghost3Angle) * 6;
  ghost3.position.y =
    Math.sin(ghost3Angle) *
    Math.sin(ghost3Angle * 2.34) *
    Math.sin(ghost3Angle * 3.45);
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
