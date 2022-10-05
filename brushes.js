const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 400

// Current tool settings
let p // Processing object, accessible from anywhere
let color0 = [160, 100, 50]
let color1 = [320, 100, 50]
let size = 1

// Change this to whichever brush you are working on
const START_BRUSH_INDEX = 0

let brushes = [{
  label: "🖌",
  description: "basic paint brush",
  
  // Options: setup (when tool is selected), draw (every frame), 
  mouseDragged() {
    console.log("Drag...")
    let x = p.mouseX
     let y = p.mouseY
     console.log(x, y)
     
    
     p.fill(color0[0], color0[1], color0[2])
     p.circle(x, y, 100)
 }
}, {
  label: "😂",
  description: "laughcry paint brush",
  
  // Options: setup (when tool is selected), draw (every frame), 
  mouseDragged() {
    console.log("Drag...")
    let x = p.mouseX
     let y = p.mouseY
     console.log(x, y)
     
    
     p.fill(color0[0], color0[1], color0[2])
     p.text("😂", x, y)
 }
}, ]