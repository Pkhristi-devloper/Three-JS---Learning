When we add the controllers in our code, on every control when we are doing drag or zoom, then we always get one blue outline

to remove that, we will always give the canvas to outline:none in css
Now the another problem is that, when we resize the window, or we can say when we change the height and width, then we must have to reload the page to change the height and width of canvas according to the screen.
so we will simple add the event listener on the screen like this

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });


pixel ratio
Some might see the blurry render and stairseffect on edges.
It's because you are testing on a screen with a pixel ratio greater than 1
The pixel ratio corresponds to how many physical pixels you hace on the screen for one pixel unit on the software part.

Few years ago, all screens have pixel ratio 1 and if you looked closely, you could see those pixels
Constructors like Apple saw an opportunity and started building screens with a pixel ratio of 2.
Now some constructors are making even higher pixel ratios like 3 or even more

If we have pixel ratio of 1, then there will be only 1 pixel inside 1 pixel
or we can also say that only 1 pixel will be rendered in 1 pixel
If we have pixel ratio of 2, then 2*2=4 pixels will be rendered inside 1 pixel.
which informally can be say that we have 4 pixels inside the 1 pixel
If we have pixel ratio of 3 then the 3*3=9 pixels will be rendered in 1 pixel.
Highest pixel ratios are usually on the weakest devices

we will simply add the pixel ratio like this

    renderer.setPixelRatio(window.devicePixelRatio)

but we have seen that some of the devices have to much large pixel ratio, so to avoid that, we will use Math.min like this

    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

here in the above code, we are setting the pixel ratio which is minimum of the device pixel ratio and 2.


Full Screen

Suppose we want one full screen and all the taskbar and all should be invisible.
For that we will simply write the below code

    //full screen and exit full screen
    window,
    addEventListener("dblclick", () => {
        if (!document.fullscreenElement) {
        canvas.requestFullscreen();
        } else {
        document.exitFullscreen();
        }
    });

The above code will run on every browsers perfactly but not on safari browser 