/* globals Vue */


 Vue.component("exit-watcher", {
    template: `<div class="exit-watcher">
      {{ew.exit}}
      ->{{ew.to}}
      
      c:{{ew.conditions}}
      a:{{ew.actions}}
      
      <div class="errors">
        <div class="error" v-for="e in ew.errors">{{e}}</div>
      </div>
   </div>`,
   
   props: ["ew"]
 })
 
/**==================================================
* Chat message
**/

  Vue.component("chat-message", {
    template: `<div class="chat-row" :class="{user:message.fromUser}">
        <div class="pfp">{{userPfp}}</div>
        <div class="chat-bubble" :class="{user:message.fromUser}" v-html="message.text">
        
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
          
          <chat-message v-for="msg in messages" :message="msg" />
         
        </section>
        
        <section class="chat-controls">
          <input v-model="currentInput" @keyup.enter="send" />
        </section>
      </div>`,
  
  data() {
    return {
      currentInput: ""
    }
  },
  
  props:["messages", "chatBots"]
  
})