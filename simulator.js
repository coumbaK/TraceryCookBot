class BotSimulator {
  constructor(map, {post}) {
    this.map = map
    console.log("CREATING BOT", this.map.title)
    
    this.stateID = "origin"
    
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
    
  }
  
  enterState(stateID) {
    this.timeEnteredState = Date.now()
    console.log("Entering state", stateID)
  }
  
  get state() {
    return this.map.states[this.stateID]
  }
}

function getRandom(arr) {
  return arr[(Math.floor(Math.random()*arr.length))]
}