function Edge(from, to, weight=1) {
	this.from = from;
	this.to = to;
	this.weight = weight;
	this.G = from.G;


	var fromEdges = this.G.E(this.from);
	var toEdges = this.G.E(this.to);
	fromEdges[to.key] = this;
	if(!this.G.directed){
		toEdges[from.key] = this;
	}
}

Edge.prototype.toString = function dumbass() {
	var {from, to, weight} = this;
	return `<< ${from.key} --:${weight}:--> ${to.key} >>\n`;
};

Edge.prototype.reversed = function() {
	return new Edge(this.to, this.from, this.weight);
};

Edge.prototype.equals = function(other) {

	if(this === other || (this.from === other.from && this.to === other.to))
		return true;
	else if(!this.from.graph.directed 
		&& (this.from === other.to && this.to === other.from))
		return true;
	return false;
}