class BotSimulator {
  constructor(map, {post}) {
    this.map = map
    console.log("CREATING BOT", this.map.title)
    
    this.stateID = "origin"
    
    this.exitWatchers = []
    this.post = post
    
    this.enterState("origin")
    this.timeEnteredState = Date.now()
    this.timeInState = 0
    
    
  }
  
  expand(rule) {
    if (Array.isArray(rule)) {
      rule = getRandom(rule)
    }
    return rule
  }
  
  update(time) {
    this.timeInState = time - this.timeEnteredState
    
    if (this.state.onTickSay) {
      this.post(this.expand(this.state.onTickSay))
    }
    
    this.checkExits()    
  }
  
  checkExits() {
    
  }
  
  enterState(stateID) {
    this.timeEnteredState = Date.now()
    console.log("Entering state", stateID)
    
    // Set up all the exit watchers
    this.exitWatchers.splice(0, this.exitWatchers.length)
    // Add them all for this state
    // Also add any global exits
    if (this.map.exits)
      this.map.exits.forEach(ex => {
        this.exitWatchers.push(new ExitWatcher(this, ex))
      })
    if (this.state.exits)
      this.state.exits.forEach(ex => {
        this.exitWatchers.push(new ExitWatcher(this, ex))
      })
    
    console.log("MADE EXIT WATCHERS", this.exitWatchers)
  }
  
  get state() {
    return this.map.states[this.stateID]
  }
}

function getRandom(arr) {
  return arr[(Math.floor(Math.random()*arr.length))]
}

class ExitWatcher {
  constructor(bot, exit) {
    console.log(`****New exit watcher for "${exit}"`)
    this.exit = exit
    this.conditions = []
    this.actions = []
    this.errors = []
    // this.bot = bot
    
    // Rudimentary parsing
    let [pre,post] = exit.split("->")
    if (post == undefined) {
      this.errors.push(`Can't parse '${this.exit}', missing "->"?`)
      
    } else {
       let conditions = pre.trim().split(/\s+/);
      let [to,...actions] = post.trim().split(/\s+/);
     
      this.to = to
      this.conditions = conditions.map(c => {
        return {template: c, isActive: false}
      })
      this.actions = this.actions = conditions.map(c => {
        return {template: c, isActive: false}
      })
    }
    
   
  }
}

