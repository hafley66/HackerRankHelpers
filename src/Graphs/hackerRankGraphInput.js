function processGraphData(input) {
	startEvenTree(processEvenTree(input));
}

function processEvenTree(input){
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

	var start = G.getVertex(1);

	var cuts = 0;
	DFS(G, start, {
		initV: function(vertex) {
			vertex.count = 0;
		},
		exit: function(vertex) {
			if(vertex !== start){
				var currentCount = vertex.count + 1;
				if(currentCount % 2 === 0) {
					cuts++;
				} else {
					vertex.parent.count += currentCount;
				}
			}
		}
	});
	console.log(cuts);
}

function Clique(input) {
	var lines = input.split('\n').map(line=>{
		return line.trim().split(' ').map(Number);
	});

	lines.slice(1).forEach(line=>{
		var func = Turans.bind(Turans, line[0]);
		var current;
		var result = BinarySearch(func, line[1], {
			R: asum(line[1]),
			compare: function(lhs, rhs, index) {
				if(lhs <= rhs){
					current = index;
					log('comparing', index);
				}

				var diff = rhs - lhs;
				if(Math.abs(diff) <= 0.5)
					return 0;
				else 
					return intCompare(lhs, rhs);
			}
		});
		log(current);
	});
}