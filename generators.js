const GENERATORS = {
  
  circle: {
    description:
      "circle makes circles.",
    sliders: ["size", "aspectRatio", "angle", "hue", "brightness"],
    landmarks: {
      golfball: [0.04,0.38,0.80,0.06,0.64],
      basketball: [0.27,0.74,0.04,0.64,0.35],
    },
    setup(p) {},
    
    drawBackground(p) {
      p.background(0, 50, 50)
    },

    draw(p, t, dna) {
      let x = 0;
      let y = 0;
      
      // How to access DNA
      let size = dna[0] // 0-1
      size = size*30 + 10
      p.fill(100)
      p.circle(0, 0, size)
    }
  },


  rectangle: {
    description:
      "A very basic and boring generator satisfying the requirements. Control various properties of a rectangle.",
    sliders: ["size", "aspectRatio", "angle", "hue", "brightness"],

    setup(p) {},

    draw(p, t, dna) {
      let x = 0;
      let y = 0;

      let size = dna[0] * 60 + 40;
      let aspectRatio = dna[1] + 0.6;
      let angle = dna[2] - 0.5;

      // How about a little bounce at least?
      // let bounce = Math.abs(Math.sin(t * 3));
      // aspectRatio += 0.2 + -0.5 * bounce;
      // let stickiness = 0.2;
      // let jumpHeight = 40;
      // y -= Math.max(
      //   0,
      //   jumpHeight * (Math.abs(Math.sin(t * 3 + 0.2)) - stickiness)
      // );
      // angle = p.lerp(0, angle, bounce);

      let w = size * aspectRatio;
      let h = size * (1 / aspectRatio);

      let hue = dna[3] * 360;
      let brightness = dna[4] * 40 + 40;

      p.push();

      // move the rectangle
      p.translate(x, y);
      p.rotate(angle);

      p.fill(hue, 100, brightness);
      p.stroke(hue, 100, brightness + 30);
      p.rect(-w / 2, 0, w, -h);

      // Steal this eyecode!
      // eyes!
      let eyeWidth = w * 0.3;
      let eyeHeight = h * 0.5;
      let eyeSize = 10;
      let eyeColor = [hue, 100, brightness + 20];

      // Only two eyes....?
      // drawEye(p, {
      //   x: eyeWidth,
      //   y: -eyeHeight,
      //   eyeSize: eyeSize,
      //   innerColor: eyeColor,
      // });
      // drawEye(p, {
      //   x: -eyeWidth,
      //   y: -eyeHeight,
      //   eyeSize: eyeSize,
      //   innerColor: eyeColor,
      // });

      p.pop();
    },
  },
  
  fish: {
    description: "Fish made with polar coordinates",
    sliders: [
      "size",
      "complexity",
      "deformation",
      "hue",
      "hueOffset",
      "lumps",
      "streamline",
    ],
    landmarks: {
      durian: [1.0, 1.0, 0.04, 0.18, 0.35, 0.31, 0.34],
      pepita: [0.14, 0.68, 0.04, 0.38, 0.8, 0.06, 0.64],
      leaf: [0.68, 0.1, 1.0, 0.34, 0.8, 1.0, 0.0],
      cherry: [0.68, 0.23, 0.76, 0.01, 0.16, 0.18, 0.21],
    },
    setup(p) {},

    drawBackground(p, t) {
     
      p.background(240, 30, 60)
      
      p.noStroke()
     
      
      for (var j = 0; j < 5; j++) {
         p.fill(170 + j*10, 70, 40, .3)
        p.beginShape()
        let y = 100
        p.vertex(0, 0)
        p.vertex(0, 0)
        p.vertex(0, y)
        // Ripply vertices
        let waveCount = 10
        for (var i = 0; i < waveCount; i++) {
          let x = (i + .5)*(p.width/waveCount)
          let y2 = y + 100*p.noise( i, t + j*10)
          p.curveVertex(x, y2)
        }
        p.vertex(p.width, y)
        p.vertex(p.width, 0)
        p.vertex(p.width, 0)
        p.endShape()
      }
    },
    
    draw(p, t, dna, index) {
      p.push();

      // Move the fish around a bit

      p.translate(0, -100 + 100 * p.noise(0.2 + t + index));
      p.rotate(1 * p.noise(0.3 * t + index) - 0.5);

      let fishSize = dna[0] * 20 + 10;

      let pointCount = dna[1] * 20 + 3;

      let deformation = dna[2];

      let hue = dna[3];
      let hueOffset = dna[4] - 0.5;
      let lumps = dna[5];
      let streamline = dna[6];

      // Make the point on the body
      let bodyPoint = (r, theta, index) => {
        // Make every other point lumpy

        r *= 1 + lumps * (index % 2);
        let bp = Vector2D.polar(r, theta);

        // Use noise to offset each point
        let defR = 0.2 * r * deformation;
        let scale = 0.1;
        let defTheta = 20 * p.noise((bp[0] * scale, bp[1] * scale + t * 0.3));

        // Sweep the body back
        bp[0] += 1.5 * streamline * Math.abs(bp[1]);
        bp.addPolar(defR, defTheta);
        return bp;
      };

      // Draw a blobby shape, actually draw 3 shapes on top of each other
      for (var i = 0; i < 3; i++) {
        let size = fishSize * (1 - i * 0.2);
        p.fill(((hue + 0.2 * i * hueOffset) % 1) * 360, 100, 50 - i * 10, 1);
        p.beginShape();
        for (var j = 0; j < pointCount + 2; j++) {
          // get the point on this body
          let theta = (j * Math.PI * 2) / pointCount;
          let bp = bodyPoint(size, theta, j);
          p.curveVertex(...bp);
        }

        p.endShape();
      }

      // Draw an eye
      p.push();
      p.translate(-fishSize * 0.5, -fishSize * 0.4);
      p.fill(0);
      p.circle(0, 0, 4);
      p.fill(80);
      p.circle(1, 1.8, 1);
      p.fill(100);
      p.circle(0.5, -1.5, 2);
      p.pop();

      p.pop();
    },
  },
};
