const PI = Math.PI
// default value for ROI
const L = 5000 // x-axis
const H = 1000 // y-axis
// dafault value for sensors
const A = PI / 4 // half the sensing angle
const R = 15 // sensor radius
const largestRange = 0 <= A && A <= PI / 2 ? Math.max(R, 2 * R * Math.sin(A)) : 2 * R

class Sensors {
	constructor(pos, beta, isMobile) {
		this.pos = {
			x: pos.x * 10,
			y: pos.y * 10,
		}
		this.beta = ((beta - A) / 180) * PI
		this.isMobile = isMobile
	}
}
/**
 * create array of sensors
 * @param {Array} dat sensor data
 * @param {Number} S number of stationary sensor
 * @param {Number} M number of mobile sensor
 * @returns {Array<Sensors>} Array of sensor 
 */
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

/**
 * create array of mobile sensors
 * @param {Array} dat sensor data
 * @param {Number} S number of stationary sensor
 * @param {Number} M number of mobile sensor
 * @returns {Array<Sensors>} Array of mobile sensor 
 */
function createMobileSensors(dat, S, M) {
	var sensors = new Array(M)
	for (let i = 0; i < M; i++) {
		sensors[i] = new Sensors(dat[i + S].pos, dat[i + S].beta, true)
	}
	return sensors
}
export { L, H, PI, A, R, largestRange, Sensors, createSensor, createMobileSensors }
