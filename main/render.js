import { H, L, sensors, mobileSensors, A, R } from '../src/init.js'

var canvas = document.querySelector('#cv')
canvas.width = L
canvas.height = H
canvas.style.width = '90vw'
canvas.style.height = (90 / L) * H + 'vw'
var ctx = canvas.getContext('2d')

function drawSensor(ctx, pos, r, beta, isFixed) {
	if (isFixed) {
		ctx.fillStyle = 'rgba(150,150,150,0.5)'
	} else ctx.fillStyle = '#fe445080'
	ctx.beginPath()
	ctx.moveTo(pos.x, pos.y)
	ctx.arc(pos.x, pos.y, r, beta - A, beta + A, true)
	ctx.fill()
}

function drawStationarySensor() {
	for (let i = 0; i < 100; i++) {
		drawSensor(ctx, sensors[i].pos, R, sensors[i].beta, true)
	}
}
drawStationarySensor()
for (let i = 0; i < 50; i++) {
  drawSensor(ctx, mobileSensors[i].pos, R, mobileSensors[i].beta, false)
}