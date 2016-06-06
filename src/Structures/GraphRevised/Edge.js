var Edge = (function Edge(){
	function Edge(G, x, y, weight){
		this._graph = G;
		
		if(un(weight)) this.weight(G? G.baseWeight : 1);
		else this.weight(weight);

		if(G){
			[x, y] = [G.V(x), G.V(y)];
			this._v = [x, y];
			this._registerWith(G, x, y);
		}
		else this._v = [x, y];
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
		equals(other) {
			var pair = other.V();
			var tpair = this.V();
			return pair.includes(tpair[0]) && pair.includes(tpair[1]);
		},
		isBridge() {
			return false;
		},
		_registerWith(G, x, y){
			var map = G.emap;
			x = k(x); y = k(y);
			map.get(x).set(y, this);
			map.get(y).set(x, this);
		},
		weight(w) {
			if(un(w)) return this._weight;
			else this._weight = w;
		},
		toString() {
			return `{${this._v[0]}, ${this._v[1]}}\n`;
		}
	};

	Edge.prototype = Object.create(UEdgeMethods);
	return Edge;
})();

var DiEdge = (function DiEdge() {
	var Super = Edge;
	function DiEdge(G, from, to, weight){
		Super.apply(this, arguments);
	}

	var EdgeMethods = {
		_registerWith(G){
			var fMap = G.emap;
			var tMap = G.emapTo;
			var fk = k(this.from());
			var tk = k(this.to());

			fMap.get(fk).set(tk, this);
			tMap.get(tk).set(fk, this);
		},
		from() {
			return this._v[0];
		},
		to() {
			return this._v[1];
		},
		equals(other) {
			return this.from() === other.from() && this.to() === other.to();
		},
		reversed(other) {
			if(this.G()) return new this.G().DiEdge(null, this.to(), this.from(), this.weight());
		},
		toString() {
			return `(${this.from()}, ${this.to()})\n`;
		}
	};
	DiEdge.prototype = Object.create(Edge.prototype);
	DiEdge.prototype.constructor = DiEdge;
	Object.assign(DiEdge.prototype, EdgeMethods);
	return DiEdge;	
})();