function Graph(vertices, edges, options = {directed: false, weighted: false, baseWeight:1}) {
	this.vertices = new Map();
	this.edges = new Map();

	this.weighted = options.weighted;
	this.directed = options.directed;
	this.baseWeight = options.baseWeight;

	vertices.forEach( vertex => this.addVertex(vertex));
	edges.forEach( edge => this.addEdge(edge[0], edge[1], edge[2]));
}

var GraphMethods = {
	addVertex(key, value) {
		var vertex;

		if(key instanceof Vertex) vertex = key;
		else vertex = this.getVertex(key);
		
		if(!vertex) {
			vertex = new Vertex(key, value, this);
			this.vertices.set(vertex.key, vertex);
			this.edges.set(vertex.key, []);
		}

		return vertex;
	},
	addEdge(from, to, weight=this.baseWeight) {
		var fromVertex = this.getOrCreateVertex(from);
		var toVertex = this.getOrCreateVertex(to);
		return this._simpleAddEdge(fromVertex, toVertex, weight);

	},
	_simpleAddEdge(from, to, weight) {
		var edge = new Edge(from, to, weight);
		this.getEdges(from).push(edge);
		if(!this.directed) this.getEdges(to).push(edge.reversed());
	},

	getOrCreateVertex(key, value) {
		if(this.hasVertex(key)) return this.getVertex(key);
		else return this.addVertex(key, value);
	},

	getAllVertices(sorted) {
		var verts = [...this.vertices.values()];
		if(sorted)
			verts.sort((a,b) => {return a.key - b.key});
		return verts;
	},
	getAllEdges(sortBy) {
		var edges = [...this.edges.values()].reduce((snowball, edges)=> snowball.concat(edges), []).unique();
		if(sortBy === 'by Weight') 
			edges.sort((a,b) => {return a.weight - b.weight;});
		else if(sortBy === 'by To Key') 
			edges.sort((a,b) => {return a.to.key - b.to.key});
		return edges;
	},

	getVertex(v) {
		return this.vertices.get(getKey(v));
	},

	getEdges(from) {
		return this.edges.get(getKey(from));
	},
	getEdge(from, to=null) {
		var edges = this.getEdges(from);

		if (to) {
			to = this.getVertex(to);
			return edges.filter( edge =>  edge.to === to );
		}
		return edges[0];
	},

	hasVertex(v) {
		return !!this.getVertex(v);
	},
	hasEdge(from, to) {
		if(from.length) [from, to] = from;
		return !!(this.getEdge(from, to));
	},

	toString() {
		var out = [''];
		var sorted = this.vertices.sortKeys();
		sorted.forEach((vertex, key) => {
			out.push(`[${vertex}]`);
		});
		out.push('');
		return out.join('\n');
	},
	toMatrix() {
		var rows = [];
		var verts = this.getAllVertices().sort((a,b)=>(a.key - b.key));
		verts.forEach(v=>{
			var edges = v.getAllEdges().sort((a,b)=>(a.to.key - b.to.key));
			var row = fill( verts.length, Infinity );
			edges.forEach(e=>{
				row[e.to.key-1] = e.weight;
			});
			rows.push(row);
		});
		return rows;
	}
};

var C = {
	W: 'white',
	G: 'grey',
	B: 'black'
};

Graph.prototype = Object.create(GraphMethods);