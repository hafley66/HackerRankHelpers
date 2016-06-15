import {key as k, un, n, StrictMap, keyMapShorthander, MultiMap} from 'Extras';
import TreeMethods from './TreeMethods';
import VertexMethods from './VertexMethods';
import EdgeMethods from './EdgeMethods';


function AbstractTreeSearch(graph, start, goal) {
	this.G = graph;

	this._start = (un(start) ? graph.randomVertex() : graph.v(start) );
	this._goal = graph.v(goal);
	this.searchForest = true;
}

var ContainerMethods = {
	_initContainer(){},
	push(edge) {
		this._container.push(edge);
		if(!edge) debugger;
		if(!n(edge.target))
			this._discovered.add(edge.target);
	},
	pop() {
		return this._container.pop();
	},
	peek() {
		return this._container.peek();
	},
	isEmpty() {
		return !!this._container.length;
	},
	contains(v) {
		return this._container.contains(v);
	}
};

var OtherMethods = {
	isFinished() {return false},
	hasCycle(edge) {return !!this._cycles.length},
	unexplored() {
		return this.G.V()
		.difference(this.explored(), this.discovered())
		.sortBy('key')
	},
	expanding() {return [...this._expanding]},
	finished() {return [...this._finished]},
	discovered() {return [...this._discovered]},
	tree() {return [...this._tree]},
	cycles() {return [...this._cycles]},
	trees() {return [...this._trees]}
};

Object.assign(AbstractTreeSearch.prototype, ...TreeMethods, ...VertexMethods, ...EdgeMethods, ContainerMethods, OtherMethods);

export {AbstractTreeSearch};