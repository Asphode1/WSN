import WBG from '../init/graph.js'
import { L, largestRange } from '../init/init.js'

const LIM = Math.ceil(L / largestRange)
/**
 * Greedy Algorithm for Max-Num-Barrier Problem
 * @param {WBG} graph - the WBG of the ROI
 * @param {Number} S - number of stationay sensor
 * @param {Number} M - number of mobile sensor
 * @returns {Number} maximum number of barriers possible
 */
export default function greedy(graph, S, M) {
	var passed = []
	var q = 0
	var totalCost = 0
	while (true) {
		if (graph.checkPath(0, S + 1)) {
			var [path, cost] = graph.dijkstra(0, S + 1)
			if (cost < LIM) {
				if (totalCost + cost < M) {
					q++
					path.shift()
					path.pop()
					for (let i of path) {
						passed.push(i)
					}
					totalCost += cost
					graph.removePath(path)
				} else if (totalCost + cost === M) {
					return q + 1
				} else return q
			} else return q + Math.floor((M - totalCost) / LIM)
		} else return q + Math.floor((M - totalCost) / LIM)
	}
}
