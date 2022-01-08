import { dist,getCenter,getPoint,Point,strongDist } from "../src/distances.js"
import { Sensors,sensors,largestRange } from "../src/init.js"
import WBG from '../src/graph.js'
/**
 * find the nearest sensor
 * @param {Array<Sensors>} sensor - mobile sensors
 * @param {Point} pos - position
 * @returns index of the nearest sensor
 */
function findNearest(sensor,pos){
  var minDist = dist(sensor[0].pos,pos)
  var index = 0
  for(let i=0;i<sensor.length;i++){
    if(minDist < dist(sensor[i].pos,pos)) {
      minDist = dist(sensor[i].pos,pos)
      index = i
    }
  }
  return i
}
/**
 * get position of sensors to form barrier between s1 and s2
 * @param {Sensors} s1 - sensor 1
 * @param {Sensors} s2 - sensor 2
 * @param {Number} num - number of sensor needed to form a barrier between s2,s2
 * @return array of positions
 */
function getPos(s1,s2,num){
  var p1 = getCenter(getPoint(s1))
  var p2 = getCenter(getPoint(s2))
  var d = dist(p1,p2)
  var l = d/num
  if(l<=largestRange){
    
  }
}
/**
 * move mobile sensors to make barrier
 * @param {Array<Number>} path - array of path found by dijkstra algorithm
 * @param {Array<Sensors>} sensor - mobile sensors
 * @param {WBG} wbg - weighed barrier graph
 */
export default function moveSensor(path,sensor,wbg){
  var dist = []
  for(let i=0;i<path.length - 1;i++){
    dist.push(wbg.weight[path[i]][path[i+1]])
  }
  for(let i=0;i<dist.length;i++){
    
  }
}