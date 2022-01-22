import fitness from "./fitness"

/**
 * Array prototype to randomly shuffle every elements in an array
 * @returns {Array} shuffled array
 */
Array.prototype.shuffle = function () {
	var l = this.length
	var arr = JSON.parse(JSON.stringify(this))
	for (let i = 0; i < l; i++) {
		var rnd = parseInt((Math.random() * (l - 1)).toFixed(0))
		var tmp = arr[i]
		arr[i] = arr[rnd]
		arr[rnd] = tmp
	}
	return arr
}
function randIn(start, end) {
	var n = end - start
	return parseInt((Math.random() * (n - 1) + start).toFixed(0))
}
export default class Population {
	/**
   * Class Population
   * @param {Number} n number of sensors
   */
  constructor(n) {
		this.length = n
		this.data = Array(n)
			.fill()
			.map((_, i) => i)
		this.index = Array(n).fill(0)
		this.fitness = 0
	}
  /**
   * randomize data and index
   * @param {Number} rate random rate for index
   */
	shuffle(rate) {
		this.data = this.data.shuffle()
		for (let i = 0; i < this.length; i++) {
			var rnd = Math.random()
			if (rnd < rate) this.index[i] = 1
		}
		this.index[this.length - 1] = 1
	}
  /**
   * mutation operation
   * @param {Number} rate mutation rate
   */
	mutation(rate) {
		var rnd = Math.random()
		if (rnd <= rate / 2) {
			var rnd1 = parseInt((Math.random() * (this.length - 1)).toFixed(0))
			var rnd2 = parseInt((Math.random() * (this.length - 1)).toFixed(0))
			var tmp = this.data[rnd1]
			this.data[rnd1] = this.data[rnd2]
			this.data[rnd2] = tmp
		}
		if (rnd > rate / 2 && rnd <= rate) {
			var rndi = parseInt((Math.random() * (this.length - 1)).toFixed(0))
			if (this.index[rndi] === 1) this.index[rndi] = 0
			else this.index[rndi] = 1
		}
	}
	update(data, index) {
		this.data = JSON.parse(JSON.stringify(data))
		this.index = JSON.parse(JSON.stringify(index))
	}
  getMaxNum(){
    var count = 0
    for(let i=0;i<this.length;i++){
      if(this.index[i] === 1) count++
    }
    return count
  }
	/**
	 * Mating algorithm
	 * @param {Population} p1 parent 1
	 * @param {Population} p2 parent 2
	 * @return {Population} children
	 */
	static mate(p1, p2, rate) {
		var rnd = randIn(Math.floor(p1.length / 3), Math.ceil((p1.length * 2) / 3))
		console.log(rnd)
		var children = new Population(p1.length)
		var data = []
		var index = []
		var datatmp = []
		var indextmp = []
		for (let i = rnd; i < p1.length; i++) {
			datatmp.push(p1.data[i])
			indextmp.push(p1.index[i])
		}
		for (let i = 0; i < p1.length; i++) {
			if (!datatmp.includes(p2.data[i])) {
				data.push(p2.data[i])
				index.push(p2.index[i])
			}
		}
		index[index.length - 1] = 1
		data.push(...datatmp)
		index.push(...indextmp)
		index[index.length - 1] = 1
		children.update(data, index)
		children.mutation(rate)
		return children
	}
}
