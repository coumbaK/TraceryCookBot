/**
 * Starter code
 * Create N swatches
 * Each swatch has code for when it starts and each frame after
 */

/* globals Vue, p5,randomVector, GENERATORS */

// TODO: ADD YOUR SYSTEM HERE

let p;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

window.addEventListener("load", function () {
  console.log("LOADED");
  let system;

  let population = [];
  for (var i = 0; i < 10; i++) {
    population[i] = randomVector(2 + Math.floor(Math.random() * 2));
  }

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
      let t = p.millis() * 0.001;
      // setVectorToWander(v, t)

      p.background(180, 80, 80);

      p.push();

      p.pop();
    };
  };

  // Create P5
  const CANVAS_EL = document.getElementById("canvas-holder");
  CANVAS_EL.style.width = CANVAS_WIDTH + "px";
  CANVAS_EL.style.height = CANVAS_HEIGHT + "px";
  new p5(s, CANVAS_EL);

  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  // VUE!!!
  // Create a new vue interface
  
  new Vue({
    template: `<div id="controls">
        <div>
          <div>{{generatorName}}</div>
          <div>{{generator.description}}</div>
          <select v-model="selectedIndex">
            <option v-for="(v,index) in population">{{index}}</option>
          </select>
          
          <select v-model="generatorName">
            <option v-for="(data,name) in generators">{{name}}</option>
          </select>
         
          <slider-controls :v="selected" /> 
        </div>
      
      </div>`,
    
    methods: {
      repopulate() {
        this.population = createPopulation(this.generator, this.populationSize)
      }
    },
    
    
    mounted() {
      this.repopulate()
      
      setInterval(() => {
        let t = p.millis() * 0.001;
        Vue.set(this.selected, 0, p.noise(t));
      }, 100);
    },

    computed: {
      generator() {
        return this.generators[this.generatorName]
      },
      selected() {
        return this.population[this.selectedIndex];
      },
    },

    data() {
      
      return {
        populationSize: 5,
        seed: Math.floor(Math.random()*1000000),
        generatorName: Object.keys(GENERATORS)[0],
        generators: GENERATORS,
        selectedIndex: 0,
        population: population,
      };
    },
    el: "#controls",
  });
});
