/**
 * Starter code
 * Create N swatches
 * Each swatch has code for when it starts and each frame after
 */

let p;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

window.addEventListener("load", function () {
  console.log("LOADED");

  let ps = new ParticleSystem();

  let activeTool = undefined;
  // Create a P5 canvas element, JS-style
  // https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
  const s = (p0) => {
    p = p0;
    p.setup = function () {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.colorMode(p.HSL, 360, 100, 100);
      p.ellipseMode(p.RADIUS);
    };

    p.draw = function () {
      
      const SPEED_EL = document.getElementById("speed-slider");
      const speedMult = SPEED_EL.value**2
      console.log(speedMult)
      // at 0, speed is 0, at 50 i
      p.background(50);
      
      const elapsed = Math.min(.1, speedMult*p.deltaTime * 0.001)
      ps.update(p, elapsed);

      p.push();
      p.translate(p.width / 2, p.height / 2);
      
      ps.draw(p);
      p.pop();
    };
  };

  const CANVAS_EL = document.getElementById("canvas-holder");
  CANVAS_EL.style.width = CANVAS_WIDTH + "px";
  CANVAS_EL.style.height = CANVAS_HEIGHT + "px";

  new p5(s, CANVAS_EL);
});
