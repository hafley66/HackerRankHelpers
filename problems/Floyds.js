
function Floyds(graph) {
	var matrix = graph.toMatrix();
	var N = matrix.length;
	for(var k = 0; k < N; k++){
		for(var i = 0; i < N; i++) {
			for(var j = 0; j < N; j++){
				if ( matrix[i][j] > ( matrix[i][k] + matrix[k][j] )){
					matrix[i][j] = matrix[i][k] + matrix[k][j];
				}
			}
		}
	}
	return matrix;

}