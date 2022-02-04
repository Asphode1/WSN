// default value for ROI
const L = 500 // x-axis
const H = 100 // y-axis
const PI = Math.PI

class Sensors {
	constructor(pos, beta, A, isMobile) {
		this.pos = {
			x: pos.x,
			y: pos.y,
		}
		this.beta = beta - A
		this.isMobile = isMobile
	}
}
/**
 * create array of sensors
 * @param {Array} dat sensor data
 * @param {Number} S number of stationary sensor
 * @param {Number} M number of mobile sensor
 * @param {Number} A sensing angle
 * @returns {Array<Sensors>} Array of sensors
 */
function createSensor(dat, S, M, A) {
	var sensors = new Array(S + M)
	for (let i = 0; i < S; i++) {
		sensors[i] = new Sensors(dat[i].pos, dat[i].beta, A, false)
	}
	for (let i = 0; i < M; i++) {
		sensors[i + S] = new Sensors(dat[i + S].pos, dat[i + S].beta, A, true)
	}
	return sensors
}
export { L, H, PI, Sensors, createSensor }
