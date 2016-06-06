function MultiMap(map) {
	var m = new StrictMap(map);
	m.flatten = function() {
		return this.values().flatMap(mm=>mm.values());
	};
	return m;
}

function StrictMap(map) {
	var x = map? map : new Map();
	x.values = function() {
		return [...Map.prototype.values.apply(this)];
	};
	x.keys = function() {
		return [...Map.prototype.keys.apply(this)];
	};
	return x;
}

function get(obj, path) {
	if(!n(obj)){
		var keys = path.split('.');
		var next = obj;
		var k;
		while(keys.length) {
			k = keys.shift();
			if(!n(next[k]))
				next = next[k];
			else return undefined;
		}
		return next;
	}
}

function values(o) {
	var t = [];
	for(var key in o) 
		t.push(o[key]);
	return t;
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

function nil(args) {
	var isOne;
	args.forEach(element=>{
		if(isNil(element))
			isOne = true;
	});
	return isOne;
}

function Na(args) {
	var allNil = true;
	args.forEach(element=>{
		if(!isNil(element))
			allNil = false;
	});
	return allNil;
}

function N(args) {
	if(!isNil(args) && args.length)
		return nil(args);
	else
		return isNil(args);
}

function un(a) {
	return a === undefined;
}

function n(args) {
	return isNil(args);
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

function fill( n, e ) {
	var x= [];
	for(var i = 0; i < n; i++)  x.push(e);
		return x;
}

Array.prototype.remove = function(element) {
	var index = this.indexOf(element)
	if(index > -1) {
		this.splice(index, 1);
		return this;
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

function key(o) {
	if(!n(o) && !un(o.key))
		return o.key;
	else 
		return o;
}
function pojo() {
	return Object.create(null);
} 

function mapShorthand(map, key, arg) {
	if(!un(arg)) return map.set(key, arg);
	else return map.get(key);
}

function invoke(obj, path, args){
	var func = get(obj, path)
	if(!un(func) && func instanceof Function)
		return func.apply(obj, args);
	else return func;
}

Array.prototype.unique = function() {
	var exists = new Map();
	this.forEach(element => {
		if(!exists.get(element))
			exists.set(element, true);
	});
	return [...exists.keys()];
};

Array.prototype.flatMap = function(func) {
	return this.map(func).flatten();
}

Array.prototype.flatten = function() {
	return this.reduce((snowball, element) => {
		return snowball.concat(element);
	}, []);
};

Array.prototype.peek = function() {
	return this[this.length - 1];
}

Array.prototype.poll = function() {
	return this[0];
};

Array.prototype.last = Array.prototype.peek;

Array.prototype.first = Array.prototype.poll;


var oldSort = Array.prototype.sort;
Array.prototype.sort = function(funcish) {
	if(typeof funcish === 'function') 
		return oldSort.call(this, funcish);
	else if(typeof funcish === 'string') {
		var key = funcish;
		return oldSort.call(this, (a, b) => (get(a, key) - get(b, key)));
	}
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

Number.isInteger = Number.isInteger || function(value) {
	return typeof value === "number" && 
	isFinite(value) && 
	Math.floor(value) === value;
};

var k = key;
function keyMapShorthander(instance, mapAt, shorthandAt) {
	var map = new StrictMap();
	instance[mapAt] = map;
	instance[shorthandAt] = function shorthand(obj, val) {
		return mapShorthand(map, k(obj), val);
	}
}

export {
	MultiMap, StrictMap, fill, invoke, get, asum, nil, range, isNil, un, n, key, mapShorthand, keyMapShorthander
};