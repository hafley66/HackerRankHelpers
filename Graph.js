function Graph(vertices, edges, options={directed: false, weighted: false, baseWeight:1}) {
	this.vertices = {};

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
			this.vertices[vertex.key] = vertex;
		}

		return vertex;
	},
	addEdge(from, to, weight=this.baseWeight) {
		if(from.length) [from, to] = from;
		var fromVertex = this.getOrCreateVertex(from);
		var toVertex = this.getOrCreateVertex(to);
		
		var edge = fromVertex.addEdge(toVertex, weight);
		return edge;
	},

	getOrCreateVertex(key, value) {
		if(this.hasVertex(key)) return this.getVertex(key);
		else return this.addVertex(key, value);
	},

	updateVertex(key, value) {
		var v = this.getVertex(key);
		if(v) v.value = value;
	}, 
	updateEdge(from, to, weight){
		if(from.length) [from, to] = from;
		this.getVertex(from).updateEdge(to, weight);
	},

	getVertex(v) {
		return this.vertices[getKey(v)];
	},
	getEdge(from, to){
		if(from.length) [from, to] = from;
		return this.getVertex(from).getEdge(to);
	},

	hasVertex(v) {
		var key = v;
		if(v instanceof Vertex) key = v.key;
		return !!this.getVertex(key);
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


function BFS(graph, source, getVertices= (vertex)=>{return vertex.getAdjacentVertices();},
	onDiscover= ()=>{}, 
	onFinish= ()=>{}) {
	if(!graph.weighted && !graph.directed){
		source = graph.getVertex(source);

		var parents = new Map();
		var distances = new Map();
		var colors = new Map();
		var Q = []; Q.push = Q.unshift;

		+function initialize() {
			graph.vertices.forEach( v =>{
				parents.set(v.key, null);
				distances.set(v.key, -1);
				colors.set(v.key, C.W);
			});
		}();

		distances.set(source.key, 0);

		Q.push(source);

		while(Q.length) {

			var current = Q.pop();

			getVertices(current).forEach( vertex => {
				if ( colors.get(vertex.key) === C.W ) {
					parents.set(vertex.key, current);
					distances.set(vertex.key , distances.get(current.key) + (1 * graph.baseWeight));
					colors.set(vertex.key, C.G);
					onDiscover(vertex);

					Q.push(vertex);
				}
			});

			colors.set(current.key, C.B);
			onFinish(current);
		}
		return {
			distances,
			colors,
			parents
		};
	}
	return {};
}


Graph.prototype = Object.create(GraphMethods);

// var g = new Graph(_.range(1, 5), [[1,2], [1,3]], {baseWeight: 6});
// console.log(g +'');
// console.log(BFS(g, 1));