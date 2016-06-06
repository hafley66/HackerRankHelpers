function Vertex(key, value, graph) {
	this.G = graph;
	this.value = value;
	this.key = key;

	this.G._V.set(key, this);
	this.G._E.set(key, pojo());
}


var vertexMethods = {
	V() {
		return this.E().map(e=> e.to).unique();
	},
	E(to, weight) {
		return this.G.E(this, to, weight);
	},
	has(y) {
		
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
