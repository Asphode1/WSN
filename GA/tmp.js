class P{
  constructor(a,b){
    this.a = a
    this.b = b
  }
}
function change(p){
  p.a = 1
  p.b = 1
}
let p = new P(2,2)
change(p)
console.log(p.a,p.b)