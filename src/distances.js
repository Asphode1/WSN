import { L,S,sensors } from './init.js'

function euclide(vi,vj){
  //calculate euclidean distance between vi and vj
}

function weakDist(vi, vj) {
  if(vi === 0){
    if(sensors[vj].pos.x > sensors[vj].radius) return sensors[vj].pos.x - sensors[vj].radius
    else return 0
  }
  else if(vj === 0){
    if(sensors[vi].pos.x > sensors[vi].radius) return sensors[vi].pos.x - sensors[vi].radius
    else return 0
  }
  else if(vi === S+2){
    if(1){
    }
  }
}
function strongDist(vi,vj){
  if(vi === 0 || vj === 0 || vi === S+2 || vj === S+2) return weakDist(vi,vj)
  else if(/*overlap*/1) return 0
  else return euclide(vi,vj)
}
