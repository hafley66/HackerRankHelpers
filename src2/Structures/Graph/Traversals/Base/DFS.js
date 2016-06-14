import {AbstractDFS} from './AbstractDFS';

function DFS(graph, start, goal) {
	AbstractDFS.apply(this, arguments);
}

var Super = AbstractDFS.prototype;

var Methods = {
	exploreEdge(edge) {
		for(var edge of this.Adj(edge.target)) {
			this.push(edge);
			this.traverse();
		}
	}
};

DFS.prototype = Object.create(Super);
DFS.prototype.constructor = DFS;
Object.assign(DFS.prototype, Methods);

export {DFS};