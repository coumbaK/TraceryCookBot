/**
 * Starter code
 * Create N swatches
 * Each swatch has code for when it starts and each frame after
 */

/* globals Vue, p5,randomVector, GENERATORS, createPopulation */

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
          
          <input type="number" v-model="populationCount" />
          <select v-model="selectedIndex">
          
            <option v-for="(v,index) in population">{{index}}</option>
          </select>
          
          <select v-model="generatorName">
            <option v-for="(data,name) in generators">{{name}}</option>
          </select>
          
          <button @click="randomize">🎲</button>
         
          <slider-controls :v="selected" /> 
          
          
        </div>
      
      </div>`,

    watch: {
      populationCount() {
        console.log("count change", this.populationCount)
         this.positions = getPositions(this.populationCount)
        changeToCount(this.generator, this.population, this.populationCount)
      }
    },
    methods: {
      randomize() {
        this.repopulate()
      },
      repopulate() {
        this.population = createPopulation(this.generator, this.populationCount);
        this.positions = getPositions(this.populationCount)
      },
    },

    mounted() {
      this.repopulate();

      setInterval(() => {
        // let t = p.millis() * 0.001;
        // Vue.set(this.selected, 0, p.noise(t));
      }, 100);

      // Create a P5 canvas element, JS-style
      // https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
      const s = (p0) => {
        p = p0;
        p.setup = () => {
          p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
          p.colorMode(p.HSL, 360, 100, 100);
          p.ellipseMode(p.RADIUS);
        };

        p.draw = () => {
          let t = p.millis() * 0.001;
          // setVectorToWander(v, t)

          p.background(180, 80, 80);

          p.push();
          this.population.forEach((individual, index) => {
            // figure out the placement for these
            p.push()
            p.translate(...this.positions[index])
            p.fill(0, 0, 0, .2)
            p.noStroke()
            p.ellipse(0, 0, 40, 20)
            p.ellipse(0, 0, 30, 15)
            
            this.generator.draw(p, t, individual)
            p.pop()
          })
          p.pop();
        };
        
        p.mouseClicked = () => {
          let closestDist = 100
          let closestIndex = 0
//           Get the closest position
          for (var i = 0; i < this.positions.length; i++) {
            let d = Math.abs(p.mouseX - this.positions[i][0])
            if (d < closestDist) {
              closestDist = d
              closestIndex = closestIndex
            
            }
          }
          this.selectedIndex = closestIndex
          console.log("Selected")
        }
      };

      // Create P5
      const CANVAS_EL = document.getElementById("canvas-holder");
      CANVAS_EL.style.width = CANVAS_WIDTH + "px";
      CANVAS_EL.style.height = CANVAS_HEIGHT + "px";
      new p5(s, CANVAS_EL);
    },

    computed: {
      generator() {
        return this.generators[this.generatorName];
      },
      selected() {
        return this.population[this.selectedIndex];
      },
    },

    data() {
      return {
        positions: [],
        populationCount: 5,
        seed: Math.floor(Math.random() * 1000000),
        generatorName: Object.keys(GENERATORS)[0],
        generators: GENERATORS,
        selectedIndex: 0,
        population: population,
      };
    },
    el: "#controls",
  });
});


function getPositions(count) {
  let positions = []
  for (var i = 0; i < count; i++) {

    let pct = count==1?.5:i/(count - 1)
    let x = CANVAS_WIDTH*.5 + (CANVAS_WIDTH - 100)*.9*(pct - .5)
    let y = CANVAS_HEIGHT*(.8 + .1*(i%2))
    positions.push([x, y])

  }
  return positions
}