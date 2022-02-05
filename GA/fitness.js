import minNum from '../init/distances.js'
import { L, Sensors, PI } from '../init/init.js'

/**
 * calculate fitness, as fitness = number of barriers created
 * @param {Array<Sensors>} arr array of sensors
 * @param {Number} s number of stationary sensors
 * @param {Number} m number of mobile sensors
 * @param {Number} A sensing angle
 * @param {Number} R sensing range
 */
export default function fitness(arr, s, m, A, R) {
	var largestRange
	if (0 <= A && A <= PI / 2) largestRange = Math.max(R, 2 * R * Math.sin(A))
	else largestRange = 2 * R
	const LIM = Math.ceil(L / largestRange)
	var k = 0
	var left = m
	var barriers = []
	let i = 0
	while (i < barriers.length) {
		var barrier = []
		if (barriers.index[i] === 0) {
			barrier.push(i)
			i++
		} else if (barriers.index[i] === 1) {
			barrier.push(i)
			barriers.push(barrier)
			i++
		}
	}
	var totalCost = 0
	for (let barrier of barriers) {
		var cost = minNum(arr, 0, barrier[0] + 1, s, A, R)
		for (let i = 0; i < barrier.length - 1; i++) {
			cost += minNum(arr, barrier[i] + 1, barrier[i + 1] + 1, s, A, R)
		}
		cost += minNum(arr, barrier[barrier.length - 1] + 1, s + 1, s, A, R)
		if (cost <= left) {
			k++
			totalCost += cost
			left -= cost
		}
	}
	return k + Math.floor((m - totalCost) / LIM)
}
