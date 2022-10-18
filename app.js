/**
 * Starter code
 * Create N swatches
 * Each swatch has code for when it starts and each frame after
 */

/* globals Vue, p5,randomVector */

// TODO: ADD YOUR SYSTEM HERE

let p;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

window.addEventListener("load", function () {
  console.log("LOADED");
  let system;
  
  let population = []
  for (var i = 0; i < 10; i++) {
    population[i] = randomVector(2 + Math.floor(Math.random()*2))
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
      let t = p.millis()*.001
      // setVectorToWander(v, t)
     
      p.background(180, 80, 80);

      p.push();

      p.pop();
    };

       Vue.component("slider-controls", {
         template: `<div class="slider-controls">
            <slider v-for="(val, index) in v" :objKey="index" :obj="v" />
         
         </div>`,
         props: {
           v: {
             isRequired:true,
             type: Array
           }
         }
       })
    
    Vue.component("slider", {
      template: `<div class="slider">
      {{objKey}}
        <input 
            ref="slider"
            type="range" min="0" max="1" step=".02"
            @input="update"
            
            />
          <label>{{val.toFixed(2)}}</label>
      </div>`,
      methods: {
        update() {
          let v = this.$refs.slider.value
          Vue.set( this.obj,this.objKey , parseFloat(v))
  
        }
      },
      watch: {
        val() {
          this.$refs.slider.value = this.val
        }
      },
      mounted() {
        this.$refs.slider.value = this.val
      },
      computed: {
        val() {
          return this.obj[this.objKey]
        }
      },
      props: {
        "objKey": {
          isRequired: true,
        }, 
        "obj": {
          isRequired: true
        }
      }
    })
    new Vue({
      template: `<div id="controls">
        <div>
          <select v-model="selectedIndex">
            <option v-for="(v,index) in population">{{index}}</option>
          </select>
         
          <slider-controls :v="selected" /> 
        </div>
      
      </div>`,
      mounted() {
        setInterval(() => {
          let t = p.millis()*.001
         Vue.set(this.selected, 0, p.noise(t))
        }, 100)
        
      },
      
      computed: {
        selected() {
          return this.population[this.selectedIndex]
        }
      },
      
      data() {
        return {
          selectedIndex: 0,
          population: population
        };
      },
      el: "#controls",
    });
  };

  const CANVAS_EL = document.getElementById("canvas-holder");
  CANVAS_EL.style.width = CANVAS_WIDTH + "px";
  CANVAS_EL.style.height = CANVAS_HEIGHT + "px";
  new p5(s, CANVAS_EL);
});
//======================
// Utilities
