function Vertex(key, value, graph) {
	this.graph = graph;
	this.value = value;
	this.key = key;
	this.edges = new Link();
}


var vertexMethods = {
	getEdges(to) { 
		to = this.graph.getVertex(to);
		
		var t = [];
		this.edges.forEach(edge => {
			if(edge.to === to) t.push(edge);
		});
		return t; 
	},
	addEdge(to, weight=this.graph.baseWeight, handshake=false){
		var oldEdge = this.getEdges(to);
		if(oldEdge.length) {
			var theEdge = oldEdge[0];
			if(theEdge.weight > weight){
				theEdge.weight = weight;
			}
		} else {
			var theEdge = new Edge(this, to, weight);
			this.edges.append(theEdge);
		}
		if(!this.graph.directed && !handshake) to.addEdge(this, weight, true);
	},
	hasEdge(to) {
		return this.getEdges(to).length;
	},
	getAdjacentVertices() {
		var vs = [];
		return this.getAllEdges().map(edge=>edge.to).unique();
	},
	getAllEdges() {
		return this.edges.values();
	},
	getEdgeListString() {
		if(this.edges.length){
			var edges = [];
			this.getAllEdges().forEach( e => {
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
			if(this.getAllEdges().length){
				out.push(this.getEdgeListString());
				return out.join(' --> ');
			}
		} 
		return out[0];
	}
};

Vertex.prototype = Object.create(vertexMethods);
