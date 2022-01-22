import minNum from '../init/distances.js'
import { L, largestRange, Sensors } from '../init/init.js'

const LIM = Math.ceil(L / largestRange)

/**
 * calculate fitness, as fitness = number of barriers created
 * @param {Array<Sensors>} arr array of sensors
 * @param {Number} n number of stationary sensors
 * @param {Number} m number of mobile sensors
 */
export default function fitness(arr, n, m) {
	var k = 0
	var left = m
	var barriers = []
	let i = 0
	while (i < this.length) {
		var barrier = []
		if (this.index[i] === 0) {
			barrier.push(i)
			i++
		} else if (this.index[i] === 1) {
			barrier.push(i)
			barriers.push(barrier)
			i++
		}
	}
	var totalCost = 0
	for (let barrier of barriers) {
		var cost = minNum(arr, 0, barrier[0] + 1, n)
		for (let i = 0; i < barrier.length - 1; i++) {
			cost += minNum(arr, barrier[i] + 1, barrier[i + 1] + 1, n)
		}
		cost += minNum(arr, barrier[barrier.length - 1] + 1, n + 1, n)
		if (cost <= left) {
			k++
			totalCost += cost
			left -= cost
		}
	}
	return k + Math.floor((m - totalCost) / LIM)
}
