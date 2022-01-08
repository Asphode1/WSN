import ga from '../algo/GA.js'
import greedy from '../algo/greedy.js'
import getDat from '../dat/getDat.js'
import createWeight from '../init/createGraph.js'
import WBG from '../init/graph.js'
import { A, createMobileSensors, createSensor, H, L, PI, R, Sensors } from '../init/init.js'

var canvas = document.querySelector('#cv')
canvas.width = L
canvas.height = H
canvas.style.width = '90vw'
canvas.style.height = (90 / L) * H + 'vw'
var ctx = canvas.getContext('2d')
var total = document.getElementById('total')
var mobile = document.getElementById('mobile')
var N = 100,
	M = 10,
	S = N - M
total.onchange = () => (N = parseInt(total.value))
mobile.onchange = () => (M = parseInt(mobile.value))
function start(N, M) {
	S = N - M
	console.log(N, M)
	var dat = getDat(N, M)
	var sensors = createSensor(dat, S, M)
	var mobileSensors = createMobileSensors(dat, S, M)
	var weight = createWeight(sensors, S)
	var sensorGraph = new WBG(S + 2, weight)
	renderSensor(ctx, sensors, N)
	return sensorGraph
}

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
reset.addEventListener('click', () => {
	sensorGraph.resetGraph()
	ctx.clearRect(0, 0, canvas.width, canvas.height)
})
input.addEventListener('click', function () {
	var sensorGraph = start(N, M)
	S = N - M
	var k = greedy(sensorGraph, S, M)
  console.log(S,M)
  console.log(sensorGraph);
	output.innerHTML = 'k = ' + k 
})
