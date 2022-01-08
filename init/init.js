const PI = Math.PI
// default value for ROI
const L = 10000 // x-axis
const H = 1000 // y-axis
// dafault value for sensors
const A = PI / 4 // half the sensing angle
const R = 100 // sensor radius
const largestRange = 0 <= A && A <= PI / 2 ? Math.max(R, 2 * R * Math.sin(A)) : 2 * R

class Sensors {
	constructor(pos, beta, isMobile) {
		this.pos = {
			x: pos.y,
			y: pos.x,
		}
		this.beta = beta - A
		this.isMobile = isMobile
	}
}

function createSensor(dat, S, M) {
	var sensors = new Array(S + M)
	for (let i = 0; i < S; i++) {
		sensors[i] = new Sensors(dat[i].pos, dat[i].beta, false)
	}
	for (let i = 0; i < M; i++) {
		sensors[i + S] = new Sensors(dat[i + S].pos, dat[i + S].beta, true)
	}
	return sensors
}
function createMobileSensors(dat, S, M) {
	var sensors = new Array(M)
	for (let i = 0; i < M; i++) {
		sensors[i] = new Sensors(dat[i + S].pos, dat[i + S].beta, true)
	}
	return sensors
}
export { L, H, PI, A, R, largestRange, Sensors, createSensor, createMobileSensors }
