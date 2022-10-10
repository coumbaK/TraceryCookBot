/**
 * Starter code
 * Create N swatches
 * Each swatch has code for when it starts and each frame after
 */

const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 300
window.addEventListener("load", function () {
  console.log("LOADED");
  
  let ps = new ParticleSystem()

  let activeTool = undefined;
  // Create a P5 canvas element, JS-style
  // https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
  const s = (p) => {
    p.setup = function () {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.colorMode(p.HSL, 360, 100, 100);
      p.ellipseMode(p.RADIUS);
      
    };


    p.draw = function () {
      
       ps.update(p, p.deltaTime)
      
      p.push()
      p.translate(p.width/2, p.height/2)
      // p.circle(0, 0, 100)
      ps.draw(p)
      p.pop()
    };
  };

  

  
  
  
  
  
  
  
  
  
  
  
  
  
  const CANVAS_EL = document.getElementById("canvas-holder");
  CANVAS_EL.style.width = CANVAS_WIDTH + "px";
  CANVAS_EL.style.height = CANVAS_HEIGHT + "px";

  p = new p5(s, CANVAS_EL);



 
});
