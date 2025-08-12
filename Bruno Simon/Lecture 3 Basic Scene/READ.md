we need 4 elements to get started
    A scene that will contain objects
    some objects
    a camera
    a renderer

Scene 
    A scene is like a container 
    we put objects, models,lights, etc. in it
    At some point we ask the THREE.js to render that scene
Objects
    Can be many things
    primitive geometries
    imported models
    particles
    lights
    etc.
    
Start with a simple cube
We need to create a Mesh.   
    combination of geometry(the shape) and a material(how it looks)
    start with box geometry and MeshBasicMaterial

steps :
    create a geometry
    create a material
    then create one mesh using geometry and material
    after that add into the scene

Camera:
    it is not visible
    serve as point of view when doing render
    can have multiple and swith between them
    different types
    we are going to use PerspetiveCamera

    we must have to provide the params inside the camera
    first param is fov - Field Of View
        this is a vertical vision angle
        in degrees
        also called fov
        (in simple language, it is the angle for which the camera can see)