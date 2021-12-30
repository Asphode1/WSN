import WBG from '../src/graph.js'
import { L, largestRange, M, S } from '../src/init.js'

const LIM = Math.ceil(L / largestRange)

/**
 * Greedy Algorithm for Max-Num-Barrier Problem
 * @param {WBG} graph - the WBG of the ROI
 * @returns maximum number of barriers possible
 */
export default function greedy(graph) {
	var passed = []
	var path = []
	var q = 0
	while (true) {
		if (graph.checkPath(0, S + 1)) {
			path = graph.dijkstra(0, S + 1)
			if (path.length < LIM) {
				if (passed.length + path.length < M) {
					q++
					path.shift()
					path.pop()
					for (let i of path) {
						passed.push(i)
					}
					graph.removePath(path)
				} else if (passed.length + path.length === M) {
					return q + 1
				} else return q
			} else return q + Math.floor((M - passed.length) / LIM)
		} else return q + Math.floor((M - passed.length) / LIM)
	}
}
