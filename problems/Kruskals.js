function Kruskals(graph) {
	
	var uf = new UnionFind();
	var intree= new Map();
	var edges = [];

	graph.getAllVertices().forEach(v=>{
		uf.makeSet(v);
	});

	graph.getAllEdges().sort((a,b)=>a.weight-b.weight).forEach(e=>{
		if(uf.find(e.to) !== uf.find(e.from)) {
			uf.union(e.to, e.from);
			edges.push(e);
		}
	});
	return edges;
}