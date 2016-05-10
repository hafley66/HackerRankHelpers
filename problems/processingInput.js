function processFloyd(input) {
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
				queryCount: line[0],
				queries: lines.slice(key + 1)
			});
			start = key + 1;
		}
	});
	return {
		graphs,
		testCasesCount
	};
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
	var graph = new Graph(range(gph.verticesCount), edges, {directed: true});
	var source = gph.source;
	var edges = Kruskals(graph);
	var sum = edges.reduce((sum, edge)=>{
		sum += edge.weight;
		return sum
	}, 0);
	console.log(sum);
}

function startFloyd(gph) {
	var graph = new Graph( range(gph.verticesCount), gph.edges, {directed: true});
	var floyd = Floyds(graph);
	gph.queries.forEach((q)=>{
		var [from, to] = q;
		var length = floyd[from-1][to-1];
		if(from === to)
			length = 0;
		console.log(length === Infinity? -1: length);
	})
}