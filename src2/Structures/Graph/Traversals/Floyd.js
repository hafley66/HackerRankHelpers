import {DiEdge} from 'Graph/Edges';

function Floyd(graph) {
	this.G = graph;
}

var Methods = {
	run(allOnes=false) {
		this.init();

		var dist = this.dist;
		var V = this.G.v();
		var E = this.G.e();
		var indices = _.range(V.length);

		indices.forEach(i=>{
			dist[i] = _.fill(indices.slice(), Infinity);
		});

		V.forEach(v=>{
			var i = v.key - 1;
			this.dist[i][i] = 0;
		});
		E.forEach(edge=>{
			var from, to;
			if(edge instanceof DiEdge)
				[from, to] = [edge.from(), edge.to()];
			else 
				[from, to] = edge.v();
			var row = from.key - 1;
			var col = to.key - 1;
			if(this.dist[row][col] === Infinity)
				this.dist[row][col] = allOnes? 1: edge.weight();
		});

		for(let k of indices) {
			for(let i of indices) {
				for(let j of indices) {
					var n = dist[i][k] + dist[k][j];
					if(dist[i][j] > n) dist[i][j] = n;
				}
			}
		}
		return dist;
	},
	init() {
		this.dist = [];
		this.matrix = this.G.adjacencyMatrix();
	}
};

Object.assign(Floyd.prototype, Methods);

export {Floyd};