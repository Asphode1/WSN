import ga, { getBestChild } from '../algorithm/GA.js'
import { createSensor, PI } from '../init/init.js'
import getDat from '../dat/getDat.js'
import Population from '../GA/population.js'

const MAX_GENERATION = 1000
const MUTATION_RATE = 0.1
const S = 5
const M = 2
const P = 1
const A = 0.8
const R = 5
function start(N, M, dp, A, R) {
	console.log(N, M, dp, A, R)
	var dat = getDat(dp)
	var sensors = createSensor(dat, S, M, A)
	var parents = ga(sensors, S, M, A, R, MUTATION_RATE, MAX_GENERATION)
	return parents
}
var parents = start(S + M, M, P, A, R)
var child = getBestChild(parents)
var k = child.fitness
console.log(k)
