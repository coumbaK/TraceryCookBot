Vue.component("slider-controls", {
  template: `<div class="slider-controls">
            <slider v-for="(val, index) in v" :objKey="index" :obj="v" />
         
         </div>`,
  props: {
    v: {
      isRequired: true,
      type: Array,
    },
  },
});

Vue.component("slider", {
  template: `<div class="slider">
      {{objKey}}
        <input 
            v-model.number="obj[objKey]"
            ref="slider"
            type="range" min="0" max="1" step=".02"
            
            />
          <label>{{obj[objKey].toFixed(2)}}</label>
      </div>`,
 
  props: {
    objKey: {
      isRequired: true,
    },
    obj: {
      isRequired: true,
    },
  },
});

