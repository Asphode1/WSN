import { PI, L, S, R, sensors, A, Sensors, N, largestRange } from './init.js'

class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

function calcPointCircle(pos, beta, alpha, r) {
	var x1 = pos.x + r * Math.cos(beta)
	var y1 = pos.y + r * Math.sin(beta)
	var x2 = pos.x + r * Math.cos(beta + 2 * alpha)
	var y2 = pos.y + r * Math.sin(beta + 2 * alpha)
	return [x1, y1, x2, y2]
}
/**
 * calculate distance of 2 Points in Euclidean plane
 * @param {Point} u
 * @param {Point} v
 * @returns Euclidean distance between u and v
 */
function dist(u, v) {
	return Math.sqrt((u.x - v.x) ** 2 + (u.y - v.y) ** 2)
}

function getCenter([p1, p2, p3]) {
	return new Point((p1.x + p2.x + p3.x) / 3, (p1.x + p2.x + p3.x) / 3)
}
function getPoint(p) {
	var p1 = new Point(p.pos.x, p.pos.y)
	var pos2 = calcPointCircle(p.pos, p.beta, A, R)
	var p2 = new Point(pos2[0], pos2[1])
	var p3 = new Point(pos2[2], pos2[3])
	return [p1, p2, p3]
}

function checkObtuse(p1, [p2, p3]) {
	var d1 = dist(p1, p2)
	var d2 = dist(p2, p3)
	var d3 = dist(p1, p3)
	return d1 ** 2 + d2 ** 2 - d3 ** 2 < 0 || d2 ** 2 + d3 ** 2 - d1 ** 2 < 0
}

function pointToLine(p, u, v) {
	var d1 = dist(u, v)
	if (d1 === 0) return dist(p, u)
	var t = ((p.x - u.x) * (v.x - u.x) + (p.y - u.y) * (v.y - u.y)) / (d1 * d1)
	t = Math.max(0, Math.min(1, t))
	var d = dist(p, { x: u.x + t * (v.x - u.x), y: u.y + t * (v.y - u.y) })
	if (checkObtuse(p, [u, v])) return Math.min(dist(p, u), dist(p, v))
	return d
}
/* 
  set of functions to check if 2 line segments are intersect
  source: https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
*/
function onSegment(p, q, r) {
	if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
		return true
	return false
}

function orientation(p, q, r) {
	let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)
	if (val == 0) return 0
	return val > 0 ? 1 : 2
}

/**
 * Function to check if 2 line segments are intersect in an Oxy plane
 * @param {Object} p1 - point 1 of line 1
 * @param {Object} q1 - point 2 of line 2
 * @param {Object} p2 - point 1 of line 2
 * @param {Object} q2 - point 2 of line 2
 * @returns Bolean value
 */

function checkIntersect(p1, q1, p2, q2) {
	let o1 = orientation(p1, q1, p2)
	let o2 = orientation(p1, q1, q2)
	let o3 = orientation(p2, q2, p1)
	let o4 = orientation(p2, q2, q1)
	if (o1 != o2 && o3 != o4) return true
	if (o1 == 0 && onSegment(p1, p2, q1)) return true
	if (o2 == 0 && onSegment(p1, q2, q1)) return true
	if (o3 == 0 && onSegment(p2, p1, q2)) return true
	if (o4 == 0 && onSegment(p2, q1, q2)) return true
	return false
}
// end set

function checklineArcIntersect(p1, l1, l2) {
	// find a,c | ax - y + c = 0
	var a = (l1.y - l2.y) / (l1.x - l2.x)
	var c = l1.y - a * l1.x
	var b = -1
	var t1 = Math.atan(b / a) + Math.acos(-(a * p1.pos.x + b * p1.pos.y + c) / R / Math.sqrt(a * a + b * b))
	var t2 = Math.atan(b / a) - Math.acos(-(a * p1.pos.x + b * p1.pos.y + c) / R / Math.sqrt(a * a + b * b))
	if ((p1.beta <= t1 && t1 <= p1.beta + 2 * A) || (p1.beta <= t2 && t2 <= p1.beta + 2 * A)) return true
	return false
}

function checkArcIntersect(p1, p2) {
	if (dist(p1.pos, p2.pos) - 2 * R > 0) return false
	else if (dist(p1.pos, p2.pos) - 2 * R <= 0) {
		var [a1, a2] = [getPoint(p1)[1], getPoint(p1)[2]]
		if (checkIntersect(a1, a2, p1.pos, p2.pos)) return true
	}
	return false
}

// function to check if 2 sensors are overlap
/**
 *
 * @param {Sensors} s1 - sensor 1
 * @param {Sensors} s2 - sensor 2
 * @returns Bolean value
 */
function checkSensorOverlap(s1, s2) {
	var [s1p1, s1p2, s1p3] = getPoint(s1)
	var [s2p1, s2p2, s2p3] = getPoint(s2)
	return (
		checkIntersect(s1p1, s1p2, s2p1, s2p2) ||
		checkIntersect(s1p1, s1p3, s2p1, s2p3) ||
		checkIntersect(s1p1, s1p2, s2p1, s2p3) ||
		checkIntersect(s1p1, s1p3, s2p1, s2p1) ||
		checklineArcIntersect(s1, s2p1, s2p2) ||
		checklineArcIntersect(s2, s1p1, s1p2) ||
		checklineArcIntersect(s1, s2p1, s2p3) ||
		checklineArcIntersect(s2, s1p1, s1p3) ||
		checkArcIntersect(s1, s2)
	)
}

// functions to calculate distance of 2 sensor

function calcX(s1) {
	var [a1, a2, a3] = getPoint(s1)
	if (s1.beta > PI / 2 && s1.beta < PI) return [a1.x - R, a1.x]
	if (s1.beta < 2 * PI && s1.beta > (PI * 3) / 2) return [a1.x, a1.x + R]
	return [Math.min(a1.x, a2.x, a3.x), Math.max(a1.x, a2.x, a3.x)]
}
function calcY(s1) {
	var [a1, a2, a3] = getPoint(s1)
	return [Math.min(a1.y, a2.y, a3.y), Math.max(a1.y, a2.y, a3.y)]
}

/**
 * calculate weak distance of 2 sensors
 * @param {Number} vi - index of 1st Sensor
 * @param {Number} vj - index of 2nd Sensor
 * @returns weak distance of 2 sensors
 */
function weakDist(vi, vj) {
	if (vi === 0) {
		var vjx = calcX(sensors[vj - 1])[0]
		if (vjx <= 0) return 0
		else return vjx
	} else if (vj === 0) {
		var vix = calcX(sensors[vi - 1])[0]
		if (vix <= 0) return 0
		else return vix
	} else if (vi === S + 1) {
		var vjx = calcX(sensors[vj - 1])[1]
		if (vjx >= L) return 0
		else return L - vjx
	} else if (vj === S + 1) {
		var vix = calcX(sensors[vi - 1])[1]
		if (vix >= L) return 0
		else return L - vix
	} else {
		var [x11, x12] = calcX(sensors[vi - 1])
		var [x21, x22] = calcX(sensors[vj - 1])
		if (x12 < x21) return x21 - x12
		if (x11 > x22) return x11 - x22
		if ((x11 < x21 && x21 < x12) || (x11 < x22 && x22 < x12)) return 0
		if ((x11 < x21 && x22 < x12) || (x21 < x11 && x12 < x22)) return 0
	}
}

function minPointDist(a1, a2) {
	var min = dist(a1[0], a2[0])
	for (let i of a1) {
		for (let j of a2) {
			if (min > dist(i, j)) min = dist(i, j)
		}
	}
	return min
}

function arcDist(s1, s2) {
	var p1 = getPoint(s1)
	var p2 = getPoint(s2)
	if (checkIntersect(p1[0], p2[0], p1[1], p1[2]) && checkIntersect(p1[0], p2[0], p2[1], p2[2]))
		return dist(p1[0], p2[0]) - 2 * R
	return Infinity
}

function lineArcDist(s1, s2) {
	var p1 = getPoint(s1)
	var min = Infinity
	var gamma1 = [s1.beta + PI / 2, s1.beta - PI / 2, s1.beta + 2 * A + PI / 2, s1.beta + 2 * A - PI / 2]
	for (let i of gamma1) {
		if (s2.beta < i && i < s2.beta + 2 * A) {
			var [x, y] = [s2.pos.x + R * Math.cos(i), s2.pos.y + R * Math.sin(i)]
			if (checkObtuse({ x: x, y: y }, [p1[0], p1[1]])) min = pointToLine({ x: x, y: y }, p1[0], p1[1])
			if (checkObtuse({ x: x, y: y }, [p1[0], p1[2]]))
				min = pointToLine({ x: x, y: y }, p1[0], p1[2]) < min ? pointToLine({ x: x, y: y }, p1[0], p1[2]) : min
		}
	}
	return min
}

function getAngle(q, p) {
	var p1 = {
		x: q.x - p.x,
		y: q.y - p.y,
	}
	var p2 = {
		x: 1,
		y: 0,
	}
	var a = Math.acos((p1.x * p2.x + p1.y * p2.y) / (Math.sqrt(p1.x ** 2 + p1.y ** 2) + Math.sqrt(p2.x ** 2 + p2.y ** 2)))
	if (p1.y > 0) return PI * 2 - a
	return a
}

function pointArcDist(p, s) {
	var ps = getPoint(s)
	if (dist(p, ps[0]) <= R) return Infinity
	if (s.beta < getAngle(p, ps[0]) && getAngle(p, ps[0]) < s.beta + 2 * A) return dist(p, ps[0]) - R
	return Infinity
}

/**
 * calculate strong distance of 2 sensors
 * @param {Number} vi - index of 1st Sensor
 * @param {Number} vj - index of 2nd Sensor
 * @returns strong distance of 2 sensors
 */
function strongDist(vi, vj) {
	if (vi === vj) return 0
	else if (vi === 0 || vj === 0 || vi === S + 1 || vj === S + 1) return weakDist(vi, vj)
	else if (checkSensorOverlap(sensors[vi - 1], sensors[vj - 1])) return 0
	else {
		var p1 = getPoint(sensors[vi - 1])
		var p2 = getPoint(sensors[vj - 1])
		var min = Math.min(
			minPointDist(p1, p2),
			arcDist(sensors[vi - 1], sensors[vj - 1]),
			lineArcDist(sensors[vi - 1], sensors[vj - 1]),
			lineArcDist(sensors[vj - 1], sensors[vi - 1]),
			pointArcDist(p1[0], sensors[vj - 1]),
			pointArcDist(p1[1], sensors[vj - 1]),
			pointArcDist(p1[2], sensors[vj - 1]),
			pointArcDist(p2[0], sensors[vi - 1]),
			pointArcDist(p2[1], sensors[vi - 1]),
			pointArcDist(p2[2], sensors[vi - 1]),
			pointToLine(p1[0], p2[0], p2[1]),
			pointToLine(p1[0], p2[0], p2[2]),
			pointToLine(p1[1], p2[0], p2[1]),
			pointToLine(p1[1], p2[0], p2[2]),
			pointToLine(p1[2], p2[0], p2[1]),
			pointToLine(p1[2], p2[0], p2[2]),
			pointToLine(p2[0], p1[0], p1[1]),
			pointToLine(p2[0], p1[0], p1[2]),
			pointToLine(p2[1], p1[0], p1[1]),
			pointToLine(p2[1], p1[0], p1[2]),
			pointToLine(p2[2], p1[0], p1[1]),
			pointToLine(p2[2], p1[0], p1[2])
		)
		return min
	}
}

/**
 * calculate minimum number of sensors need to form a barrier between 2 sensors
 * @param {Number} vi - index of 1st Sensor
 * @param {Number} vj - index of 2nd Sensor
 * @returns number of sensors
 */
function minNum(vi, vj) {
	return Math.ceil(strongDist(vi, vj) / largestRange)
}

export { weakDist, strongDist, dist, getCenter }
export default minNum
