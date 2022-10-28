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



  new Vue({
    template: `<div id="app">
      
      <section class="bot-data">
       
        <select v-model="mapID" >
          <option v-for="(map,id) in maps">{{id}}</option>
        </select>
        
        <div>
          <table>
            <tr v-for="sim in chatBots">
             <td><b>State:{{sim.stateID}}</b></td>
              <td class="label">{{sim.map.title}}</td>
                   <td>Time:{{sim.timeInState.toFixed(2)}}</td>
            
               <td>States:{{Object.keys(sim.map).join(",")}}</td>
            </tr>
          </table>
          
         
        </div>
        
        <bot-debug v-for="bot in chatBots" :bot="bot" />
      </section>

     <chat :chatBots="chatBots" :messages="messages" />
      
     
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
      }, 900);
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
        let messages = this.messages
           
        // Create a new bot, with this info
           Vue.set( this.chatBots, index, new BotSimulator(mapID, this.maps[mapID], {onPost(message) {
              messages.push(message)
           }}))
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
