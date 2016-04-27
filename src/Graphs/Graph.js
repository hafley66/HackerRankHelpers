function Graph(vertices, edges, options = {directed: false, weighted: false, baseWeight:1, multi: false}) {
 	this.vertices = new Map();

	this.weighted = options.weighted;
	this.directed = options.directed;
	this.baseWeight = options.baseWeight;

	vertices.forEach( vertex => this.addVertex(vertex));
	edges.forEach( edge => this.addEdge(edge));
}

var GraphMethods = {
	addVertex(key, value) {
		var vertex;
		if(key instanceof Vertex) vertex = key;
		else vertex = this.getVertex(key);
		
		if(!vertex) {
			vertex = new Vertex(key, value, this);
			this.vertices.set(vertex.key, vertex);
		}

		return vertex;
	},
	addEdge(from, to, weight=this.baseWeight) {
		if(from.length) {[from, to, weight] = from; }

		var fromVertex = this.getOrCreateVertex(from);
		var toVertex = this.getOrCreateVertex(to);
		
		var edge = fromVertex.addEdge(toVertex, weight);
		return edge;
	},

	getOrCreateVertex(key, value) {
		if(this.hasVertex(key)) return this.getVertex(key);
		else return this.addVertex(key, value);
	},

	getAllVertices() {
		return [...this.vertices.values()];
	},

	getVertex(v) {
		return this.vertices.get(getKey(v));
	},

	getEdge(from, to){
		if(from.length) [from, to] = from;
		return this.getVertex(from).getEdge(to);
	},

	hasVertex(v) {
		return !!this.getVertex(v);
	},
	hasEdge(from, to) {
		if(from.length) [from, to] = from;
		return this.getVertex(from).hasEdge(to);
	},

	toString() {
		var out = [''];
		var sorted = this.vertices.sortKeys();
		sorted.forEach((vertex, key) => {
			out.push(`[${vertex}]`);
		});
		out.push('');
		return out.join('\n');
	}
};

var C = {
	W: 'white',
	G: 'grey',
	B: 'black'
};

Graph.prototype = Object.create(GraphMethods);

// var g = new Graph(_.range(1, 5), [[1,2], [1,3]], {baseWeight: 6});
// console.log(g +'');
// console.log(BFS(g, 1));