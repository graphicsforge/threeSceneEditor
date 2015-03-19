uses three.js to draw models

Getting Started
---
 1. run `npm install`
 1. launch the web server `node app.js`
 1. point a browser at http://localhost:3000
 1. drag+drop some .obj files onto your browser (you can download some from the ./resources/ directory of this project)
 1. click on one of the new options you have in the top-right section
 1. click anywhere on the grid on the 3D view to your left to place an object
 1. if you shift+click to select an object, you can now rotate by holding down 'r' and mousing left or right

Conclusion
---
This was a quick experiment in creating an interface to build a 3d scene 100% on the client side.
I'm going to stop here and switch to using a different 3d framework for this project because this one seems a bit clumsy at handling multiple instances of the same mesh geometry... I dragged a dude into the scene and gave him only 50 arms and my framerate more than halved.
But I'm keeping this repo around because I can use it for benchmarking browser+hardware performance.
