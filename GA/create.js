import { Sensors } from '../init/init.js'
import fitness from './fitness.js'
import Population from './population.js'

const POPULATION_SIZE = 1000
/**
 * create array of population
 * @param {Array<Sensors>} arr array of sensors
 * @param {Number} n number of vertices
 * @param {Number} m number of mobile sensors
 * @param {Number} rate mutation rate
 * @returns {Array<Population>} array of population
 */
export default function createParent(arr, n, m, rate) {
	var parents = new Array(POPULATION_SIZE)
	for (let i = 0; i < POPULATION_SIZE; i++) {
		parents[i] = new Population(n)
		parents[i].shuffle(rate)
		parents[i].fitness = fitness(arr, n, m)
	}
	return parents
}
