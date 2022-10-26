/**
 * Starter code
 * Chat application with a bot
 */

/* globals Vue, p5 */



window.addEventListener("load", function () {


  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  // VUE!!!
  // Create a new vue interface

  new Vue({
    template: `<div id="app">
      {{name}} PAGE
      <input v-model="name" />
      
      
      
      <div v-for="msg in messages" class="chatbubble" :class="{user:msg.fromUser}">
        {{msg.from}}:{{msg.msg}}
      </div>
      
       <input v-model="currentMsg" @keyup.enter="send" />
    </div>`,
    
    mounted() {
      setInterval(() => {
         this.messages.push({
          from: "computer",
          msg: "hello"
        })
      }, 1000)
    },

    methods: {
      send() {
        console.log("SEND MESSAGE")
        this.messages.push({
          fromUser: true,
          from: this.name,
          msg: this.currentMsg
        })
        this.currentMsg = ""
      }
    },

    data() {
      return {
        
        messages: [{msg:"hello", from:"computer"}],
        name: "Kate",
        currentMsg: ""
      };
    },
    el: "#app",
  });


});


