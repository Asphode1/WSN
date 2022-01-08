import minNum from "./distances.js";

/**
 * Create weight adjacency matrix for WBG
 * @param {Array<Number>} s Array of sensors
 * @param {Number} S number of stationary sensor + 2
 * @returns {Number[]} graph
 */
export default function createWeight(s,S){
  var weight = new Array(S+2)
  for(let i=0;i<S+2;i++) weight[i] = new Array(S+2)
  for(let i=0;i<S+2;i++){
    for(let j=0;j<S+2;j++){
      weight[i][j] = minNum(s,i,j,S)
    }
  }
  return weight
}