/* globals Vue */

/**==================================================
* Chat message
**/

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

/**==================================================
* Chat window
**/
Vue.component("chat", {
  template: ` <div class="chat">
        <section class="chat-messages">
          
          <div v-for="msg in messages" class="chatbubble" :class="{user:msg.fromUser}">
            {{msg.from}}:{{msg.msg}}
          </div>
        </section>
        
        <section class="chat-controls">
          <input v-model="currentMsg" @keyup.enter="send" />
        </section>
      </div>`,
  
  data() {
    
  },
  
  props:["messages", "chatBots"]
  
})