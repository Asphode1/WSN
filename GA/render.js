import ga, { getBestChild } from '../algorithm/GA.js'
import { createSensor, PI } from '../init/init.js'
import getDat from '../dat/getDat.js'
import Population from './population.js'

const MAX_GENERATION = 1000
const MUTATION_RATE = 0.1
const L = 500
const H = 100

// init canvas data
var canvas = document.querySelector('#cv')
canvas.width = L * 10
canvas.height = H * 10
canvas.style.width = '90vw'
canvas.style.height = (90 / L) * H + 'vw'
var ctx = canvas.getContext('2d')

// init sensor data
var station = document.getElementById('station')
var mobile = document.getElementById('mobile')
var range = document.getElementById('range')
var angle = document.getElementById('angle')
var pack = document.getElementById('pack')
var S = parseInt(station.value),
	M = parseInt(mobile.value),
	R = parseInt(range.value),
	A = parseFloat(angle.value),
	P = parseInt(pack.value)
station.onchange = () => (S = parseInt(station.value))
mobile.onchange = () => (M = parseInt(mobile.value))
range.onchange = () => (R = parseInt(range.value))
angle.onchange = () => (A = parseFloat(angle.value))
pack.onchange = () => (P = parseInt(pack.value))

/**
 * render sensor in ROI
 * @param {CanvasRenderingContext2D} ctx canvas render
 * @param {Object} pos position of sensor
 * @param {Number} r sensor radius
 * @param {Number} beta sensor beta in radiant
 * @param {Number} alpha sensing angle
 * @param {boolean} isFixed sensor mobile or not
 */
function drawSensor(ctx, pos, r, beta, alpha, isFixed) {
	if (isFixed) {
		ctx.fillStyle = 'rgba(150,150,150,0.2)'
	} else ctx.fillStyle = '#fe445050'
	ctx.beginPath()
	ctx.moveTo(pos.x * 10, pos.y * 10)
	ctx.arc(pos.x * 10, pos.y * 10, r * 10, 2 * PI - beta - 2 * alpha, 2 * PI - beta, false)
	ctx.fill()
}

/**
 * Render ROI
 * @param {CanvasRenderingContext2D} ctx - canvas renderer
 * @param {Array<Sensors>} s - list of sensors
 * @param {Number} n - number of sensors
 * @param {Number} a - sensing angle
 * @param {Number} R - sensor radius
 */
function renderSensor(ctx, s, n, a, R) {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for (let i = 0; i < n; i++) {
		drawSensor(ctx, s[i].pos, R, s[i].beta, a, !s[i].isMobile)
	}
}

/**
 * create Population, render ROI
 * @param {Number} N number of sensors
 * @param {Number} M number of mobile sensors
 * @param {Number} dp data pack
 * @param {Number} A sensing angle
 * @param {Number} R sensing range
 * @returns {Population} Population
 */
function start(N, M, dp, A, R) {
	S = N - M
	console.log(N, M, dp, A, R)
	var dat = getDat(dp)
	var sensors = createSensor(dat, S, M, A)
	renderSensor(ctx, sensors, N, A, R)
	var parents = ga(sensors, S, M, A, R, MUTATION_RATE, MAX_GENERATION)
	return parents
}

var input = document.getElementById('init')
var output = document.querySelector('.output')
var reset = document.getElementById('reset')
var time = document.querySelector('.time')
// reset button
reset.addEventListener('click', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	time.innerHTML = ''
	output.innerHTML = ''
})
// start button
input.addEventListener('click', function () {
	var startTime = performance.now()
	var parents = start(S + M, M, P, A, R)
	var child = getBestChild(parents)
	var k = child.fitness
	var endTime = performance.now()
	output.innerHTML = 'k = ' + k
	time.innerHTML = 'Time using = ' + (endTime - startTime).toFixed(2) + 'ms' + '<br/>'
})
