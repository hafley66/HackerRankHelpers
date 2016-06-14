import {AbstractTreeSearch as ATS} from './AbstractTreeSearch';
import {S} from './TraversalStates';

function DFS(graph, start, goal) {
	ATS.apply(this, arguments);
}

var Super = ATS.prototype;

var Methods = {
	_initContainer() {
		var stack = [];
		return stack;
	},
	isBackEdge(edge) {
		var old = Super.isBackEdge.call(this, edge);
		return old || (this.S(edge.target) === S.GRAY);
	},
	afterTreeEdge(edge) {},	
	_isAncestor(s,t){
		var e = [s,t];
		var [S_, T_]=e.map(v=>this.Tic(v));
		var [_S, _T]=e.map(v=>this.Toc(v));

		if( isFinite(S_) && isFinite(T_) )
			return S_ < T_ && (_T < _S || this.S(s) === S.GRAY);
		else
			return false;
	},	
	isForwardEdge(edge) {
		var {source, target} = edge;
		var old = Super.isForwardEdge.call(this, edge);
		return old || (this._isAncestor(source, target) && this.P(target) !== source);
	}
};

DFS.prototype = Object.create(Super);
DFS.prototype.constructor = DFS;
Object.assign(DFS.prototype, Methods);

export {DFS as AbstractDFS};