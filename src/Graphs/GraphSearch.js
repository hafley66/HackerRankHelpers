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

