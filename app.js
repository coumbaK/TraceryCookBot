/**
 * Starter code
 * Create N swatches
 * Each swatch has code for when it starts and each frame after
 */

/* globals p5, ParticleSystem, WindSystem, RocketSystem, BasicSystem */

// TODO: ADD YOUR SYSTEM HERE
const SYSTEMS = [BasicSystem, RocketSystem];


let p;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

window.addEventListener("load", function () {
  console.log("LOADED");
  let systems;
  
  let activeTool = undefined;
  // Create a P5 canvas element, JS-style
  // https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
  const s = (p0) => {
    p = p0;
    p.setup = function () {
      //       For each class, create a new system
      
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.colorMode(p.HSL, 360, 100, 100);
      p.ellipseMode(p.RADIUS);
    };

    p.draw = function () {
      const SPEED_EL = document.getElementById("speed-slider");
      const speedMult = SPEED_EL.value ** 2;
      // at 0, speed is 0, at 50 i
      
      drawBackground(p)

      if (systems) {
        const elapsed = Math.min(0.1, speedMult * p.deltaTime * 0.001);
        systems.forEach((ps) => ps.update(p, elapsed));

        p.push();
        p.translate(p.width / 2, p.height / 2);

        systems.forEach((ps) => ps.draw(p));
      }

      p.pop();
    };
  };

  const CANVAS_EL = document.getElementById("canvas-holder");
  CANVAS_EL.style.width = CANVAS_WIDTH + "px";
  CANVAS_EL.style.height = CANVAS_HEIGHT + "px";
  
 
  
//   Create the p5 instance
  new p5(s, CANVAS_EL);
  //   Create all the particle systems
  console.log("p", p)
  systems = SYSTEMS.map((pClass) => new pClass());
  
  
  function setSystem(index) {
    
  }
  setBrush(Math.max(localStorage.getItem("lastbrush"), brushes.length - 1) || 0);
  const COLOR0_EL = document.getElementById("color0");
  const COLOR1_EL = document.getElementById("color1");
  const SLIDER0_EL = document.getElementById("size");
  COLOR0_EL.value = HSLToHex(...color0);
  COLOR1_EL.value = HSLToHex(...color1);
  SLIDER0_EL.value = brushSize;

  //   Listen to the "change" events from the color pickers and sliders
  COLOR0_EL.addEventListener("change", function () {
    color0 = hexToHSL(this.value);
    console.log("Change color0", this.value, color0);
  });
  COLOR1_EL.addEventListener("change", function () {
    color1 = hexToHSL(this.value);
    console.log("Change color1", this.value, color1);
  });
  SLIDER0_EL.addEventListener("change", function () {
    console.log("Change size", this.value, SLIDER0_EL);
    brushSize = this.value
  });

  brushes.filter(b=>b.isActive).forEach((brush, index) => {
    let button = document.createElement("button");
    button.innerHTML = brush.label;

    BUTTON_HOLDER_EL.appendChild(button);

    button.addEventListener("click", () => {
      setBrush(index);
    });
  });
});
