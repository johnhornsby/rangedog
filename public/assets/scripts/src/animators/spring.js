
export default class SpringAnimator {
  
	constructor() {
		this.velocity = 0;
		this.tolerance = 1 / 100;
		this.stiffness = 50; //50
		this.damping = 1; //2
		this.mass = 0.2; //0.2
		this.value = 0;
	}
  
	step(delta) {
		const k = 0 - this.stiffness;
		const b = 0 - this.damping;

		const F_spring = k * ((this.value) - 1);
		const F_damper = b * (this.velocity);

		this.velocity += ((F_spring + F_damper) / this.mass) * delta;
		this.value += this.velocity * delta

		return this.value;
	}

	isFinished() {
		return (Math.round(this.velocity / this.tolerance) === 0 ) ? true: false;
	}
}