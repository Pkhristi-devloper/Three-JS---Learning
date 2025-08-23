we are going to use the TextBufferGeometry class but we need a particular font format called typeface
if you're using a typeface you've downloaded, then you must have right to use it 

We can also use the fonts provided by three.js
go to the /nodemosules/three/exmples/fonts folder
we can take that fonts and out them in /static folder or we can import them directly


now we use bounding to improve the efficiency of our site.
In 3d world, bounding means we will cover the whole object inside a simple invisible box/sphere

Another term is frustum culling
this means we will render the object only which is inside the view area.
this will improve the efficiency.

Simple language => frustum culling = Ignore the objects outside the frustum(view area)


now in bouding, there are two types
box bounding and sphere bounding
by default, Three.js uses sphere bounding.

    textGeometry.computeBoundingBox()
    console.log(textGeometry.boundingBox)
The result is an instance of a Box3 with min and max properties.
The min property isn't at 0 because of bevelthickness and bevelsize.

    textGeometry.computeBoundingBox()
    textGeometry.translate(
    - textGeometry.boundingBox.max.x * 0.5,
    - textGeometry.boundingBox.max.y * 0.5,
    - textGeometry.boundingBox.max.z * 0.5
    )

This is the first way to make the text in center.
there is another and simple way to do this as below.

    textGeometry.center()