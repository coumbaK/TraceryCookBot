class BotSimulator {
  constructor(map, {post}) {
    this.map = map
    console.log("CREATING BOT", this.map.title)
    
    this.stateID = "origin"
    
    this.post = post
    
    this.enterState("origin")
    this.timeEnteredState = Date.now()
    this.timeInState = 0
    
    this.exitWatchers = []
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
    this.exitWatchers = []
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
    console.log(`New exit watcher for "${exit}"`)
    this.exit = exit
    this.bot = bot
    
    // Rudimentary parsing
    let [pre,post] = exit.split("->")
    console.log(pre, post)
  }
}