/* globals Vue */

/**==================================================
 * Bot simulator debugging
 **/

Vue.component("bot-chip", {
  template: ` <span class="chip bot-chip" :class="{['bot-chip-' + bot.stateID]:true}"> Bot{{bot.idNumber}}</span> `,

  props: ["bot"],
});

Vue.component("state-chip", {
  template: ` <span class="chip state-chip" :class="{['state-chip-' + stateID]:true}"> {{stateID}}</span> `,

  props: ["stateID"],
});

Vue.component("bot-debug", {
  template: ` <div class="panel bot-debug">
  <header>
    <bot-chip :bot="bot"/> running map '{{bot.mapID}}' 
  </header>
  <div>
    <state-chip :stateID="bot.stateID"/>
    
    <select v-model="selectedState">
      <option v-for="(state,stateID) in bot.map.states">{{stateID}}</option>
    </select>
    
    <span>time in state: {{bot.timeInState}}</span>
    
    
   
    <div>

    </div>
    <exit-watcher v-for="ew in bot.exitWatchers" :ew="ew" />

  </div>
</div>`,
  
  watch: {
    selectedState() {
      this.bot.setState(this.selectedState)  
    },
    "bot.state"() {
      this.selectedState = this.bot.state
      // this.bot.setState(this.selectedState)  
    }
  },
  
  data() {
    return {
      selectedState: this.bot.stateID
    }
  },

  props: ["bot"],
});

Vue.component("exit-watcher", {
  template: `<div class="exit-watcher">
      <pre class="minicode">{{ew.exit}}</pre>
      
      <span v-for="condition in ew.conditions" class="chip condition" :class="{active:condition.isActive}">{{condition.template}}</span>
      -><span class="chip">{{ew.to}}</span>
      <span v-for="action in ew.actions" class="chip action" :class="{active:action.isActive}">{{action.template}}</span>
      
      
     
      
      <div class="errors">
        <div class="error" v-for="e in ew.errors">{{e}}</div>
      </div>
   </div>`,

  props: ["ew"],
});

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
      return "🍊";
    },
  },

  props: ["message", "bot"],
});

/**==================================================
 * Chat window
 **/
Vue.component("chat", {
  template: ` <div class="chat">
        <section class="chat-messages" ref="messageholder">
          
          <chat-message v-for="msg in messages" :message="msg" />
         
        </section>
        
        <section class="chat-controls">
          <input v-model="currentInput" @keyup.enter="send" />
        </section>
      </div>`,

  watch: {
    messages() {
      console.log("MESSAGES UPDATES")
      let messageholderEl = this.$refs.messageholder
      // console.log(this.$refs, messageholderEl)
      Vue.nextTick(() => {
        messageholderEl.scrollTo({ top: messageholderEl.scrollHeight, behavior: 'smooth' })

      }) 
       
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
      currentInput: "",
    };
  },

  props: ["messages", "chatBots"],
});
