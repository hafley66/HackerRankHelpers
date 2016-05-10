function Vertex(key, value, graph) {
	this.graph = graph;
	this.value = value;
	this.key = key;
	this.edges = new Link();
}


var vertexMethods = {
	getEdge(to) { 
		return this.graph.getEdge(this, to);
	},
	addEdge(to, weight=this.graph.baseWeight){
		this.graph.addEdge(this, to, weight);
	},
	hasEdge(to) {
		return this.graph.hasEdge(this, to);
	},
	getAdj() {
		var toReturn = this.getAllEdges().map(edge=>edge.to).unique();
		return toReturn;
	},
	getAllEdges() {
		return this.graph.getEdges(this);
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
