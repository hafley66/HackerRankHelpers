import {key as k, un} from 'Extras';

export var Edge = (function Edge(){
	function Edge(G, x, y, weight){
		this._graph = G;
		
		if(G)
			this._registerWith(G, x, y, weight);
		else {
			this._v = [x, y];
			this.source = x;
			this.target = y;
			this.weight(weight);
		}
	}
	var UEdgeMethods = {
		V() {
			return this.v();
		},
		v() {
			return this._v.slice(0);	
		},
		G() {
			return this._graph;
		},
		E() {
			return ;
		},
		except(v) {
			return this.V().remove(v)[0];
		},
		orient(v) {
			this.source = v;
			this.target = this.except(v);
			return this;
		},
		equals(other) {
			var pair = other.V();
			var tpair = this.V();
			return pair.includes(tpair[0]) && pair.includes(tpair[1]);
		},
		isBridge() {
			return false;
		},
		_registerWith(G, x, y, weight){
			[ x, y ] = [ G.V(x), G.V(y) ];
			var map = G.emap;
			var xk = k(x); 
			var yk = k(y);
			map.get(xk).set(yk, this);
			if(!map.get(yk).has(xk))
				map.get(yk).set(xk, this);


			this._v = [x, y];
			this.source = x;
			this.target = y;
			this.weight(weight);
		},
		weight(w) {
			if(un(w)) return this._weight;
			else this._weight = w;
		},
		toString() {
			return `{${this._v[0]}, ${this._v[1]}}\n`;
		},
		from() {
			return this.source || this._v[0];
		},
		to() {
			return this.target || this._v[1];
		}
	};

	Edge.prototype = Object.create(UEdgeMethods);
	return Edge;
})();

export var DiEdge = (function DiEdge() {
	var Super = Edge;
	function DiEdge(G, from, to, weight){
		Super.apply(this, arguments);
	}

	var EdgeMethods = {
		_registerWith(G, x, y, weight){
			[x, y] = [G.V(x), G.V(y)];

			var fMap = G.emap;
			var tMap = G.emapTo;
			var fk = k(x);
			var tk = k(y);

			fMap.get(fk).set(tk, this);
			tMap.get(tk).set(fk, this);

			this._v = [x, y];
			this.source = x;
			this.target = y;
			this.weight(weight);
		},
		equals(other) {
			return this.from() === other.from() && this.to() === other.to();
		},
		reversed(other) {
			if(this.G()) return new this.G().DiEdge(null, this.to(), this.from(), this.weight());
		},
		toString() {
			return `(${this.from()}, ${this.to()})\n`;
		},
		from() {return this.source},
		to() {return this.target},
		orient(v){return this}
	};
	DiEdge.prototype = Object.create(Edge.prototype);
	DiEdge.prototype.constructor = DiEdge;
	Object.assign(DiEdge.prototype, EdgeMethods);
	return DiEdge;	
})();