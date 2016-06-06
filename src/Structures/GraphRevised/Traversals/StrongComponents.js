var SCC = (function SCC(DFS){
	function SCC(digraph) {
		var dfs = {};
		DFS.call(dfs, digraph, 1);
		var self = {};
		Object.assign(self, SCC.prototype);
		Object.setPrototypeOf(self, dfs);
		Object.setPrototypeOf(this, self);
		
		keyMapShorthander(this, 'indices', 'I');
		keyMapShorthander(this, 'lowlinks', 'LL');

		this.index = 0;
		this.currentComponent = [];
		this.components = [];

		this.curr = {};
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
				debugger;
				var comp = [];
				var {components: comps, currentComponent: currComp} = this;

				comps.push(comp);
				do {
					comp.push(currComp.peek());
				} while(currComp.pop() !== source);
			}
		},	
		onFinish({components: SCCs} = this) {
			debugger;			
		},
		I(v, index) {
			return mapShorthand(this.indices, k(v), index);
		},
		L(v, lowlink) {
			return mapShorthand(this.lowlinks, k(v), lowlink);
		}
	};

	Object.assign(SCC.prototype, Methods);

	return SCC;

})(DFS);