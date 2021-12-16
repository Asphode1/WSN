import s from './pos.js'

const PI = Math.PI
// default value for ROI
const L = 10000 // x-axis
const H = 2000 // y-axis
// dafault value for sensors
const S = 100 // number of stationary sensors
const M = 50 // number of mobile sensors
/* const largestRange = 0 <= A && A <= PI / 2 ? Math.max(R, 2 * R * Math.sin(A)) : 2 * R */
// weighted barrier graph G = (V,E,W)
var graphOfEdge = new Array(S + 2)
for (let i = 0; i < graphOfEdge.length; i++) graphOfEdge[i] = new Array(S + 2)
// Class of stationary sensors
class Sensors {
	constructor(pos, radius, direction, isMobile) {
		this.pos = {
			x: parseInt(pos.x.toFixed(2) * 100),
			y: parseInt(pos.y.toFixed(2) * 100),
		}
		this.radius = parseInt(radius.toFixed(2) * 150)
		this.direction = {
			alpha: parseFloat(((direction.alpha / 180) * PI).toFixed(2)),
			beta: parseFloat(((direction.beta / 180) * PI).toFixed(2)),
		}
		this.largestRange =
			0 <= this.direction.alpha && this.direction.alpha <= PI / 2
				? Math.max(this.radius, 2 * this.radius * Math.sin(this.direction.alpha))
				: 2 * this.radius
		this.isMobile = isMobile
	}
}
var sensors = new Array(S)
var mobileSensors = new Array(M)
for (let i = 0; i < S; i++) {
	sensors[i] = new Sensors(s[i].pos, s[i].radius, s[i].direction, false)
}
for (let i = 0; i < M; i++) {
	mobileSensors[i] = new Sensors(s[i + 100].pos, s[i + 100].radius, s[i + 100].direction, true)
}
console.log(mobileSensors)
export { L, H, S, M, PI, sensors, Sensors }
