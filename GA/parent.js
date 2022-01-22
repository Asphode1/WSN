import Population from "./population.js";

/**
 * select 2 parents for mating
 * @param {Array<Population>} arr array of population
 * @returns {Array<Population>} 2 parents
 */
export default function selectParent(arr){
  var indexes = Array(arr.length).fill().map((_,i) => i)
  var rnd1 = parseInt((Math.random() * (indexes.length - 1)).toFixed(0))
  indexes = indexes.filter(i => i!== rnd1)
  var rnd2 = parseInt((Math.random() * (indexes.length - 1)).toFixed(0))
  indexes = indexes.filter(i => i!== rnd2)
  var rnd3 = parseInt((Math.random() * (indexes.length - 1)).toFixed(0))
  indexes = indexes.filter(i => i!== rnd3)
  var rnd4 = parseInt((Math.random() * (indexes.length - 1)).toFixed(0))
  var p1,p2
  if(arr[rnd1].fitness > arr[rnd2].fitness) p1 = arr[rnd1]
  else p1 = arr[rnd2]
  if(arr[rnd3].fitness > arr[rnd3].fitness) p2 = arr[rnd3]
  else p2 = arr[rnd4]
  return [p1,p2]
}