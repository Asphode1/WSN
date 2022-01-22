import ga, { getBestChild } from '../algorithm/GA.js'
import { createSensor } from '../init/init.js'

const MUTAION_RATE = 0.1
const L = 5000
const H = 1000
const N = 100

var canvas = document.querySelector('#cv')
canvas.width = L
canvas.height = H
canvas.style.width = '90vw'
canvas.style.height = (90 / L) * H + 'vw'
var ctx = canvas.getContext('2d')
var total = document.getElementById('total')
var mobile = document.getElementById('mobile')
var M = 10,
	S = N - M
total.onchange = () => (N = parseInt(total.value))
mobile.onchange = () => (M = parseInt(mobile.value))
var pack = document.getElementById('pack')
var datPack = 10
pack.onchange = () => (datPack = parseInt(pack.value))

/**
 * render sensor in ROI
 * @param {CanvasRenderingContext2D} ctx canvas render
 * @param {Object} pos position of sensor
 * @param {Number} r sensor radius
 * @param {Number} beta sensor beta in radiant
 * @param {boolean} isFixed sensor mobile or not
 */
function drawSensor(ctx, pos, r, beta, isFixed) {
	if (isFixed) {
		ctx.fillStyle = 'rgba(150,150,150,0.2)'
	} else ctx.fillStyle = '#fe445050'
	ctx.beginPath()
	ctx.moveTo(pos.x, pos.y)
	ctx.arc(pos.x, pos.y, r, 2 * PI - beta - 2 * A, 2 * PI - beta, false)
	ctx.fill()
}

/**
 * Render ROI
 * @param {CanvasRenderingContext2D} ctx - canvas renderer
 * @param {Array<Sensors>} s - list of sensors, default value = sensors
 */
function renderSensor(ctx, s, n) {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for (let i = 0; i < n; i++) {
		drawSensor(ctx, s[i].pos, R, s[i].beta, !s[i].isMobile)
	}
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
	var sensors = createSensor(dat, 1000, 500)
	var parents = ga(sensors, N, M, MUTAION_RATE)
	var child = getBestChild(parents)
	var k = child.fitness
	var endTime = performance.now()
	output.innerHTML = 'k = ' + k
	time.innerHTML += 'Time using = ' + (endTime - startTime).toFixed(2) + 'ms' + '<br/>'
})
