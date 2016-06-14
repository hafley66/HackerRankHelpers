import {UnionFind} from 'Structures/UnionFind';
import {BFS} from './BFS';

export var WCC = (function WCC(BFS){
	function WCC(graph, source=1) {
		BFS.call(this, graph, source);
		this.parts = new UnionFind();
	}
	
	var Methods = {
		initVertex(v) {
			this.parts.makeSet(v);
		},
		onTreeEdge(source, target, edge) {
			if(this.parts.find(target) !== this.parts.find(source))
				this.parts.union(source, target);
		},
		components() {
			return this.parts.partitions();
		},
		onForestFinish() {
			return this.components();
		}
	};

	WCC.prototype = Object.create(BFS.prototype);
	WCC.prototype.constructor = WCC;
	
	Object.assign(WCC.prototype, Methods);
	
	return WCC;
	
})(BFS);