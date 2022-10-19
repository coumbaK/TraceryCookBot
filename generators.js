const GENERATORS = {
  rectangle: {
    description:
      "A very basic and boring generator satisfying the requirements",
    sliders: [
      {
        label: "aspectRatio",
      },
      {
        label: "size",
      },
      {
        label: "rotation",
      },
      {
        label: "hue",
      },
      {
        label: "brightness",
      },
    ],

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
