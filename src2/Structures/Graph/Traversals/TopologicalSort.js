import {DFS} from './Base/DFS';

var Methods = {
	isFinished() {
		return this.hasCycles();
	},
	onForestFinish() {
		if(this.hasCycles())
			return [];
		return this.postorder.reverse();
	}
};

function TopologicalSort(graph, source=1) {
	var dfs = new DFS(graph, source);
	Object.assign(dfs, Methods);
	return dfs;
}

export {TopologicalSort};