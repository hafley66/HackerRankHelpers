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

