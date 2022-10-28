/**
 * Starter code
 * Chat application with a bot
 */

/* globals Vue, p5, BOT_MAPS */

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
       
        <select v-model="mapID" >
          <option v-for="(map,id) in maps">{{id}}</option>
        </select>
        
        <div>
          <table>
        </div>
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
//       Create a new simulated agent for this bot
      this.chatUsers[0] = new BotSimulator(this.map)
      
//       for (var i = 0; i < 40; i++) {
//         this.messages.push({
//           from: "computer",
//           msg: "hello" + i,
//         });
//       }
  
// 
      setInterval(() => {
        this.chatUsers
      }, 100);
    },
    
    watch: {
      map() {
        console.log("Map changed")
        this.chatUsers[0] = new BotSimulator(this.map)
      }
    },
    
    computed: {
      
      // The current bot
      map() {
        return this.maps[this.mapID]
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
        chatUsers: [],
        mapID: Object.keys(BOT_MAPS)[0],
        maps: BOT_MAPS,
        messages: [{ msg: "hello", from: "computer" }],
        name: "Kate",
        currentMsg: "",
      };
    },
    el: "#app",
  });
});
