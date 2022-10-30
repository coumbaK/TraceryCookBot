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
    this.currentTime = 0
    
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
  
  get id() {
    return "Bot" + this.mapID + this.idNumber
  }
  
  get cooldownPct() {
    if (this.cooldown)
      return (this.time - this.cooldown.start)
  }
  
  post(msg, type = "chat") {
    
//     Add a cooldown
    this.cooldown =  {
      start:  this.currentTime,
      length : (msg.length*.1 + 1)*(this.map.postingRate || 1)
    }
    
    if (typeof msg === "string") {
      msg = {
        type: type,
        fromType: "bot",
        from: this.id,
        text: msg
      }
    }
    this.onPost(msg)
    
  }
  
  update(time) {
    /**
    * Time has passed.... see if there are any exits opened or closed
    */
    
    this.currentTime = time
    this.timeInState = this.currentTime - this.timeEnteredState
    
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
    
//     Handle missing states
    if (!this.hasState(stateID)) {
      this.post(`No state named '${stateID}'`, "error")
        
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
      // regex from...stack overflow?
      let conditions = pre.split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g).filter(s=>s.length > 0);
   
      
      let [to,...actions] = post.trim().split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g).filter(s=>s.length > 0);
     
      this.to = to
      this.conditions = conditions.map(c => {
        return {template: c, isActive: false}
      })
      this.actions = actions.map(c => {
        return {template: c, isActive: false}
      })
    }
    
   
  }
}

