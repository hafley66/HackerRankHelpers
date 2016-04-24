function processData(input) {
	var lines = input.split('\n').map(line=>{
		return line.trim().split(' ').map(Number);
	});
	var testCases = lines.shift();
	var graphs = thisQuestionIsTerriblyMade(lines);
	graphs.forEach((g) => {
		startGraph(g);
	});
} 

function thisQuestionIsTerriblyMade(input) {
	var graphs = [];
	var start = 0;
	input.forEach((line, key)=>{
		if(line.length === 1) {
			graphs.push({
				verticesCount: input[start][0],
				edgesCount: input[start][1],
				edges: input.slice(start +1, key),
				source: line[0]
			});
			start = key + 1;
		}
	})
	return graphs;
}

function startGraph(gph) {
	var edges = gph.edges;
	var graph = new Graph(range(gph.verticesCount), edges, {directed: false, baseWeight:6});
	var source = gph.source;
	var search = BFS(graph, graph.getVertex(source));
	
	var vertices = Object.keys(graph.vertices).map(Number).sort((L, R)=> L - R);
	vertices.remove(source);
	
	var out = [];
	vertices.forEach( v => {
		out.push(search.distances.get(v));
	});
	console.log(out.join(' '));
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
	_input += input;
});

process.stdin.on("end", function () {
	processData(_input);
});