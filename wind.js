/* globals Vector2D, Particle, ParticleSystem, p */

class WindSystem extends ParticleSystem {
  constructor() {
    // Make wind particles
    super(WindParticle, 100);
    this.windScale = 0.001;
  }

  getWindAt(x, y) {
    let windTheta = 10 * p.noise(x * this.windScale, y * this.windScale);
    let windSpeed = 10;
    return Vector2D.polar(windSpeed, windTheta);
  }
}

class WindParticle extends Particle {
  constructor(ps, index) {
    super(ps, index);

    // Put these particles somewhere randomly on screen
    this.pos.setToRandom(
      -p.width / 2,
      p.width / 2,
      -p.height / 2,
      p.height / 2
    ); // Set to a random (x0,x1,y0,y1)
    this.v.setTo(0, 100);

    // Store a wind force so we can visualize it
    this.windForce = new Vector2D();
  }

  calculateForces(p, dt) {
    let t = p.millis() * 0.001;

    // Apply some "drag" by making the velocity smaller
    this.v.mult(0.99);

    this.f.add(0, 40);

    //     Different "wander forces"

    let windX = this.ps.windScale * this.pos[0];
    let windY = this.ps.windScale * this.pos[1];

    // Which way to go?
    // Set the wind from just the time (note how they synchronize)
    let windDir = 20 * p.noise(t * 0.1);

    // These use both their *idNumber* (each particle gets a unique number on "birth")
    // and the time.  Now they each have their own "journey"
    windDir = 20 * p.noise(t * 0.1, this.idNumber);

    // Set the wind from their positions
    // But if they have the same position, eventually
    // they clump up
    // windDir = 20*p.noise(windX, windY)

    // If we do *both*, they clump less!
    // windDir = 20*p.noise(windX, windY, t*.1)

    this.windForce.setToPolar(100, windDir);
    this.f.add(this.windForce);
  }

  move(p, dt) {
    // Call the original move function
    super.move(p, dt);

    this.pos.wrapY(-p.height / 2, p.height / 2);
    this.pos.wrapX(-p.width / 2, p.width / 2);
  }

  draw(p, drawDebug = false) {
    let t = p.millis() * 0.001;

    p.fill(100);
    p.circle(...this.pos, 1);

    p.push();
    p.translate(...this.pos);
    p.rotate(this.v.angle);
    p.fill(
      10 + 70 * p.noise(this.idNumber),
      100 + 30 * p.noise(this.idNumber + t + 50),
      30 + 30 * p.noise(this.idNumber + t + 100)
    );

    let leafWidth = 6 * p.noise(this.idNumber + t);
    let leafLength = 20
    p.beginShape();
    p.vertex(0, 0);
    p.vertex(0, 0);
    p.curveVertex(leafWidth, -leafWidth);
    p.vertex(20, 0);
    p.curveVertex(leafWidth, leafWidth);
    p.vertex(0, 0);
    p.vertex(0, 0);
    p.endShape();
    p.pop();

    if (drawDebug) {
      this.pos.drawArrow(p, this.windForce, { m: 0.2 });
    }
  }
}
