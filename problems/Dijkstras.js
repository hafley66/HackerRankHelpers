function Dijkstra(graph, source, target) {
	source = graph.getVertex(source);
	var parents = new Map();
	var distances = new Map();
	var intree = new Map();
	
	+function initialize() {
		graph.vertices.forEach( v =>{
			if(v !== source){
				parents.set(v, null);
				distances.set(v, Infinity);
			} 
			intree.set(v, false);
		});
	}();

	distances.set(source, 0);
	var a = source;

	while(a && !intree.get(a)) {
		intree.set(a, true);
		a.getAllEdges().forEach(e => {
			var b = e.to;
			var dist = e.weight;
			var distS = distances.get(a) + dist;
			if(distS < distances.get(b)) {
				distances.set(b, distS);
				parents.set(b, a);
			}
		});

		var currDist = Infinity;
		var bestVertex = null;
		graph.getAllVertices().forEach(v=>{
			if(!intree.get(v) && currDist > distances.get(v)) {
				currDist = distances.get(v);
				bestVertex = v;
			}
		});
		a = bestVertex;
	}
	return {
		distances, 
		parents
	}
}