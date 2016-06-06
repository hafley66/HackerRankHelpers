var Vertex = (function UndirecteDiVertex(){
	function Vertex(G, key, value) {
		this._graph = G;
		this.key = key;
		this._value = value;
		if(G) this._registerWith(G, key);
	}

	var VertexMethods = {
		_registerWith(G, key) {
			if(!G.has(key)){
				G.vmap.set(key, this);
				G.emap.set(key, new StrictMap());
			}
		},
		G() {
			return this._graph;
		},
		V() {
			return this.v();
		},
		v() {
			return this.G().e(this).map(e=>e.V().remove(this)).flatten();
		},
		E(other, weight) {
			return this.G().E(this, other, weight);
		},
		e(other, weight) {
			return this.G().e(this, other, weight);
		},
		value(v) {
			if(un(v)) return this._value;
			else this._value = v;
		},
		near(other) {
			return this.G().has(this, other);
		},
		distanceTo(other) {
		},
		component() {
		},
		shortestPath() {
		},
		toString() {
			return this.key;
		}
	}

	Vertex.prototype = Object.create(VertexMethods);
	return Vertex;
})();

var DiVertex = (function() {
	var Super = Vertex;

	function DiVertex(G, key, value) {
		Super.call(this, G, key, value);
	}

	var x ={
		_registerWith(G, key, value) {
			Super.prototype._registerWith.apply(this, arguments);
			G.emapTo.set(key, new StrictMap());
		},
		v() {
			return this.Out();
		},
		In() {
			return this.in().map(inGoingEdge => inGoingEdge.from());
		},
		Out() {
			return this.out().map(outGoingEdge => outGoingEdge.to());
		},
		in() {
			return this.G().emapTo.get(this.key).values();
		},
		out() {
			return this.G().emap.get(this.key).values();
		},
		to(other) {
			return this.G().has(this, other);
		},
		from(other) {
			return this.G().has(other, this);
		},
		strongComponent() {
		}
	};
	DiVertex.prototype = Object.create(Vertex.prototype);
	DiVertex.prototype.constructor = DiVertex;
	Object.assign(DiVertex.prototype, x);
	return DiVertex;
})();
