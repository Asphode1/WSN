import dat11 from './js/data_100_10.js'
import dat12 from './js/data_100_20.js'
import dat13 from './js/data_100_30.js'
import dat14 from './js/data_100_40.js'
import dat15 from './js/data_100_50.js'
import dat21 from './js/data_200_10.js'
import dat22 from './js/data_200_20.js'
import dat23 from './js/data_200_30.js'
import dat24 from './js/data_200_40.js'
import dat25 from './js/data_200_50.js'
import dat51 from './js/data_500_10.js'
import dat52 from './js/data_500_20.js'
import dat53 from './js/data_500_30.js'
import dat54 from './js/data_500_40.js'
import dat55 from './js/data_500_50.js'
import dat01 from './js/data_1000_10.js'
import dat02 from './js/data_1000_20.js'
import dat03 from './js/data_1000_30.js'
import dat04 from './js/data_1000_40.js'
import dat05 from './js/data_1000_50.js'

export default function getDat(t, m) {
	var dat = []
  var sum = t+m
	switch (sum) {
		case 110: {
			dat = JSON.parse(JSON.stringify(dat11))
			break
		}
		case 120: {
			dat = JSON.parse(JSON.stringify(dat12))
			break
		}
		case 130: {
			dat = JSON.parse(JSON.stringify(dat13))
			break
		}
		case 140: {
			dat = JSON.parse(JSON.stringify(dat14))
			break
		}
		case 150: {
			dat = JSON.parse(JSON.stringify(dat15))
			break
		}
		case 210: {
			dat = JSON.parse(JSON.stringify(dat21))
			break
		}
		case 220: {
			dat = JSON.parse(JSON.stringify(dat22))
			break
		}
		case 230: {
			dat = JSON.parse(JSON.stringify(dat23))
			break
		}
		case 240: {
			dat = JSON.parse(JSON.stringify(dat24))
			break
		}
		case 250: {
			dat = JSON.parse(JSON.stringify(dat25))
			break
		}
		case 510: {
			dat = JSON.parse(JSON.stringify(dat51))
			break
		}
		case 520: {
			dat = JSON.parse(JSON.stringify(dat52))
			break
		}
		case 530: {
			dat = JSON.parse(JSON.stringify(dat53))
			break
		}
		case 540: {
			dat = JSON.parse(JSON.stringify(dat54))
			break
		}
		case 550: {
			dat = JSON.parse(JSON.stringify(dat55))
			break
		}
		case 1010: {
			dat = JSON.parse(JSON.stringify(dat01))
			break
		}
		case 1020: {
			dat = JSON.parse(JSON.stringify(dat02))
			break
		}
		case 1030: {
			dat = JSON.parse(JSON.stringify(dat03))
			break
		}
		case 1040: {
			dat = JSON.parse(JSON.stringify(dat04))
			break
		}
		case 1050: {
			dat = JSON.parse(JSON.stringify(dat05))
			break
		}
	}
  return dat
}