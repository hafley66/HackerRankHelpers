import {StrictMap} from 'Extras';
import {S} from './TraversalStates';

var Queries = {
	isTreeEdge(edge) {
		return (this.S(edge) === S.TREE) || (this.S(edge.target) === S.WHITE);
	},
	isBackEdge(edge) {
		return (this.S(edge) === S.BACK);
	},
	isForwardEdge(edge) {
		return (this.S(edge) === S.FORWARD);
	},
	isCrossEdge(e){
		return (this.S(edge) === S.CROSS);
	}
};


var Examine = {
	classifyEdge(edge) {
		var type = this.S(edge);
		console.log('Classifying Edge', edge.source? edge.source.key:'', edge.target.key);
		if(!type) {
			if(this.isTreeEdge(edge))
				this.onTreeEdge(edge);
			else 
				this.onNonTreeEdge(edge);
			this.postClassify(edge);
			console.log(this.S(edge));
		} 
		else 
			return console.log('Warning, already seen this edge') || type;
	},
	postClassify(edge){},

	preExamineEdge(edge){
		if(!this.S(edge))
			this.classifyEdge(edge);
	},
	examineEdge(edge) {
		if(this.isTreeEdge(edge) && this.S(edge.target) === S.GRAY) {
			return (this.preExploreEdge(edge))
			|| (this.exploreEdge(edge))
			|| (this.postExploreEdge(edge));
		}
	},
	postExamineEdge(edge) {
	}
};

var Exploration = {
	getEdgesFrom: function *(treeEdge) {
		var edges = treeEdge.target.e();
		for(var edge of edges){
			// console.log('Secretly this edge...', edge.source.key, edge.target.key);
			if(!edge.equals(treeEdge) && this.S(edge) === undefined)
				yield edge.orient(treeEdge.target);
		}
		return;
	},
	preExploreEdge(edge) {
		if(!this.Adj(edge.target))
			this.Adj(edge.target, this.getEdgesFrom(edge));
	},
	exploreEdge(edge){},
	postExploreEdge(edge) {
		var doneIterating = this.Adj(edge.target).done;
		if(this.S(edge.target) === S.GRAY && doneIterating)
			this.finishVertex(edge);
	}
};

var Reactions = {
	onTreeEdge(tEdge) {
		this.push(tEdge);
		this.discoverVertex(tEdge);
		this.S(tEdge, S.TREE);
	},
	onNonTreeEdge(e){
		if(this.isBackEdge(e)) 
			return this.onBackEdge(e);
		else if(this.isForwardEdge(e)) 
			return this.onForwardEdge(e);
		else 
			return this.onCrossEdge(e);
	},
	onBackEdge(e) {
		this.onCycle(e);
		this.S(e, S.BACK);
	},
	onForwardEdge(e){this.S(e, S.FORWARD)},
	onCrossEdge(e){this.S(e, S.CROSS)},
	onCycle(edge) {
		this._cycles.push(edge);
	}
};

var EdgeMethods = [Queries, Reactions, Examine, Exploration];

export default EdgeMethods;