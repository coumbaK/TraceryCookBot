const GENERATORS = {
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
      palm: [0.4, 0.5, 0.1, 0.5],
      pine: [0.4, 0.5, 0.1, 0.5],
      oak: [0.4, 0.5, 0.1, 0.5],
      willow: [0.4, 0.5, 0.1, 0.5],
    },
    setup(p) {},

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
};
