import createParent from '../GA/create.js'
import fitness from '../GA/fitness.js'
import selectParent from '../GA/parent.js'
import Population from '../GA/population.js'
import { Sensors } from '../init/init.js'

/**
 * update array throughout generations
 * @param {Array<Population>} arr Array of Population
 * @param {Population} p new child
 */
function update(arr, p) {
	var minFitness = arr[0]
	var index = 0
	for (let i = 1; i < arr.length; i++) {
		if (arr[i].fitness < minFitness.fitness) {
			minFitness = arr[i]
			index = i
		}
	}
	arr[index] = p
}

/**
 * get the child with the highest fitness
 * @param {Array<Population>} arr Array of population
 * @returns {Population} child
 */
function getBestChild(arr) {
	var max = arr[0].fitness
	var index = 0
	for (let i = 1; i < arr.length; i++) {
		if (max > arr[i].fitness) {
			max = arr[i].fitness
			index = i
		}
	}
	return arr[index]
}

/**
 * Genetic algorithm
 * @param {Array<Sensors>} arr array of sensors
 * @param {Number} s number of stationary sensors
 * @param {Number} m number of mobile sensors
 * @param {Number} A - sensing angle
 * @param {Number} R - sensing range
 * @param {Number} rate mutation rate
 * @param {Number} max_gen maximum generation
 * @returns Array of Population
 */
export default function ga(arr, s, m, A, R, rate, max_gen) {
	var parents = createParent(arr, s, m, A, R, rate)
	var count = 0
	while (count < max_gen && 1 /* fitness unchanged for 5 generations*/) {
		var [p1, p2] = selectParent(parents)
		var child = Population.mate(p1, p2, rate)
		child.fitness = fitness(arr, s, m, A, R)
		update(parents, child)
		count++
	}
	return parents
}

export { getBestChild }
