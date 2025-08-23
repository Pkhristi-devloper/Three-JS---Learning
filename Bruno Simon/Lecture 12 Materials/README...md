Materials
Materials are used to put a color on each visible pixel of the geometries.
The algorithms are written in programms called the shaders
We don't need to write shaders and we can use built-in materials.

Until now we have applied onle Mesh.BasicMaterial in all the objects, which applies a uniform color or a texture on our geometry

1.Mesh Basic Material
it the the one of the most basic material

Most of materials properties can be set in two ways

    const material = new THREE.MeshBasicMaterial({ map: texture });

and the second way is:

    const material = new THREE.MeshBasicMaterial();
    material.map('texture')
But if we want to use the color property, then we have two different methods to set the color.

    material.color = new THREE.Color("blue")
    material.color.set("#ff7070");

Both these ways are used to set the color property
We can also add the opacity to the material
To add the opacity, we must need to make the transparent property equals to true

    material.transparent=true
    material.opacity=0.5
Alphamap - This controls the transparency with a texture
material.transparent = true
material.alphaMap = doorAlphaTexture


NormalMaterial 
The MeshNormalMaterial displays a nice purple color that looks like the normal structure we saw in the texture lessons.

normals can be used for lighting, reflection, refraction, etc.
MeshNormalMaterial shares some common properties with MeshBasicMaterial like wireframe, transparent, opacity and side but there is also a flatShading property.

    material.flatShading = true
flatShadding will flatten the faces, meaning that the normals won't be interpolated between the vertices.
MeshNormalMaterial is usually used to debug normals, but the color looks so great so we can also use it for our projects.


MeshMatcapMaterial
MeshMatcapMaterial will display a color by using the normals as a reference to pick the right color on a texture that looks like a sphere.

Set the matcap texture with the matcap property.

    const material = new THREE.MeshMatcapMaterial();
    material.matcap = matcapTexture;
we get the illusion that the objects are being illuminated 

MeshDepthMaterial
meshdepthMaterial will simply color the geometry in white if it's close to the near and in back if it's close to the far value of the camera

mesh labmer material
const material = new THREE.MeshLambertMaterial();


mesh phong material
const material = new THREE.MeshPhongMaterial()
material.shininess=1000

specular
used to change the color of reflection 
material.specular= new THREE.Color(0x112811)


mesh toon material - little bit cartoonish material

    const gradientTexture = textureLoader.load(gradientImg);
    gradientTexture.minFilter = THREE.NearestFilter
    gradientTexture.magFilter = THREE.NearestFilter
    gradientTexture.generateMipmaps = false

    const material = new THREE.MeshToonMaterial()
    material.map=gradientTexture

mesh standard material

    const material = new THREE.MeshStandardMaterial()
Mesh standard material uses PBR(Physically Based Rendering) principles

    const material = new THREE.MeshStandardMaterial();
    material.map = doorColorTexture;
    material.aoMap = doorAmbientOcclutionTexture;
    material.alphaMap = doorAlphaTexture;
    material.roughnessMap = doorRoughnessTexture;
    material.metalnessMap = doorMetallnessTexture;
    material.transparent=true

Mesh Physics Material
This is the same as neshStandard material but with support of clear coat effect

Point material - we can use point material with particles

Shader material & RawShader Material
Both of these are used to create our own materials

Environment Map
EnvironmentMap is the image of what is surrounding the scene.
It can be used for reflection or refrection but also for general lighting  
Environtment maps are supported by maltiple materials but we are going to use MeshStandardMaterial
we can also add the background and all using CubeTextureLoader

    const cubeTextureLoader = new THREE.CubeTextureLoader()
