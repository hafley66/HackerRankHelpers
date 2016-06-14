import {AbstractDFS} from './AbstractDFS';

function DFS(graph, start, goal) {
	AbstractDFS.apply(this, arguments);
}

var Super = AbstractDFS.prototype;

var Methods = {
	exploreEdge(edge) {
		var adj = this.Adj(edge.target);
		adj.next();
		if(!adj.done) {
			this.push(edge);
			this.push(adj.value);
		}
	}
};

DFS.prototype = Object.create(Super);
DFS.prototype.constructor = DFS;
Object.assign(DFS.prototype, Methods);

export {DFS};