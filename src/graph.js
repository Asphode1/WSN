export default class Graph {
	constructor(v, edge = [[]], isDirected) {
		this.isDirected = isDirected
		this.vertex = v
		this.edge = edge
	}
	addEdge(v1, v2) {
		if (this.isDirected) {
			this.edge[v1][v2] = 1
		} else {
			this.edge[v1][v2] = 1
			this.edge[v2][v1] = 1
		}
	}
	recurDFS(v, visited = [], path = []) {
		visited[v] = true
		path.push(v)
		for (let i = 0; i < this.vertex; i++) {
			let n = this.edge[v][i]
			if (!visited[i] && n !== 0) this.recurDFS(i, visited, path)
		}
	}
	DFS(v) {
		var path = []
		let visited = new Array(this.vertex)
		for (let i = 0; i < this.vertex; i++) visited[i] = false
		this.recurDFS(v, visited, path)
		return path
	}
	BFS(v) {
		var visited = new Array(this.vertex)
		for (let i = 0; i < this.vertex; i++) visited[i] = false
		var path = []
		visited[v] = true
		var queue = []
		queue.push(v)
		while (queue.length > 0) {
			var s = queue.shift()
			path.push(s)
			for (let i = 0; i < this.vertex; i++) {
				let n = this.edge[s][i]
				if (n !== 0 && !visited[i]) {
					queue.push(i)
					visited[i] = true
				}
			}
		}
		return path
	}
	findPathRecurDFS(s, t, visited = [], before = []) {
		visited[t] = true
		if (s !== t) {
			for (let i = 0; i < this.vertex; i++) {
				let n = this.edge[i][t]
				if (!visited[i] && n !== 0) {
					before[t] = i
					var check = this.findPathRecurDFS(s, i, visited, before)
					if (check) return 1
				}
			}
		} else return 1
	}
	findPathDFS(s, t) {
		var visited = new Array(this.vertex)
		var before = new Array(this.vertex)
		var connected = false
		for (let i = 0; i < this.vertex; i++) {
			if (this.edge[i][t] !== 0) {
				connected = true
				break
			}
		}
		if (!connected) return
		for (let i = 0; i < this.vertex; i++) visited[i] = false
		this.findPathRecurDFS(s, t, visited, before)
		var tmp = s
		var path = []
		path.push(s)
		while (tmp !== t) {
			path.push(before.indexOf(tmp))
			tmp = before.indexOf(tmp)
		}
		return path
	}
	findLT() {
		var visited = new Array(this.vertex)
		for (let i = 0; i < visited.length; i++) visited[i] = false
		var count = 0
		while (visited.includes(false)) {
			var a = visited.indexOf(false)
			this.recurDFS(a, visited, [])
			count++
		}
		return count
	}
}
