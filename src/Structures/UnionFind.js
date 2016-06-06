function UnionFind() {
	this.parent = new Map();
	this.rank = new Map();
}

UnionFind.prototype.makeSet = function(x) {
	this.parent.set(x, x);
	this.rank.set(x, 0);
};

UnionFind.prototype.union = function(x, y) {
	var xRoot = this.find(x);
	var yRoot = this.find(y);

	var xRank = this.rank.get(x);
	var yRank = this.rank.get(y);

	if(xRoot == yRoot) return;

	if( xRank < yRank ) 
		this.parent.set(xRoot, yRoot);
	else if( xRank > yRank )
		this.parent.set(yRoot, xRoot);
	else {
		this.parent.set(yRoot, xRoot);
		this.rank.set(xRoot, xRank + 1);
	}
}

UnionFind.prototype.find = function(x) {
	if( this.parent.get(x) !== x )
		this.parent.set(x, this.find(this.parent.get(x)));
	return this.parent.get(x);
}

