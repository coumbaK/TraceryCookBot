/**
 * Starter code
 * Chat application with a bot
 */

/* globals Vue, p5, BOTS */

window.addEventListener("load", function () {
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  // VUE!!!
  // Create a new vue interface

  Vue.component("chat-message", {
    template: `<div class="chatbubble-row" :class="{user:msg.fromUser}">
        <div>{{userPfp}}</div>
        <div class="chatbubble-row" :class="{user:msg.fromUser}">
          {{msg.from}}:{{msg.msg}}
        </div>
       
      </div>`,

    computed: {
      userPfp() {
        // How do we display this user?
        return "🍊"
      },
    },

    props: ["message", "bot"],
  });

  new Vue({
    template: `<div id="app">
      
      <section class="bot-data">
        {{name}} PAGE
        <input v-model="name" />
        
        <select v-model="botID" >
          <option v-for="(bot,id) in bots">{{id}}</option>
        </select>
      </section>

      <div class="chat">
        <section class="chat-messages">
          
          <div v-for="msg in messages" class="chatbubble" :class="{user:msg.fromUser}">
            {{msg.from}}:{{msg.msg}}
          </div>
        </section>
        
        <section class="chat-controls">
          <input v-model="currentMsg" @keyup.enter="send" />
        </section>
      </div>
      
     
    </div>`,

    mounted() {
      for (var i = 0; i < 40; i++) {
        this.messages.push({
          from: "computer",
          msg: "hello" + i,
        });
      }

      setInterval(() => {
        this.messages.push({
          from: "computer",
          msg: "hello",
        });
      }, 1000);
    },
    
    watch: {
      bot() {
        console.log("Bot changed")
      }
    },
    
    computed: {
      
      // The current bot
      bot() {
        return this.bots[this.botID]
      }
    },

    methods: {
      send() {
        this.messages.push({
          fromUser: true,
          from: this.name,
          msg: this.currentMsg,
        });
        this.currentMsg = "";
      },
    },

    data() {
      return {
        botID: Object.keys(BOTS)[0],
        bots: BOTS,
        messages: [{ msg: "hello", from: "computer" }],
        name: "Kate",
        currentMsg: "",
      };
    },
    el: "#app",
  });
});
