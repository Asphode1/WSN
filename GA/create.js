import { Sensors } from '../init/init.js'
import fitness from './fitness.js'
import Population from './population.js'

const POPULATION_SIZE = 1000
/**
 * create array of population
 * @param {Array<Sensors>} arr array of sensors
 * @param {Number} s number of stationary sensors
 * @param {Number} m number of mobile sensors
 * @param {Number} A - sensing angle
 * @param {Number} R - sensing range
 * @param {Number} rate mutation rate
 * @returns {Array<Population>} array of population
 */
export default function createParent(arr, s, m, A, R, rate) {
	var parents = new Array(POPULATION_SIZE)
	for (let i = 0; i < POPULATION_SIZE; i++) {
		parents[i] = new Population(s)
		parents[i].shuffle(rate)
		parents[i].fitness = fitness(arr, s, m, A, R)
	}
	return parents
}
