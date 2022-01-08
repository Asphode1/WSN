export default class WBG {
	/**
	 * Class for Weighed Barrier Graph
	 * @param {Number} v - number of vertices
	 * @param {Array<Array<Number>>} weight - weighed graph
	 */
	constructor(v, weight) {
		this.vertex = v
		this.weight = weight
		var edge = new Array(this.vertex)
		for (let i = 0; i < this.vertex; i++) {
      edge[i] = new Array(this.vertex).fill(1)
      edge[i][i] = 0
		}
		this.edge = edge
	}
	addEdge(v1, v2) {
		this.edge[v1][v2] = 1
		this.edge[v2][v1] = 1
	}
	removeEdge(v1, v2) {
		this.edge[v1][v2] = 0
		this.edge[v2][v1] = 0
	}
  /**
   * remove all edges incident to the vertices in a path
   * @param {Array<Number>} p : the path that needs removing 
   */
	removePath(p) {
    for(let i=0;i<p.length;i++){
      for(let j=0;j<this.vertex;j++) this.edge[p[i]][j] = 0
    }
	}
  /**
   * reset graph to the beginning
   */
  resetGraph(){
    var edge = new Array(this.vertex)
		for (let i = 0; i < this.vertex; i++) {
      edge[i] = new Array(this.vertex).fill(1)
      edge[i][i] = 0
		}
		this.edge = edge
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
		visited = []
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
  /**
   * Check if there is a path from s to t
   * @param {Number} s - sources Node
   * @param {Number} t - target Node
   * @returns bolean
   */
	checkPath(s, t) {
		var visited = Array(this.vertex).fill(false)
		let queue = []
		visited[s] = true
		queue.push(s)
		while (queue.length > 0) {
			var n = queue.shift()
			if (n === t) {
				return true
			}
			for (let i = 0; i < this.vertex; i++) {
				if (visited[i] === false && this.edge[n][i] === 1) {
					queue.push(i)
					visited[i] = true
				}
			}
		}
		return false
	}
	/* findPathRecurDFS(s, t, visited = [], before = []) {
		visited[t] = true
		if (s !== t) {
			for (let i = 0; i < this.vertex; i++) {
				let n = this.edge[i][t]
				if (!visited[i] && n !== 0) {
					before[t] = i
					var check = this.findPathRecurDFS(s, i, visited, before)
					return check
				}
				return 0
			}
		}
		return 1
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
	} */
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
  /**
   * Dijkstra Algorithm to find the shortest path from a node to another node
   * @param {Number} s - source Node
   * @param {Number} t - target Node
   * @returns shortest Path from source Node to target node
   */
	dijkstra(s, t) {
		var dist = Array(this.vertex).fill(Infinity)
		dist[s] = 0
		var prev = []
		var set = Array(this.vertex)
			.fill()
			.map((_, i) => i)
		while (set.length) {
			var min = Infinity
			var ind = -1
			for (let v = 0; v < this.vertex; v++) {
				if (set.includes(v) && dist[v] <= min) {
					min = dist[v]
					ind = v
				}
			}
			var u = ind
			set = set.filter((i) => i !== u)
      if(u === t) break
			for (var i = 0; i < this.vertex; i++) {
				if (this.edge[u][i] !== 0 && set.includes(i)) {
					var alt = dist[u] + this.weight[u][i]
					if (alt < dist[i]) {
						dist[i] = alt
						prev[i] = u
					}
				}
			}
		}
    var path = []
    var tmp = t
    if(prev[tmp] !== undefined || u === s){
      while(tmp !==undefined){
        path.unshift(tmp)
        tmp = prev[tmp]
      }
    }
    return [path,dist[t]] 
	}
}
