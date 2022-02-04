import minNum from "./distances.js";
import { Sensors } from "./init.js";

/**
 * Create weight adjacency matrix for WBG
 * @param {Array<Sensors>} s Array of sensors
 * @param {Number} S number of stationary sensor
 * @param {Number} A - sensing angle
 * @param {Number} R - sensing range
 * @returns {Array<Number[]>} graph
 */
export default function createWeight(s,S,A,R){
  var weight = new Array(S+2)
  for(let i=0;i<S+2;i++) weight[i] = new Array(S+2)
  for(let i=0;i<S+2;i++){
    for(let j=0;j<S+2;j++){
      weight[i][j] = minNum(s,i,j,S,A,R)
    }
  }
  return weight
}