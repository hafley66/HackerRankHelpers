function Edge(from, to, weight=1) {
	this.from = from;
	this.to = to;
	this.weight = weight;
}

function getKey(obj) {
	if(obj && !isNil(obj.key)) return obj.key;
	return obj;
}

Array.prototype.remove = function(element) {
	var index = this.indexOf(element)
	if(index > -1) {
		return this.splice(index, 1);
	}
};

Object.prototype.sortKeys = function() {
	var keys = Object.keys(this);
	keys.sort();
	var clone = {};
	keys.forEach(v => {
		clone[v] = this[v];
	})
	return clone;
}
Object.prototype.forEach = function(iter) {
	var keys = Object.keys(this);
	keys.forEach(key=>{
		iter(this[key], key, this);
	});
}

function isNil(obj) {
	return obj === null || obj === undefined;
}

function range(start, end) {
	if(isNil(end)) [start, end] = [1, start];
	var r = [];
	
	for (var i = start; i <= end; i++) { 
		r.push(i); 
	}
	
	return r;
}