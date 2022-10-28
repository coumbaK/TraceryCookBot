/**
 * Starter code
 * Chat application with a bot
 */

/* globals Vue, p5, BOT_MAPS, BotSimulator */

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
            <tr v-for="sim in chatBots">
              <td class="label">{{sim.map.title}}</td>
                   <td>Time:{{sim.timeInState.toFixed(2)}}</td>
             <td>State:{{sim.stateID}}</td>
               <td>States:{{Object.keys(sim.map).join(",")}}</td>
            </tr>
          </table>
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
     this.setUser(0, this.mapID)
      
//       for (var i = 0; i < 40; i++) {
//         this.messages.push({
//           from: "computer",
//           msg: "hello" + i,
//         });
//       }
  
// 
      setInterval(() => {
        let t = Date.now()
        this.chatBots.forEach(bot => bot.update(t))
      }, 100);
    },
    
    watch: {
      map() {
        console.log("Map changed")
        this.setUser(0, this.mapID)
      }
    },
    
    computed: {
      
      // The current bot
      map() {
        return this.maps[this.mapID]
      }
    },

    methods: {
      setUser(index, mapID) {
       
           Vue.set( this.chatBots, index, new BotSimulator(this.maps[mapID]))
      },
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
        chatBots: [],
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
