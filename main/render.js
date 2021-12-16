import { H, L, sensors } from '../src/init.js'

var canvas = document.querySelector('#cv')
canvas.width = L
canvas.height = H
canvas.style.width = '90vw'
canvas.style.height = (90 / L) * H + 'vw'
var ctx = canvas.getContext('2d')

var color = ['#fe445080', '#5a758980', '#50e68780']

function drawSensor(ctx, pos, r, direction, isFixed) {
	if (isFixed) {
		ctx.fillStyle = 'rgba(150,150,150,0.5)'
	} else ctx.fillStyle = '#fe445080'
	ctx.beginPath()
	ctx.moveTo(pos.x, pos.y)
	ctx.arc(
		pos.x,
		pos.y,
		r,
		direction.beta - direction.alpha,
		direction.beta + direction.alpha,
		false
	)
	ctx.fill()
}

for (let i = 0; i < 100; i++) {
	drawSensor(ctx, sensors[i].pos, sensors[i].radius, sensors[i].direction, true)
}
