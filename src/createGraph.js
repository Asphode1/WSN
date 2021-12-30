import minNum from "./distances.js";
import WBG from "./graph.js";
import { S } from "./init.js";

/**
 * Create weight adjacency matrix for WBG
 * @returns graph
 */
function createWeight(){
  var weight = new Array(S+2)
  for(let i=0;i<S+2;i++) weight[i] = new Array(S+2)
  for(let i=0;i<S+2;i++){
    for(let j=0;j<S+2;j++){
      weight[i][j] = minNum(i,j)
    }
  }
  return weight
}
var weight = createWeight()
var sensorGraph = new WBG(S+2,weight)
export default sensorGraph