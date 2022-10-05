const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 400

// Current tool settings
let color0 = []
let color1 = []
let size = 1

// Change this to whichever brush you are working on
const START_BRUSH_INDEX = 0

let brushes = [{
  label: "🖌",
  description: "basic paint brush",
  draw(p, t) {
    
  }
}]