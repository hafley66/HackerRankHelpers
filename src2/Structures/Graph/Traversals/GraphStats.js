import {StrictMap, MultiMap, un, key as k} from 'Extras';

import {DFS, BFS} from './Base';
import {WCC, SCC} from './Components';
import {TopologicalSort} from './TopologicalSort';
import {Dijkstra, BellmanFord} from './SingleSourceShortestPaths';
import {Floyd} from './Floyd';
import {Prim, Kruskal} from './MinimumSpanningTree';

export var GraphStats = (function GraphStats(){
	function GraphStats(graph) {
		this.G = graph;
	}
	
	var Methods = {
		WCC(source=this.G.V()[0]){
			this.wcc = new WCC(this.G, source);
			return this.wcc;
		},
		SCC(source=this.G.V()[0]) {
			this.scc = new SCC(this.G, source);
			return this.scc;
		},
		TopologicalSort(source=this.G.V()[0]) {
			this.topologicalSort = new TopologicalSort(this.G, source);
			return this.topologicalSort;
		},
		Dijkstra(source=this.G.V()[0]) {
			this.dijkstra = new Dijkstra(this.G, source);
			return this.dijkstra;
		},
		BellmanFord(source=this.G.V()[0]) {
			this.bellmanford = new BellmanFord(this.G, source);
			return this.bellmanford;
		},
		Prim(source=this.G.V()[0]) {
			this.prim = new Prim(this.G, source);
			return this.prim;
		},
		Kruskal(source=this.G.V()[0]) {
			this.kruskal = new Kruskal(this.G, source);
			return this.kruskal;
		},
		Floyd() {
			this.floyd = new Floyd(this.G);
			return this.floyd;
		}
	};
	
	Object.assign(GraphStats.prototype, Methods);
	
	return GraphStats;
})();