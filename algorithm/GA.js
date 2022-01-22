import createParent from '../GA/create.js'
import fitness from '../GA/fitness.js'
import selectParent from '../GA/parent.js'
import Population from '../GA/population.js'
import { Sensors } from '../init/init.js'

const MAX_GENERATION = 1000

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
  arr[i] = p
}

/**
 * get the child with the highest fitness
 * @param {Array<Population>} arr Array of population
 * @returns {Population} child
 */
function getBestChild(arr){
  return arr.reduce((a,b) => Math.max(a.fitness,b.fitness))
}

/**
 * Genetic algorithm
 * @param {Array<Sensors>} arr array of sensors
 * @param {Number} n number of stationary sensors
 * @param {Number} m number of mobile sensors
 * @param {Number} rate mutation rate
 * @returns Array of Population
 */
export default function ga(arr, n, m, rate) {
	var parents = createParent(arr,n, rate)
	var count = 0
	while (count < MAX_GENERATION && 1 /* fitness unchanged for 5 generations*/) {
    var [p1,p2] = selectParent(parents)
    var child = Population.mate(p1,p2,rate)
    child.fitness = fitness(arr,n,m)
    update(parents,child)
  }
  return parents
}

export {getBestChild}