const GENERATORS = {
  rectangle: {
    description: "A very basic and boring generator satisfying the requirements",
    sliders: [{
      label: "aspectRatio",
    },{
      label: "size",
    }, {
      label: "rotation",
    }, {
      label: "hue",
    }, {
      label: "brightness",
    }],
    
    setup(p) {
      
    },
    
    draw(p, t, dna) {
      let size = dna[0]*60 + 20
      let aspectRatio = dna[1] + .6
      
      // How about a little bounce at least?
      let bounce = Math.abs(Math.sin(t*3))
      aspectRatio += -.2*bounce
      
      let w = size*aspectRatio
      let h = size*(1/aspectRatio)
     
      
      let hue = dna[3]*360
      let brightness = dna[4]*40 + 40
      p.fill(hue, 100, brightness)
      p.stroke(hue, 100, brightness + 30)
       p.rect(-w/2, 0, w, -h)
      
      // eyes!
      let eyeWidth = w*.5
      let eyeHeight = h*.5
      p.fill(100)
      p.push()
      p.translate(eyeWidth, eyeHeight)
      p.ellipse(0, )
      p.pop()
    }
  }
  
  
  
}