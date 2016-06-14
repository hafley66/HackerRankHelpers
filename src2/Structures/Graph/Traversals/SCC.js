import {DFS} from './Base/DFS-Iterative';
import {key as k, un, keyMapShorthander, mapShorthand} from 'Extras';

function SCC(digraph, source=1) {
	DFS.call(this, digraph, source);

	keyMapShorthander(this, 'indices', 'I');
	keyMapShorthander(this, 'lowlinks', 'LL');

	this.index = 0;
	this.currentComponent = [];
	this._components = [];
}

var Super = DFS.prototype;

var Methods = {
	initVertex(v) {
		Super.initVertex.call(this, v);
		this.I(v, 0);
	},
	discoverVertex(edge) {
		var {target: v}= edge;
		Super.discoverVertex.call(this, edge);

		this.currentComponent.push(v);

		this.index++;

		this.I(v, this.index);
		this.LL(v, this.index);
	},
	onNonTreeEdge(edge) {
		var {source, target} = edge;
		if(this.currentComponent.includes(target)) {
			var earliestAncestor = Math.min(this.LL(source), this.I(target));
			this.LL(source, earliestAncestor);		
		}
		Super.onNonTreeEdge.call(this, edge);
	},
	setParentsLowestLink(edge) {
		var {source, target} = edge;
		var earliestAncestor = Math.min(this.LL(source), this.LL(target));
		this.LL(source, earliestAncestor);		
	},
	finishVertex(edge){
		var {source, target}=edge;
		Super.finishVertex.call(this, edge);

		if(this.LL(target) === this.I(target)){
			var comp = [];
			var {_components: comps, currentComponent: currComp} = this;

			comps.push(comp);
			do {
				comp.push(currComp.peek());
			} while(currComp.pop() !== target);
		}
		if(source)
			this.setParentsLowestLink(edge);
	},	
	onForestFinish() {
		return this._components;
	},
	components() {
		return this._components.slice();
	}
};

SCC.prototype = Object.create(DFS.prototype);
SCC.prototype.constructor = SCC;
Object.assign(SCC.prototype, Methods);

export {SCC};