

/* globals polarCoord, addMultiple, addPolar */

class ParticleSystem {
  constructor() {
    console.log("I made a particlesystem");

    this.particles = [];

    for (var i = 0; i < 10; i++) {
      let pt = new Particle();

      this.particles.push(pt);
    }

    console.log("I have", this.particles.length, "particles");
    console.log(this.particles);
  }

  update(p, dt) {
    this.particles.forEach((pt, index) => {
      pt.update(p, dt);
    });
  }

  draw(p) {
    p.stroke(150, 100, 50);
    p.noFill();
    p.circle(0, 0, 200);

    // Maps, filters, for each
    this.particles.forEach((pt, index) => {
      pt.draw(p);
    });
  }
}

let particleCount = 0

class Particle {
  constructor() {
    this.idNumber = particleCount++
    console.log("I made a particle!");
    let r = Math.random() ** 0.5 * 100;
    this.drag = 0.01

    this.pos = polarCoord(r, Math.random() * 6.26);

    let initialSpeed = 10;
    this.v = polarCoord(initialSpeed, Math.random() * 6.26);
    // this.f = [0,10] // Kinda gravity
  }

  // How to update particle
  update(p, dt) {
    //      Reset forces
    let gravity = 10;
    this.f = [0, gravity]; //
    
    // How far outside of the range is this particle?
    let range = 100
    let outOfRange = Math.max(0, this.pos.magnitude() - range)
    
    let boundaryForce = -1*boundaryForce.magnitude;
    addMultiple(this.f, boundaryForce, this.pos);

    //      wiggle force
    let r = 400;
    let theta = 20 * p.noise(dt * 1);
    addPolar(this.f, r, theta);

    addMultiple(this.pos, dt, this.v);
    addMultiple(this.v, dt, this.f);
    
//     Fake drag
    if (this.drag)
      this.v.mult(1 - this.drag)
  }

  // How to draw particle

  draw(p) {
    p.fill(100);
    p.noStroke();
    // p.circle(this.pos[0], this.pos[1], 10)
    p.circle(...this.pos, 3);
    this.pos.drawArrow(p, this.v, { color: [100, 100, 50], m: 1 });
    // let m = 10
    // p.stroke(0)
    // p.line(this.pos[0], this.pos[1], this.pos[0] + this.v[0]*m, this.pos[1] + this.v[1]*m)
    // p.stroke(20, 100, 50)
    // p.line(this.pos[0], this.pos[1], this.pos[0] + this.f[0]*m, this.pos[1] + this.f[1]*m)
    p.fill(0);
    p.text(this.pos.magnitude().toFixed(), ...this.pos);
  }
}
