import dat_1 from './dat/sensordat_1.js'
import dat_2 from './dat/sensordat_2.js'
import dat_3 from './dat/sensordat_3.js'
import dat_4 from './dat/sensordat_4.js'
import dat_5 from './dat/sensordat_5.js'
import dat_6 from './dat/sensordat_6.js'
import dat_7 from './dat/sensordat_7.js'
import dat_8 from './dat/sensordat_8.js'
import dat_9 from './dat/sensordat_9.js'
import dat_10 from './dat/sensordat_10.js'

export default function getDat(n) {
	switch (n) {
		case 1:
			return dat_1
      break
		case 2:
			return dat_2
      break
		case 3:
			return dat_3
      break
		case 4:
			return dat_4
      break
		case 5:
			return dat_5
      break
		case 6:
			return dat_6
      break
		case 7:
			return dat_7
      break
		case 8:
			return dat_8
      break
		case 9:
			return dat_9
      break
		case 10:
			return dat_10
      break
	}
}
