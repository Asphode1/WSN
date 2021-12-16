/**
 * calculate position of sensors for area coverage
 * @param {number} w - x-axis
 * @param {number} h - y-axis
 * @param {number} r - Sensor radius
 * @returns {Array} Position of sensors
 */
export default function getHexCenterPoint(w, h, r) {
	var list = []
	var i = 0
	const INDEX = (r / 2) * Math.sqrt(3)
	var yOld = r / 2,
		zOld = (r / 2) * Math.sqrt(3),
		z1 = INDEX
	while (w - yOld >= 0) {
		if (w - yOld >= r && w - yOld <= (3 / 2) * r) {
			yOld = w
		}
		while (h - zOld >= 0) {
			if (h - zOld <= 2 * INDEX) {
				list.push({ y: yOld, z: zOld })
				i++
				if (h - zOld >= INDEX) {
					list.push({ y: yOld, z: h })
					i++
				}
				yOld += (r * 3) / 2
				break
			} else {
				list.push({ y: yOld, z: zOld })
				zOld += 2 * INDEX
				i++
			}
		}
		if (z1 == 0) z1 = INDEX
		else z1 = 0
		zOld = z1
	}
	return list
}
var pos = getHexCenterPoint(2000, 1200, 200)
console.log(pos)
