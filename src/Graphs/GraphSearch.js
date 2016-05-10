function DFS(G, source, F) {
	var WHITE = 0;
	var GRAY = 1;
	var BLACK = 2;
	var TIME = 0;
	var V = G.getAllVertices();
	var E = G.getAllEdges();

	source = G.getVertex(source);

	var parent = new Map();
	var state = new Map();

	initV(V);

	source.state = GRAY;
	DFS(source);

	function enter(vertex) {
		vertex.time.enter = TIME++;
		if(F.enter)
			F.enter(vertex, TIME + 1, G);
	}

	function process(from, to) {
		var edges = G.getEdges(from, to);
		if(F.edge) 
			F.edge(edges, TIME, G);
	}

	function exit(vertex) {
		vertex.state = BLACK;
		vertex.time.exit = TIME++;
		if(F.exit)
			F.exit(vertex, TIME)
	}

	function DFS(source) {
		enter(source);

		Adj(source).forEach(to => {
			if(to.state === WHITE) {
				to.parent = source;
				to.state = GRAY;
				process(source, to);
				DFS(to);
			} else if( ( to.state !== BLACK && source.parent !== to ) || G.directed ) {
				process(source, to);
			}
			if(finished()) return;
		});
		
		exit(source);
	}

	function initV(V) {
		V.forEach(v=>{
			v.time = {};
			v.state = WHITE;
			v.parent = null;
			if(F.initV)
				F.initV(v);
		});
	}


	function Adj(vertex) {
		if(F.Adj)
			return F.Adj(vertex);
		else
			return vertex.getAdj();
	}

	function finished() {
		if(F.finished)
			return F.finished();
		else 
			return false;
	}
}


function BinarySearch(source, target, params) {
	function get(index) {
		if(typeof source === 'function') return source(index);
		else return source[index];
	}

	function compare(lhs, rhs, index) {
		if(params.compare)
			return params.compare(lhs, rhs, index);
		else return intCompare(lhs, rhs);
	}
	

	var L = params.L || 0;
	var R = params.R || source.length;
	
	var index;
	var currentValue;

	var loops = 0;
	var compared;

	while(L <= R && (loops++) !== 1000) {
		index = mid(L, R);
		currentValue = get(index);
		// log('Current stats', currentValue, index, L, R);
		compared = compare(currentValue, target, index);
		if(compared < 0) L = index + 1;
		else if(compared > 0) R = index - 1;
		else break;
	}
	if(L > R){
		// log('Could not find target value');
	}

	return index;
}

function Turans(n, r) {
	var t = (r - 1) * ((n * n) / (2*r));
	return t;
}