We have mostly 4 properties to transform objects.
position
scale
rotation
quaternion

All classes that inherit from the Object3d process those properties like PerspectiveCamera or Mesh.
We can see the inheritance on the top of the documentation of Three.js
Those properties will be compiled into matrices

first property is position.
we have three properties inside the position.
x,y and z

we can set position in the below way
cube.position.x = 1;
cube.position.y = -0.7;
cube.position.z = -1;

if we want to add all three positions in one line then we willl use set method.
cube.position.set(1,-0.7,-1)

position inherits from Vector3 which has many useful methods

we can get the length of the vector also

console.log(cube.position.length()) - to get the length

and we can also get the distance of the object from another vector3

here for the vecotr3, we are passing the position of the camera and measuring the distance from the camera position to cube position

console.log(cube.position.distanceTo(camera.position));

The another thing is that, we can normalize these values.
normalizing these values means we can make all the values equals to 1.

after normalization, the position of the cube will be at center.

to user normalize, we will write the below method

The setting of the position in 3d is too much hard.
So to get help, we may use AxisHelper.
It is an object which will bring one graph of three axis.

to use axishelper, we will write the below code

const axesHelper = new THREE.AxesHelper();
axesHelper.position.set(1, 1, -3);

We have also another property named scale.
Scale is also Vector3 and inside that, we can increase/decrease the length of the mesh.

to set the scale we can set in the same way as position.

cube.scale.x=2;
cube.scale.y=1;
cube.scale.z=0.5;
cube.scale.set(2,1,0.5);

Rotation
This also have three x,y,z properties but it's Euler.
When you change the x,y,z properties you can imagine putting a stick through you object's center in the axiz direction and then rotating that object on the stick.
The value of these axes is expressed in radians.
Half a rotation is something like 3.14159... but you can use Math.PI

Gimbal lock
When we rotate on axis, we might also rotate the other axis.
The rotation goes by default in x,y and z order and you can get strange result like an axis is not working anymore
This is called gimbal lock.

if you want to change the order then you can do it by using the reorder(...) method

cube.rotation.reorder("yxz");

by using this line, the cube will first rotate in y direction and then it will rotate in x direction and at last it will rotate in z direction
do it before changing the rotation

Quaternion

Euler can be easy to understand, but this axis order can be problematic.
This is why most engines and 3D softwares use Quaternion.
Quaternion also expresses the rotation but in a more mathemetical way.
We will not see the quaternion right now but always remember that the quaternion updates when you change the rotation

lookAt method
Object3D have a lookAt method, which rotates the object sothat its -z faces the target you provided.
The target must be a Vector3

camera.lookAt(new THREE.Vector3(1,2,1))

Group
In three js if we want to make more than one elems in the same direction, then we can create one group and then can add all the objects inside that group.

for that we will use the below code.

const boxGroup = new THREE.Group();
boxGroup.add(box1)
boxGroup.add(box2)
boxGroup.add(box3)

something like that...
and will apply the all position and all in the same way.
