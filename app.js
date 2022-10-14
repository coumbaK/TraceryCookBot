/**
 * Starter code
 * Create N swatches
 * Each swatch has code for when it starts and each frame after
 */

/* globals p5, ParticleSystem, WindSystem, RocketSystem, BasicSystem */

// TODO: ADD YOUR SYSTEM HERE
const SYSTEMS = [BasicSystem, WindSystem, RocketSystem, SpringSystem];


let p;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

let DEBUG_DRAW_EL 

window.addEventListener("load", function () {
  console.log("LOADED");
  let system;
  
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
      
       const elapsed = Math.min(0.1, speedMult * p.deltaTime * 0.001);
     
      
     system?.update(p, elapsed);
      

      p.push();
      
      system.draw(p)

      p.pop();
    };
  };

  const CANVAS_EL = document.getElementById("canvas-holder");
  CANVAS_EL.style.width = CANVAS_WIDTH + "px";
  CANVAS_EL.style.height = CANVAS_HEIGHT + "px";
  DEBUG_DRAW_EL = document.getElementById("debug-draw");
 
  
//   Create the p5 instance
  new p5(s, CANVAS_EL);
  
  
  function setSystem(systemClass) {
    console.log("initialize", systemClass.name)
    system = new systemClass()
    localStorage.setItem("lastsystem", systemClass.name)
  }
  
  let savedName = localStorage.getItem("lastsystem")
  console.log("load last-loaded system", savedName)
  let savedClass = SYSTEMS.find(s => s.name === savedName)
  if (savedClass)
    setSystem(savedClass);
  else 
     setSystem(SYSTEMS[0]);
 

  const BUTTON_HOLDER_EL = document.getElementById("buttons");

  SYSTEMS
    .forEach((system, index) => {
    let button = document.createElement("button");
    button.innerHTML = system.label;

    BUTTON_HOLDER_EL.appendChild(button);

    button.addEventListener("click", () => {
      setSystem(system);
    });
  });
});
