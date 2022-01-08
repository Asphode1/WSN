const CHAR = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	' ',
]
const NAME = 'Mai Trung Kien'
function randIn(start, end) {
	return Math.floor(Math.random() * (end - start + 1)) + start
}
const L = NAME.length
var match = Array(L).fill(0)
function fitness(str1, str2) {
	var l = str1.length
	var fitness = 0
	for (let i = 0; i < l; i++) {
		if (str1[i] !== str2[i]) fitness++
	}
	return fitness
}
function mutation() {   
	var l = CHAR.length
	var r = randIn(0, l - 1)
	return CHAR[r]
}
function generate() {
	var parent = ''
	for (let i = 0; i < L; i++) {
		parent += mutation()
	}
	return parent
}
