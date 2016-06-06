import {StrictMap, MultiMap, un, key as k} from 'Extras';

import {DFS, BFS} from 'Graph/Traversals/Base';
import {WCC, SCC} from 'Graph/Traversals/Components';
import {TopologicalSort} from 'Graph/Traversals/TopologicalSort';
import {Dijkstras, BellmanFord} from 'Graph/Traversals/SingleSourceShortestPaths';
import {Floyd} from 'Graph/Traverals/AllPairsShortestPaths';
import {Prim, Kruskal} from 'Graph/Traversals/MinimumSpanningTree';



import _ from 'lodash';

export var GraphStats = (function GraphStats(){
	function GraphStats(graph) {
		this.G = graph;
	}
	
	var Methods = {
		
	};
	
	Object.assign(GraphStats.prototype, Methods);
	
	return GraphStats;
	
})();