import {un, n, defGet, intCompare, keyMapShorthander, baseCompareTo} from 'Extras';

var Methods = {
	pull() {
		var min = -1;
		var c = this;
		if(c.length > 0){
			var min = c.shift();
			c.K(min, null);
			c.I(min, -1);
			if(c.length > 0){
				var last = c.pop();
				c.unshift(last);
				c.I(last, 0);
				c._bubbleDown(0);
			}
		}
		return min;
	},
	upsert(e, key) {
		if(n(this.I(e)) && !un(e))
			this.push(e, key);
		else
			this.update(e, key);
	},
	push(e, key){
		if(e !== undefined) {
			var c = this;
			if(key === undefined)
				key = Number(e);

			if(c.contains(e)) throw new Error('Cannot add same items to map');

			Array.prototype.push.call(c, e);
			this.K(e, key);
			this.I(e, this.length-1);
			console.log('keys for ', e, key);
			c._bubbleUp(c.length - 1);
		}
	},
	concat(array) {
		if(array && array.length)
			array.forEach(e=>this.push(e));
	},
	peek() {
		return this.first();
	},
	
	update(element, key){
		var index = this.I(element);
		var parent = this._parent(index);
		var oldKey = this.getKey(element);

		if(!n(index) && oldKey !== key){
			this.K(element, key);

			this._bubbleUp(index);
			if(this[index] === element)
				this._bubbleDown(index);
		}
	},	
	getKey(element) {
		return this.K(element);
	},


	_compareIndices(i, j) {
		var c = this;
		return c._compareElements(c[i], c[j]);
	},
	_compareElements(x, y){
		var [k,kk] = [x,y].map(a=>this.getKey(a));
		return this._compareKeys(k, kk);
	},
	_compareKeys(k, kk) {
		return baseCompareTo(k,kk);
	},
	_swapIndices(xi, yi){
		var I = this.I;
		var c = this;

		var [x, y] = [c[xi], c[yi]];
		c[xi] = y
		c[yi] = x;
		I(x, yi);
		I(y, xi);
	},
	_swapElements(x,y) {
		var I = this.I; 
		var c = this;
		
		var [xi, yi] = [x,y].map(I);
		c[xi] = y
		c[yi] = x;
		I(x, yi);
		I(y, xi);
	},
	_bubbleUp(child){
		var parent = this._parent(child);
		if(parent !== -1) {
			var comparison = this._compareIndices(parent, child);
			if(comparison < 0){
				this._swapIndices(child, parent);
				this._bubbleUp(parent);
			}
		}
	},
	_bubbleDown(parent){
		var child, min = parent;
		child = this._leftChild(parent);
		min = parent;

		for(var offset = 0; offset <= 1; offset++){
			var cchild = child + offset;
			if(cchild < this.length){
				if(this._compareIndices(min, cchild) < 0){
					min = cchild;
				}
			}
		}
		if(min !== parent){
			this._swapIndices(parent, min);
			this._bubbleDown(min);
		}
	},
	_makeHeap(array) {
		for(var i = 0; i < array.length; i++)
			this.push(array[i]);
	}
}

var cbt = {
	_leftChild(i) {
		return 2*(i) + 1;
	},
	_rightChild(i){
		return this._leftChild(i) + 1;
	},
	_parent(i){
		if(i === 0) return -1;
		return Math.floor((i - 1)/2);
	}
};


function PriorityQueue(order) {
	var heap = [];
	keyMapShorthander(heap, 'indices', 'I');
	keyMapShorthander(heap, 'keys', 'K');
	Object.assign(heap, Methods, cbt);
	heap._compareKeys = order || heap._compareKeys;
	return heap;
}

export default PriorityQueue;
