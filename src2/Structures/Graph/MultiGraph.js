import {k, un, n} from 'Extras';

function MultiEdgeGeneric(G) {
	var T = G.prototype.Edge;

	var Methods = {
		weight(w) {
			var newEdge;
			if(!un(w)){
				var a = this.source;
				var b = this.target;

				newEdge = new T(null, this._graph.V(a), this._graph.V(b), w);
				newEdge._graph = this._graph;
				newEdge.orient(this.source);
				this.edges.push(newEdge);
			} 
			else 
				return this.edges;
		},
		orient(v) {
			this.edges.forEach(e=>e.orient(v));
			return this;
		}
	};

	function MultiEdge(G, x, y, weight) {
		var edge = new T(G, x, y);
		edge.edges = [];
		Object.assign(edge, Methods);
		delete edge._weight;
		edge.weight(weight);
		return edge;
	};

	return MultiEdge;
}


function MultiGraphMixin(GType) {
	
	var Methods = {
		Edge: MultiEdgeGeneric(GType), 
		_getEdgeSet() {
			var allMutliEdges = GType.prototype._getEdgeSet.call(this);
			return allMultiEdges.flatMap(e=>e.weight());
		},
		_getEdges(v) {
			return this.emap.get(v).values().flatMap(e=>e.weight());
		}
	};

	function MultiGraph(vertices, edges, options) {
		var graph = new GType();
		Object.assign(graph, Methods);
		graph._init(vertices, edges);
		return graph;
	}

	return MultiGraph;
}

export {MultiGraphMixin};