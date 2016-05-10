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

function BFS(graph, source, getVertices= (vertex)=>{return vertex.getAdjacentVertices();},
	onDiscover= ()=>{}, 
	onFinish= ()=>{}) {
	if(!graph.weighted && !graph.directed){
		source = graph.getVertex(source);

		var parents = new Map();
		var distances = new Map();
		var colors = new Map();
		var Q = []; Q.push = Q.unshift;

		+function initialize() {
			graph.vertices.forEach( v =>{
				parents.set(v.key, null);
				distances.set(v.key, -1);
				colors.set(v.key, C.W);
			});
		}();

		distances.set(source.key, 0);

		Q.push(source);

		while(Q.length) {

			var current = Q.pop();

			getVertices(current).forEach( vertex => {
				if ( colors.get(vertex.key) === C.W ) {
					parents.set(vertex.key, current);
					distances.set(vertex.key , distances.get(current.key) + (1 * graph.baseWeight));
					colors.set(vertex.key, C.G);
					onDiscover(vertex);

					Q.push(vertex);
				}
			});

			colors.set(current.key, C.B);
			onFinish(current);
		}
		return {
			distances,
			colors,
			parents
		};
	}
	return {};
}

function Prims(graph, source, target) {
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
			if(!intree.get(b)){
				var dist = e.weight;
				if(dist < distances.get(b)) {
					distances.set(b, dist);
					parents.set(b, e);
				}
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
function Floyds(graph) {
	var matrix = graph.toMatrix();
	var N = matrix.length;
	for(var k = 0; k < N; k++){
		for(var i = 0; i < N; i++) {
			for(var j = 0; j < N; j++){
				if ( matrix[i][j] > ( matrix[i][k] + matrix[k][j] )){
					matrix[i][j] = matrix[i][k] + matrix[k][j];
				}
			}
		}
	}
	return matrix;

}