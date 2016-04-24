function Vertex(key, value, graph) {
	this.graph = graph;
	this.value = value;
	this.key = key;
	this.edges = [];
}


var vertexMethods = {
	getEdge(to) {
		var edge;
		this.edges.forEach(e=> {
			if(getKey(e.to) === getKey(to)) edge = e;
		});
		return edge;
	},
	addEdge(to, weight=1){
		var edge = this.getEdge(to);
		if(!edge) {
			var toVertex = this.graph.getVertex(to);
			edge = new Edge(this, toVertex, weight);
			this.edges.push(edge);
			
			if(!this.graph.directed && !toVertex.hasEdge(this)) toVertex.addEdge(this, weight);
		}
		return edge;
	},
	removeEdge(to) {
		var edge = this.getEdge(to);
		if(edge) this.edges.remove(edge);
		return edge;
	},
	updateEdge(to, newWeight=1) {
		var edge = this.getEdge(to);
		
		if(edge) edge.weight = newWeight;
		else this.addEdge(to, newWeight);
	},
	hasEdge(to) {
		return !!this.getEdge(to);
	},
	getAdjacentVertices() {
		return this.edges.map(e=>e.to).map(this.graph.getVertex.bind(this.graph));
	},
	getEdgeListString() {
		if(this.edges.length){
			var edges = [];
			this.edges.forEach( e => {
				edges.push(e.to.toString(true));
			});
			var list = edges.join(',');
			list = '<< ' + list 
			list += ' >>';
			return list;
			
		}
		return '';
	},
	toString(hideEdges) {
		var out = [`V:[${this.key}]`];
		if(!hideEdges) {
			if(this.edges.length){
				out.push(this.getEdgeListString());
				return out.join(' --> ');
			}
		} 
		return out[0];
	}
};

Vertex.prototype = Object.create(vertexMethods);
