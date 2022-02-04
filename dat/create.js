import * as fs from 'fs'

const L = 500
const H = 100
const MAX_SENSOR = 400
const NUM = 10
const PI_2 = Math.PI * 2

var write = 'const dat_'+ NUM + '= [\n'
var path = './dat/dat/sensordat_' + NUM + '.js'
for (let i = 0; i < MAX_SENSOR; i++) {
	var rx = (Math.random() * L).toFixed(4)
	var ry = (Math.random() * H).toFixed(4)
	var rb = (Math.random() * PI_2).toFixed(4)
	write += '{\npos: {\nx:' + rx + ',\ny:' + ry + ',\n},\nbeta:' + rb + '\n},\n'
}
write += ']\nexport default dat'
fs.writeFile(path, write, (err) => {
	if (err) console.log(err)
})
