One renderer is cool, but animation is better
Animating in three js is like doing stop motion
    move the object
    take a picture
    move the object bit more
    take a picture
    etc.
Most screens run at 60 frames per second(FPS), but not always. 
Your animation must look same regardless of the framerate

We need to update objects and do a render on each frame
We are going to da that in a function and are going to call that fuction with window.requestAnimationFrame(functionName)

The purpose of requestAnimationFrame is to call the function which is provided on the next frame.
Always remember that, this requestAnimationFrame is not used to do animations, it's just used to call the function on each frame
We are going to call the same function on each frame

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

So in this we have one function named "animate" which is going to be called on each frames.
ane in this code we are going to render the scene with our created camera on the renderer on each frame.
Unfortunately, the higher the framerate, the faster the animation will be

To solve this problem
We need to know how much time it's been since the last tick
Use Date.now() to get the current timestamps    
let time = Date.now();
function animate() {
  requestAnimationFrame(animate);

  let currentTime = Date.now();
  let deltaTime = currentTime - time;
  time = currentTime;
  console.log(deltaTime);
}
animate();

here we are firstly defining the starting time. 
and after that we are getting the current time of the animation.
after finding the starting time and current time, we will simply difference or we can say delta time.
and then we will simply log that delta time.
If we have a good laptop with higher framerate, then the delta time will be smaller.


And the another solution is to use clock
Three.js has an inbuilt solution named clock.
so that we will instantiate the clock and use it with getElapsedTime()
first we will initialize the clock outside the function
let clock = new THREE.Clock()

and after that, we will simply call the getElapsedTime in every rotation
cube.rotation.x = clock.getElapsedTime()

And if we want to make anything in a circular path then we can do that as below
  let time = clock.getElapsedTime()
  cube.position.x = Math.sin(time)
  cube.position.y = Math.cos(time)
So here i have simply changed the position of the cube on each frame based on the sin and cos value.

If we want to have more control, create tweens, create timelines, etc., then we can use a library like gsap.

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

her we have done animation using GSAP.