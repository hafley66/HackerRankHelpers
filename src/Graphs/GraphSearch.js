function DFS(G, source, F) {
	var WHITE = 0;
	var GRAY = 1;
	var BLACK = 2;
	var TIME = 0;
	var V = G.getAllVertices();
	var E = G.getAllEdges();

	initV(V);
	DFS(G.getVertex(source));

	function enter(vertex) {
		vertex.state = GRAY;
		if(F.onEnter)
			F.onEnter(vertex, TIME + 1, G);
		vertex.time.enter = TIME++;
	}

	function process(from, to) {
		var edges = G.getEdges(from, to);
		if(G.simple)
			edges = edges[0];
		if(F.onEdge) 
			F.onEdge(edges, TIME, G);
	}

	function exit(vertex) {
		vertex.state = BLACK;
		if(F.onExit)
			F.onExit(vertex, TIME + 1)
		vertex.time.exit = TIME++;
	}

	function DFS(source) {
		enter(source);

		Adj(source).forEach(to => {
			if(to.state === WHITE) {
				to.parent = source;
				process(source, to);
				DGS(to);
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
		});
	}


	function Adj(vertex) {
		if(F.Adj)
			return F.Adj(vertex);
		else
			vertex.getAdj();
	}

	function finished() {
		if(F.finished)
			return F.finished();
		else 
			return false;
	}

}
