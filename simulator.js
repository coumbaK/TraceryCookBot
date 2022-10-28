class BotSimulator {
  constructor(map) {
    this.map = map
    console.log("CREATING BOT", this.map.title)
    
    this.stateID = origin
    
    this.enterState("origin")
    this.timeEnteredState = Date.now()
    this.timeInState = 0
  }
  
  update(time) {
    this.timeInState = time - this.timeEnteredState
    
  }
  
  enterState(stateID) {
    this.timeEnteredState = Date.now()
    console.log("Entering state", stateID)
  }
}