var Components = (function Components(BFS){
	function GraphComponents(graph) {
		BFS.call(this, graph);
		Object.assign(this, GraphComponents.prototype);
		
	}
	
	var Methods = {
		
	};
	
	Object.assign(GraphComponents.prototype, Methods);
	
	return GraphComponents;
	
})(BFS);