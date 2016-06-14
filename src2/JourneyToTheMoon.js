import {nCk, count} from 'Combinatorics'
// import {Graph} from 'Graph/Graphs'
// import {BFS} from 'Graph/Traversals/Experiment/BFS'
import {range, StrictMap} from 'Extras';
import {UnionFind} from 'Structures/UnionFind';


// function processData(stringInput) {
// 	var input = mapInput(stringInput);

// 	var nodeCount = input[0][0];
// 	var edges = input.slice(1);

// 	var g = new Graph(null, input.slice(1));

// 	debugger;

// 	var search = new BFS(g);
// 	search.run();
// 	var components = search.trees();

// 	var illegalPairs = 0;
// 	for(var nation of components) {
// 		illegalPairs += count.nCk(nation.length, 2);
// 	}

// 	var notInRelation = range(nodeCount).difference(g.V().map(v=>v.key));

// 	var total = count.nCk(nodeCount, 2) - illegalPairs;
// 	console.log(total);
// } 

function mapInput(stringInput) {
	return stringInput.split('\n').map(row=>row.split(' ').map(Number));
}

function processData(stringInput) {
	var input = mapInput(stringInput);
	var union = new UnionFind();
	var nodeCount = input[0][0];
	var edges = input.slice(1);
	var all = range(nodeCount);

	for(var node of all)
		union.makeSet(node);
	for(var [x,y] of edges) 
		union.union(x, y);

	var first;
	var notInEdges = all.difference(edges.flatten().unique());
	
	if(notInEdges.length > 1){
		var first = notInEdges[0];
		notInEdges.forEach(n=>union.union(first, n));
	}
	
	var nations = union.partitions();
	nations.delete(union.find(first));
	
	var illegalPairs = 0;
	for(var nation of nations.values()) {
		illegalPairs += count.nCk(nation.length, 2);
	}

	var total = count.nCk(nodeCount, 2) - illegalPairs;
	console.log(total);
}

if(global)
	global.solve = processData;

export default processData;