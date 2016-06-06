import _ from 'lodash';

import {StrictMap, MultiMap, key as k, un, n, Na, N} from 'Extras';
import {Vertex, DiVertex} from 'Graph/Vertices';
import {Edge, DiEdge} from 'Graph/Edges';
// import {GraphStats} from 'Graph/Stats'


export var Graph = (function Graph() {
	'use strict';
	function Graph(V, E, options = {baseWeight:1}) {
		this.vmap = new StrictMap();
		this.emap = new MultiMap();
		this.baseWeight = options.baseWeight;
		this.options = options;
		this._init(V, E);
		// this.stats = new GraphStats(this);
	}



	var methods = {
		_init(V, E){
			var self =this;
			if(V) V.forEach( vertex => self.V(vertex));
			if(E) E.forEach( edge => self.E(edge[0], edge[1], edge[2] || this.baseWeight));
		},
		V(key) {
			var check = this.v(key);
			if(check === null) {
				return new this.Vertex(this, key);
				this._invalidateCaches();
			}
			else return check;
		},
		v(key) {
			if(n(key)) return this.vmap.values();
			else if(this.has(key)) return this.vmap.get(k(key));
			return null;
		},
		e(a, b, weight) {
			a=k(a); b=k(b);
			if(n(a) && n(b)) return this._getEdgeSet();
			else if(!n(a) && this.has(a)){
				if(un(b)) return this._getEdges(a);
				else {
					var edge = this._getEdge(a,b);
					if(un(weight)) return edge;
					else return edge? edge.weight(weight): undefined;
				}
			}
			return undefined;
		},
		_getEdgeSet(){
			return this.emap.flatten().unique();
		},
		_getEdges(a) {
			return this.emap.get(a).values();
		},
		_getEdge(a,b){
			return this.emap.get(a).get(b);
		},
		E(a,b, weight){
			var edge = this.e(a,b,weight);
			if(edge === undefined) {
				a=k(a); b=k(b);
				if(!un(a) && !un(b)) return new this.Edge(this, a, b, weight);
				else if(!un(a)) return this.V(a).E();
			}
			else return edge;
		},
		has(a,b) {
			if(Array.isArray(a)) [a,b] = a;
			a = k(a); b = k(b);
			if(n(b)) return this._hasVertex(a);
			else if(this.has(a) && this.has(b)) return this._hasEdge(a,b); 
			else return false;
		},
		_hasVertex(a) {
			return this.vmap.has(k(a));
		},
		_hasEdge(a, b) {
			return this.emap.get(a).has(b) || this.emap.get(b).has(a);
		},
		adjacencyMatrix(filler=0) {

			var rows = [];
			var verts = this.V().sort('key');

			verts.forEach(v=>{
				var edges = v.E();
				var row = _.fill( verts.length, filler );
				edges.forEach(e=>{
					row[e.except(v).key - 1] = e.weight();
				});
				rows.push(row);
			});
			return rows;
		},
		weight() {
			return this.E().map(e=>e.weight()).reduce((sum, w)=>sum+=w, 0);
		},
		copy() {
			var edges = this.E().map(e=>[e.V()[0], e.V()[1], e.weight()]);
			return new Graph(null, edges, this.options);
		},
		toString() {
			var matrix = this.adjacencyMatrix();
			return matrix.reduce((str, row) => (str + row.join('\t') + '\n'), '\n');
		},
		_invalidateCaches() {

		}
	}

	Graph.prototype = Object.create(methods);
	Graph.prototype.Vertex = Vertex;
	Graph.prototype.Edge = Edge;
	return Graph;
})(Vertex, Edge);

export var DiGraph = (function(Super, Edge, Vertex) {

	function DiGraph(V, E, options={baseWeight: 1}) {
		this.emapTo = new MultiMap();
		Graph.apply(this, arguments);
	}

	var DiGraphMethods = {
		_getEdgeSet() {
			return this.emap.flatten().concat(this.emapTo.flatten()).unique();
		},
		// _getEdges(a) {
		// 	var from = this.emap.get(k(a)).values();
		// 	var to = this.emapTo.get(k(a)).values();
		// 	return from.concat(to);
		// },
		_hasEdge(a,b) {
			return this.emap.get(a).has(b);
		}
	};

	DiGraph.prototype = Object.create(Graph.prototype);
	DiGraph.prototype.constructor = DiGraph;
	Object.assign(DiGraph.prototype, DiGraphMethods);
	
	DiGraph.prototype.Edge = Edge;
	DiGraph.prototype.Vertex = Vertex;

	return DiGraph;
})(Graph.prototype, DiEdge, DiVertex);