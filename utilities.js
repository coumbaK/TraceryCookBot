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
            ref="slider"
            type="range" min="0" max="1" step=".02"
            @input="update"
            
            />
          <label>{{val.toFixed(2)}}</label>
      </div>`,
  methods: {
    update() {
      let v = this.$refs.slider.value;
      Vue.set(this.obj, this.objKey, parseFloat(v));
    },
  },
  watch: {
    val() {
      this.$refs.slider.value = this.val;
    },
  },
  mounted() {
    this.$refs.slider.value = this.val;
  },
  computed: {
    val() {
      return this.obj[this.objKey];
    },
  },
  props: {
    objKey: {
      isRequired: true,
    },
    obj: {
      isRequired: true,
    },
  },
});

