function processGraphData(input) {
	var questionData = getGraphDataFromInput(input);
	
	return questionData.graphs.map((g) => {
		return startGraph(g);
	});

}

function getGraphDataFromInput(input) {
	
	var lines = input.split('\n').map(line=>{
		return line.trim().split(' ').map(Number);
	});
	var testCasesCount = lines[0].length === 1? lines.shift() : undefined;
	var graphs = [];
	var start = 0;
	lines.forEach((line, key)=>{
		if(line.length === 1) {
			graphs.push({
				verticesCount: lines[start][0],
				edgesCount: lines[start][1],
				edges: lines.slice(start +1, key),
				source: line[0]
			});
			start = key + 1;
		}
	});
	return {
		graphs,
		testCasesCount
	};
}

function startGraph(gph) {
	var edges = gph.edges;
	var graph = new Graph(range(gph.verticesCount), edges, {directed: false, baseWeight:6});
	var source = gph.source;
	var search = Prims(graph, graph.getVertex(source));

	var sum = 0;
	[...search.parents.values()].forEach(edge=>{
		sum += edge.weight;
	});
	console.log(sum);
}