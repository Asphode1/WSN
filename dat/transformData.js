import * as fs from 'fs'

var num1 = ['100', '200', '500', '1000']
var num2 = ['10', '20', '30', '40', '50']

function read(source, i) {
	var write = ''
	var datArray = []
	fs.readFileSync(source, 'utf-8', function (err, data) {
		if (err) {
			console.log(err)
		}
		datArray = data.split('\r\n')
	})
	for (let k = 0; k < parseInt(i); k++) {
    console.log(datArray);
		/* var numbers = datArray[k].split(' ')
		write = write.concat('{\npos:\nx:', numbers[0], ',\ny:', numbers[1], '\n},\nbeta:', numbers[2], '\n},')
	 */}
	return write
}

function write(dest, write) {
	fs.writeFile(dest, write, (err) => {
		if (err) {
			console.log(err)
		} else console.log('Written successfully')
	})
}
var i = num1[0],
	j = num2[0]
var source = './dat/txt/data_' + i + '_' + j + '.txt'
var dest = './dat/js/data_' + i + '_' + j + '.js'
var writeln =
	'const S = ' +
	(parseInt(i) - parseInt(j)) +
	'\nconst M = ' +
	parseInt(j) +
	'\nexport {S,M}\nexport default dat = [\n' +
	read(source, i)
write(dest, writeln)
/* fs.readFile('./dat/txt/data_100_10.txt','utf-8',(err,dat)=>{
  if(err) console.log(err)
  var data = dat.split('\r\n')
  for(let k=0;k<10;k++){
    var dat = data[k].split(' ')
    console.log(dat[2]);
  };
})
*/
