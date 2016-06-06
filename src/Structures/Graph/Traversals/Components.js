import {BFS, DFS} from 'Graph/Traversals/Base';
import {key as k, un, keyMapShorthander, mapShorthand} from 'Extras';

export var WCC = (function Components(BFS){
	function GraphComponents(graph, source=1) {
		BFS.call(this, graph, source);
	}
	
	var Methods = {
		
	};
	
	Object.assign(GraphComponents.prototype, Methods);
	
	return GraphComponents;
	
})(BFS);

export var SCC = (function SCC(DFS){
	function SCC(digraph, source=1) {
		DFS.call(this, digraph, source);
		
		keyMapShorthander(this, 'indices', 'I');
		keyMapShorthander(this, 'lowlinks', 'LL');

		this.index = 0;
		this.currentComponent = [];
		this.components = [];
	}

	var Methods = {
		initVertex(v) {
			this.I(v, 0);
		},
		discoverVertex(v=this.curr.source) {
			this.currentComponent.push(v);
			
			this.index++;

			this.I(v, this.index);
			this.LL(v, this.index);
		},
		examineEdge({source, target} = this.curr) {
			if(this.currentComponent.includes(target)) {
				var earliestAncestor = Math.min(this.LL(source), this.I(target));
				this.LL(source, earliestAncestor);		
			}
		},
		afterTreeEdge({source, target} = this.curr) {
			var earliestAncestor = Math.min(this.LL(source), this.LL(target));
			this.LL(source, earliestAncestor);		
		},
		finishVertex({source, target}=this.curr){
			if(this.LL(source) === this.I(source)){
				var comp = [];
				var {components: comps, currentComponent: currComp} = this;

				comps.push(comp);
				do {
					comp.push(currComp.peek());
				} while(currComp.pop() !== source);
			}
		},	
		onFinish({components: SCCs} = this) {
		},
		I(v, index) {
			return mapShorthand(this.indices, k(v), index);
		},
		L(v, lowlink) {
			return mapShorthand(this.lowlinks, k(v), lowlink);
		}
	};

	SCC.prototype = Object.create(DFS.prototype);
	SCC.prototype.constructor = SCC;

	Object.assign(SCC.prototype, Methods);

	return SCC;

})(DFS);