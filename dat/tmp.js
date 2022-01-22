import * as fs from 'fs'
var src = 'instance100.txt'
var dest = 'instance100.js'
var dat = []
fs.readFile(src,'utf-8',function(err,data){
  if(err) console.log(err)
  dat = data.split('\r\n')
})
var writeln = 'const dat = [\n'
for(let i=1;i<1501;i++){
  var nmb = dat[i].split(' ')
  console.log(nmb);
  writeln += '{\npos:{\nx:' + nmb[0] + ',\ny:' + nmb[1] + '\n},\nbeta:' + nmb[3]+',\n},\n'
}
writeln += ']'
fs.writeFile(dest,writeln,(err)=>{
  if(err) console.log(err)
  else console.log('done')
})