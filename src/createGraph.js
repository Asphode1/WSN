import minNum from "./distances.js";
import Graph from "./graph.js";
import { S } from "./init.js";

function createEdge(){
  var edge = new Array(S+2)
  for(let i=0;i<S+2;i++) edge[i] = new Array(S+2)
  for(let i=0;i<S+2;i++){
    for(let j=0;j<S+2;j++){
      edge[i][j] = minNum(i,j)
    }
  }
  return edge
}
var edge = createEdge()
var sensorGraph = new Graph(S+2,edge,false)
export default sensorGraph
function checkIsNaN(graph){
  for(let i of graph){
    for(let j of i){
      if(Number.isNaN(j)) return false
    }
  }
  return true
}
console.log(edge[1]);