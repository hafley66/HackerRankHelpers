var GeneratorFunction = (function*(){}).constructor;
var gfnnext = GeneratorFunction.prototype.prototype.next;
GeneratorFunction.prototype.prototype.next = function() {
	var curr = gfnnext.apply(this, arguments);
	this.value = curr.value;
	this.done = curr.done;
	this.curr = curr;
	return this.curr;
};;

export function MultiMap(map) {
	var m = new StrictMap(map);
	m.flatten = function() {
		return this.values().flatMap(mm=>mm.values());
	};
	return m;
}

export function StrictMap(map) {
	var x = map? map : new Map();
	x.values = function() {
		return [...Map.prototype.values.apply(this)];
	};
	x.keys = function() {
		return [...Map.prototype.keys.apply(this)];
	};
	x.entries = function() {
		return [...Map.prototype.entries.apply(this)];
	};
	x.invert = function() {
		var map = new StrictMap();
		this.entries().forEach( ([key, value]) => {
			if(!map.has(value))
				map.set(value, []);
			map.get(value).push(key);
		});	
		return map;
	};
	x.hash = function() {
		var o = {};
		for(var [k, v] of this.entries())
			o[k] = v;
		return o;
	};
	x.invertSingle = function() {
		var map = new StrictMap();
		this.entries().forEach( ([key, value] ) => {
			map.set(value, key);
		});
		return map;
	}
	return x;
}

export function get(obj, path) {
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

export function values(o) {
	var t = [];
	for(var key in o) 
		t.push(o[key]);
	return t;
}

export function intersection(ary0, ary1) {
	var result = [];
	var i = ary0.length;
	while(i--) {
		if(ary1.includes(ary0[i]))
			result.push(ary0[i])
	}
	return result;
}

export function isNil(obj) {
	return obj === null || obj === undefined;
}

export function nil(args) {
	var isOne;
	args.forEach(element=>{
		if(isNil(element))
			isOne = true;
	});
	return isOne;
}

export function Na(args) {
	var allNil = true;
	args.forEach(element=>{
		if(!isNil(element))
			allNil = false;
	});
	return allNil;
}

export function N(args) {
	if(!isNil(args) && args.length)
		return nil(args);
	else
		return isNil(args);
}

export function un(a) {
	return a === undefined;
}

export function n(args) {
	return isNil(args);
}

export function range(start, end) {
	if(isNil(end)) [start, end] = [0, start];
	var r = [];
	
	for (var i = start; i < end; i++) { 
		r.push(i); 
	}
	
	return r;
}

export function mid(low, hi) {
	return low + Math.floor( (hi - low) / 2);
}

export function log() {
	console.log.apply(console, arguments);
}

export function intCompare(lhs, rhs){
	if(lhs < rhs)
		return -1;
	else if(lhs > rhs)
		return 1;
	else 
		return 0;
}

export function asum(n) {
	return (n * (n + 1)) / 2;
}

export function fill( n, e ) {
	var x= [];
	for(var i = 0; i < n; i++)  x.push(e);
		return x;
}



export function key(o) {
	if(!n(o) && !un(o.key))
		return o.key;
	else 
		return o;
}
export function pojo() {
	return Object.create(null);
} 

export function mapShorthand(map, key, arg) {
	if(!un(arg)) return map.set(key, arg);
	else return map.get(key);
}

export function invoke(obj, path, args){
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
};

Array.prototype.flatten = function() {
	return this.reduce((ary, next)=> {
		if(Array.isArray(next))
			ary.push(...next);
		else 
			ary.push(next);
		return ary;
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

Array.prototype.sortBy = function(path) {
	var copy = this.slice();
	copy.sort((a,b)=>get(a, path) - get(b, path));
	return copy;
};

Array.prototype.sort = function(f) {
	if(typeof f === 'string')
		return this.sortBy(f);
	else
		return oldSort.apply(this, arguments);
};

var oldMap = Array.prototype.map;

Array.prototype.map = function(f) {
	if(typeof f === 'string')
		return this.mapBy(f);
	else
		return oldMap.apply(this, arguments);
};

Array.prototype.mapBy = function(path) {
	return this.map(this, e=>get(e, path));
};

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

Array.prototype.contains = Array.prototype.includes;

Array.prototype.difference = function(...others) {
	var copy = this.slice(0);
	for(var other of others){
		for(var element of other){
			copy.remove(element);
		}
	}
	return copy;
};

Array.prototype.reduceProduct =function(init=1) {
	return this.reduce((product, next) => product*next, init);
};
Array.prototype.reduceSum = function(init = 0){
	return this.reduce((sum, next)=>sum+next, init);
};

var k = key;
export function keyMapShorthander(instance, mapAt, shorthandAt) {
	var map = new StrictMap();
	instance[mapAt] = map;
	instance[shorthandAt] = function shorthand(obj, val) {
		return mapShorthand(map, k(obj), val);
	}
}

export function printMatrix(matrix) {
	var lines = ['\n'];
	for(row of matrix) 
		lines.push(row.join('\t'));
	return lines.join('\n');
}

var binaryHelpers = {
	one(){
		try {return Number(this) === 1 }
		catch(err) { return false }
	},
	ones(){
		return indexChars(this.bs.reverse(), '1');
	},
	zero(){
		try { return Number(this) === 0 }
		catch(err) { return false }
	},
	zeros(){
		return indexChars(this.bs.reverse(), '0');
	}
};

export function defGet(obj, key, func) {
	Object.defineProperty(obj, key, {
		get(){
			return func.apply(this, arguments);
		}
	});
}

export function defGets(obj, hash) {
	for(var key in hash)
		defGet(obj, key, hash[key]);
}

String.prototype.reverse = function() {
	return [...this].reverse().word;
};

function indexChars(str, char){
	var i;
	var last = 0;
	var indices = [];
	var size = str.length;

	while(( i = str.indexOf(char, last) ) > -1){
		indices.push(i);
		last = i + 1;
	}
	return indices;
}

function biResolve(a,b){
	var until = Math.max(a.length,b.length);
	return [a.leftPadTo(until), b.leftPadTo(until)];
}



var biops = {
	AND(bin) {
		return this._binOp(bin, this._and);
	},
	OR(bin) {
		return this._binOp(bin, this._or);
	},
	XOR(bin) {
		return this._binOp(bin, this._xor);
	},
	_and: ( (a,b)=>(v, i) => (+(v.one && b[i].one)) +''),
	_or: ((a,b)=>(v, i)=> (+(v.one || b[i].one)) + ''),
	_xor: ( (a,b)=>(v,i)=> (+(( v.one + b[i].one) === 1)) + ''),
	_binOp(bin, func) {
		var a = this.bs;
		if(!un(bin)){
			var b = bin.bs;
			[a,b] = biResolve(a,b);
			return a.map(func(a,b));
		} 
		return a;
	},
	NOT() {
		return this.bs.map(d=> d.zero? '1':'0');
	},
	toggle(bit) {
		var bsa = [...this.bs].reverse();
		bsa[bit] = bsa[bit].one ? '0' : '1';
		return bsa.word.reverse();
	},
	set(bit){
		var bsa = [...this.bs].reverse();

		bsa[bit] = '1';
		return bsa.word.reverse();
	},
	unset(bit) {
		var bsa = [...this.bs].reverse();
		bsa[bit] = '0';
		return bsa.word.reverse();
	},
	msb() {
		return this.ones.last();
	},
	lsb() {
		return this.ones.first();
	},
	bitShift(by) {
		var bs = this.bs;
		if(by) {
			by = by.bi;
			var t = new Array(this.length);
			[...bs].forEach((c, i) => {
				var shifted = (i + by) % bs.length;
				if(shifted < 0)
					shifted += (bs.length);
				t[shifted] = c;
			});
			return t.word;
		} 
		return bs;
	},
	">>": function(by) {
		return this.bitShift(by);
	},
	"<<": function(by) {
		return this.bitShift(-by);
	},
	"&": function(bin) {return this.AND(bin)},
	"|": function(bin){return this.OR(bin)},
	"^": function(bin){return this.XOR(bin)},

};

String.prototype.map = function(fun) {
	var chars = [...this];
	return chars.map(fun).word;
};

var sbinary = {
	bs64() {
		return this.leftPadTo(64);
	},
	bs(){
		return this;
	},
	bi(){
		try {
			return parseInt(this, 2);
		} catch(err) {
			return 0;
		}
	}
};
var nbinary = {
	bs() {
		return this.toString(2);
	},
	bs64() {
		return this.bs.padTo(0, -64);
	},
	bi() {return this;}
};

defGets(String.prototype, sbinary);
defGets(Number.prototype, nbinary);
[String, Number].forEach(p=>{
	defGets(p.prototype, binaryHelpers);
	Object.assign(p.prototype, biops);
});

String.prototype.pad = function(char, amount){
	if(amount) {
		var t = (char+'').repeat(Math.abs(amount));
		if(amount < 0) return t + this;
		else return this + t;
	}
	return this;
};
String.prototype.padTo= function(char, length) {
	if(length && this.length < Math.abs(length)) {
		var to= 0;
		if(length < 0) 
			to = length + this.length;
		else
			to = this.length - length;
		return this.pad(char, to);
	}
	return this;
};

Number.prototype.compareTo = function(other) {
	if(!un(other))
		return intCompare(this, other);
	return -1;
};
Array.prototype.isEmpty = function() {
	return !this.length;
}

defGet(Array.prototype, 'word', function() {
	return this.join('') ;
});

export function baseCompareTo(x,y) {
	if(!un(x) && x.compareTo)
		return x.compareTo(y);
	else if(!un(y) && y.compareTo)
		return -1 * y.compareTo(x);
	else {
		if(x < y)
			return -1;
		else if(x > y) 
			return 1;
		else 
			return 0;
	}
}

Number.compareAsc = function(a,b) {
	return a-b;
};
Number.compareDesc = function(a,b) {
	return b-a;
};