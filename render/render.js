import { A, H, L, N, R, Sensors, sensors } from '../src/init.js'
import greedy from '../algo/greedy.js'
import ga from '../algo/GA.js'
import sensorGraph from '../src/createGraph.js'

var canvas = document.querySelector('#cv')
canvas.width = L
canvas.height = H
canvas.style.width = '90vw'
canvas.style.height = (90 / L) * H + 'vw'
var ctx = canvas.getContext('2d')

function drawSensor(ctx, pos, r, beta, isFixed) {
	if (isFixed) {
		ctx.fillStyle = 'rgba(150,150,150,0.2)'
	} else ctx.fillStyle = '#fe445050'
	ctx.beginPath()
	ctx.moveTo(pos.x, pos.y)
	ctx.arc(pos.x, pos.y, r, beta + 2 * A, beta, true)
	ctx.fill()
}

/**
 * Render ROI
 * @param {CanvasRenderingContext2D} ctx - canvas renderer
 * @param {Array<Sensors>} s - list of sensors, default value = sensors
 */
function renderSensor(ctx, s = sensors) {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for (let i = 0; i < N; i++) {
		drawSensor(ctx, s[i].pos, R, s[i].beta, !s[i].isMobile)
	}
}
renderSensor(ctx)

var input = document.getElementById('init')
var list = document.getElementById('method')
var a = list.value
list.onchange = () => (a = list.value)
var err = document.querySelector('.error')
var output = document.querySelector('.output')
input.addEventListener('click', function () {
	switch (a) {
		case '1':
			var k = greedy(sensorGraph)
			output.innerHTML = 'k = ' + k
			break
		case '2':
			var k = ga(sensorGraph)
			console.log(k)
			break
		default:
			err.innerHTML = 'no methods found'
			console.log(a)
	}
})
