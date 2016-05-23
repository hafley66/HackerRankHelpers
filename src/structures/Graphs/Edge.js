function Edge(from, to, weight=1) {
	this.from = from;
	this.to = to;
	this.weight = weight;
}

function getKey(obj) {
	if(obj && !isNil(obj.key)) return obj.key;
	return obj;
}

Edge.prototype.toString = function dumbass() {
	var {from, to, weight} = this;
	return `<< ${from.key} --:${weight}:--> ${to.key} >>\n`;
};

Edge.prototype.reversed = function() {
	return new Edge(this.to, this.from, this.weight);
};

Array.prototype.remove = function(element) {
	var index = this.indexOf(element)
	if(index > -1) {
		return this.splice(index, 1);
	}
};

Array.prototype.includes = function(element) {
	var itDoes = false;
	this.forEach(e=>{
		if(e === element) 
			itDoes = true;
	});
	return itDoes;
}

Array.prototype.unique = function() {
	var exists = new Map();
	this.forEach(element => {
		if(!exists.get(element))
			exists.set(element, true);
	});
	return [...exists.keys()];
}


Object.prototype.sortKeys = function() {
	var keys = Object.keys(this);
	keys.sort();
	var clone = {};
	keys.forEach(v => {
		clone[v] = this[v];
	})
	return clone;
}
Object.forEach = function(obj, iter) {

	var keys = Object.keys(obj);
	keys.forEach(key=>{
		iter(obj[key], key, obj);
	});
}

Object.prototype.values = function() {

}


function intersection(ary0, ary1) {
	var result = [];
	var i = ary0.length;
	while(i--) {
		if(ary1.includes(ary0[i]))
			result.push(ary0[i])
	}
	return result;
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

function mid(low, hi) {
	return low + Math.floor( (hi - low) / 2);
}

function log() {
	console.log.apply(console, arguments);
}

function intCompare(lhs, rhs){
	if(lhs < rhs)
		return -1;
	else if(lhs > rhs)
		return 1;
	else 
		return 0;
}

function asum(n) {
	return (n * (n + 1)) / 2;
}


Number.isInteger = Number.isInteger || function(value) {
	return typeof value === "number" && 
	isFinite(value) && 
	Math.floor(value) === value;
};