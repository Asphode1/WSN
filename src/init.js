import s from '../dat/dat.js'

const PI = Math.PI
// default value for ROI
const L = 10000 // x-axis
const H = 2000 // y-axis
// dafault value for sensors
const S = 100 // number of stationary sensors
const M = 50 // number of mobile sensors
const N = S + M
const A = PI / 4 // half the sensing angle
const R = 400 // sensor radius
const largestRange = 0 <= A && A <= PI / 2 ? Math.max(R, 2 * R * Math.sin(A)) : 2 * R

class Sensors {
	constructor(pos, beta, isMobile) {
		this.pos = {
			x: pos.x,
			y: pos.y,
		}
		this.beta = beta - A
		this.isMobile = isMobile
	}
}
var sensors = new Array(S)
for (let i = 0; i < S; i++) {
	sensors[i] = new Sensors(s[i].pos, s[i].beta, false)
}
for (let i = 0; i < M; i++) {
	sensors[i + S] = new Sensors(s[i + S].pos, s[i + S].beta, true)
}
var mobileSensors = []
for (let i = 0; i < M; i++) {
	mobileSensors[i] = new Sensors(s[i + S].pos, s[i + S].beta, true)
}
export { L, H, S, M, PI, A, R, N, largestRange, sensors, Sensors, mobileSensors }
