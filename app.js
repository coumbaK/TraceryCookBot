/**
 * Starter code
 * Create N swatches
 * Each swatch has code for when it starts and each frame after
 */

window.addEventListener("load", function () {
  console.log("LOADED")
 
 
  // Create a P5 canvas element, JS-style
  // https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
  const s = (p) => {
    p.setup = function () {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.colorMode(p.HSL, 360, 100, 100);
      p.ellipseMode(p.CENTER_RADIUS);
      p.circle(0, 0, 100)
    };

    p.draw = function () {
      p.background(150, 100, 50)
      let t = p.millis() * 0.001;
    
    };
  };
  
  const CANVAS_EL = document.getElementById("canvas-holder")
  let myp5 = new p5(s, CANVAS_EL);

});


//=========================================
// Utility functions
// Given a processing object, a pct around the circle, a radius, and an offset (optional)
function getLoopingNoise({
	p,
	loopPct,
	radius,
	offset = 0
}) {

  // This number should go from 0 to 1 every loopLength seconds
  // And PI*2 radians every loopLength seconds

  let theta = 2 * Math.PI * loopPct

  // Place to sample the noise from
  let x = radius * Math.cos(theta)
  let y = radius * Math.sin(theta)

  let noiseVal = p.noise(x + 100, y + 30, offset)

  return noiseVal
}

