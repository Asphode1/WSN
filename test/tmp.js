import greedy from '../algorithm/greedy.js'
import getDat from '../dat/getDat.js'
import createWeight from '../init/createGraph.js'
import WBG from '../init/graph.js'
import { createSensor, H, L, PI, Sensors } from '../init/init.js'

const S = 5
const M = 2
const P = 1
const A = 0.8
const R = 5
function start(N, M, dp, A, R) {
	console.log(N, M, dp, A, R)
	var dat = getDat(dp)
	var sensors = createSensor(dat, S, M, A)
	var weight = createWeight(sensors, S, A, R)
	var sensorGraph = new WBG(S + 2, weight)
	return sensorGraph
}
var sensors = start(S + M, M, P, A, R)
var k = greedy(sensors, S, M, A, R)
console.log(k)
