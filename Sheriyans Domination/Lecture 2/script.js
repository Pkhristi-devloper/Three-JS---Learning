const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  20
);

//to define the geometry of the cube
// const geometry = new THREE.BoxGeometry(1,1,1)

//to define the geometry, first 3 params.. and the other are used to define the number of segments in each axis
const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
const material = new THREE.MeshBasicMaterial({
  color: "greenyellow",
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);

//these are used to position the cube in the scene
// cube.position.set(2, 2, -2);//this is to set the position in one go
// cube.position.x = 2;
// cube.position.y = 2;
// cube.position.z = -2;

cube.scale.z = 5;
cube.rotation.y = 0.5;

scene.add(cube);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 0

renderer.render(scene, camera);

function animate() {
  window.requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
