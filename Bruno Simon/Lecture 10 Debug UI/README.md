We need to be able to tweak and debug easily
It concerns the developer, the designer and even the client
it will help finding the perfact color, speed, quantity, etc.
For all of this, we need Debug UI.
We can create out own or we can use library
    lil-gui
    control-panel
    controlKit
    Guify
    Oui
In this we will use lil-gui, but we can also try more than this
for using this, we need to add lil-gui dependency like we added the gsap and all.

There are different types of elements you can add to that panel.
Range       - for numbers with minimum and maximum value
Color       - for colors with various formats
Text        - for simple texts
Checkbox    - for booleans(true or false)
Select      - for a choice from a list 
Button      - to trigger functions
Folder      - to organize your panel if you have too many elements

Use gui.add(...) to add an element
    the first parameter is an object
    the second parameter is the property you want to change(or tweak)
    
    gui.add(mesh.position,'y')

The next parameters handle
    Minimum
    maximum
    step(precision)

    gui.add(mesh.position,'y',minimum,maximum,precision)
    gui.add(mesh.position,'y',-10,10,0.1)

We can also do the same thing using the min(...), max(...) and step(...) method.

    gui.add(cube.position,'x').min(-10).max(10).step(0.01)
we can also provide the name to the panel also

    gui
        .add(cube.position, "x")
        .min(-10)
        .max(10)
        .step(0.01)
        .name("Elevation");

you can also add some more parameters like this
    
    gui.add(cube, "visible");
    gui.add(material, "wireframe");
    gui.addColor(material, "color");

but the condition is that, the first param must be an object
if we want to create our own object and want to pass in it then also we can do that as following

    const parameters = {
    spin: () => {
        gsap.to(cube.rotation, {
        y:cube.rotation.y + 10,
        duration: 1.5,
        });
    },
    };
    gui.add(parameters, "spin");

Now if you want to hide the panel to take the screenshot or for whatever reason, then you will write the below simple code

    window.addEventListener("keydown", (e) => {
    if (e.key == "h") {
        if (gui._hidden) {
        gui.show();
        } else {
        gui.hide();
        }
    }
    });