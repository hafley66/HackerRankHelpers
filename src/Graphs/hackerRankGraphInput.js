function processGraphData(input) {
	startEvenTree(processEvenTree(input));
}

function processEventTree(input){
	var lines = input.split('\n').map(line=>{
		return line.trim().split(' ').map(Number);
	});
	var gph = {
		verticesCount: lines[0][0],
		edgesCount: lines[0][1],
		edges: lines.slice(1)
	}
	return gph;
}

function startEvenTree(gph) {
	var graph = new Graph(range(gph.verticesCount), gph.edges);
	var edgesDeleted = EvenTree(graph);
}

function EvenTree(G) {
	var V = G.getAllVertices(true);
	var E = G.getAllEdges();

	var start = G.getVertex(mid(1,  V.length));

}