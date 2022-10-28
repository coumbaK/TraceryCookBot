let botCount = 0

class BotSimulator {
  constructor(mapID, map, {onPost}) {
    this.idNumber = botCount++
    this.map = map
    this.mapID = mapID
    
    console.log("CREATING BOT", this.map.title)
    
    this.stateID = "origin"
    
    this.exitWatchers = []
    this.onPost = onPost
    
    this.enterState("origin")
    this.timeEnteredState = Date.now()
    this.timeInState = 0
    
    this.grammar = tracery.createGrammar(this.map.grammar)
    
  }
  
  setState(stateID) {
    // TODO: should do any actions?
    this.enterState(stateID)
  }
  
  expand(rule) {
    if (Array.isArray(rule)) {
      rule = getRandom(rule)
    }
    
    return this.grammar.flatten(rule)
    // return rule
  }
  
  post(msg) {
    this.onPost(msg)
    if (typeof msg === "string") {
      msg = {
        type: "chat",
        from: this.id,
        
      }
    }
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
  
  hasState(stateID) {
    console.log(this.map.states, stateID)
    return this.map.states[stateID] !== undefined
  }
  
  enterState(stateID) {
    this.stateID = stateID
    if (!this.hasState(stateID)) {
      this.post({
        type: "error",
        text: `No state named '${stateID}'`
        
      })
      return
    }
    
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
      let conditions = pre.split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g);
   
      
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

