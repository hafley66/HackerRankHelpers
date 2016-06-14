import {Edge, DiEdge} from 'Graph/Edges';

var Forest = {
	run(start = this._start, goal) {
		this._init();
		start = this.G.v(start);
		var error;
		var next;

		if(start) next = new Edge(null, null, start);

		this.findTreeFrom(next);

		if(this.searchForest) {

 			while(this.unexplored().length && !this.isFinished()){

				next = new Edge(null, null, this.unexplored().pop());

				this.findTreeFrom( next );
			}

			this.onForestFinish();
		}
	},
	findTreeFrom(root) {
		return this.preTraverse(root) ||
		this.traverse() ||
		this.postTraverse(root);
	},
	onForestFinish(){}
};

var Traversal = {
	preTraverse(root) {
		this.onTreeEdge(root);
	},
	traverse() {
		var source;
		while( ( source = this.pop() ) && !this.isFinished()) {
			this.preExamineEdge(source) ||
			this.examineEdge(source) ||
			this.postExamineEdge(source);
		}
		return source;
	},
	postTraverse(root) {
		this._trees.push([...this._tree]);
		this._tree.clear();
	}
}

var TreeMethods = [Traversal, Forest];

export default TreeMethods;