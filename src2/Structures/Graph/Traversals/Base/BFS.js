import {AbstractTreeSearch as ATS} from './AbstractTreeSearch';

function BFS(graph, start, goal) {
	ATS.apply(this, arguments);
}

var Super = ATS.prototype;

var Methods = {
	_initContainer() {
		var queue = [];
		queue.pop = queue.shift;
		return queue;
	},
	isBackEdge(edge) { 
		if(Super.isBackEdge.call(this, edge))
			return true;
		else {
			var common = this._findCommonDepthParent(edge.source, edge.target);
			if(common[0] === common[1])
				return true;
		}
		return false;
	},
	_findCommonDepthParent(a,b) {
		var s = [a,b];
		var ds = s.map(v=>this.Depth(v));
		var mDepth = Math.min(...ds);
		return s.map(v=>this._getParentAtDepth(v, mDepth));
	},
	_getParentAtDepth(node, depth) {
		var n = node;
		while(this.Depth(n) !== depth)
			n = this.P(n);
		return n;
	},
	isForwardEdge(edge) {
		return false;
	},
	exploreEdge(edge) {
		for(var e of this.Adj(edge.target))
			this.classifyEdge(e);
	}
};

BFS.prototype = Object.create(Super);
BFS.prototype.constructor = BFS;
Object.assign(BFS.prototype, Methods);

export {BFS};