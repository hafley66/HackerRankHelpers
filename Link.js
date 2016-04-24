function Link(value, next) {
	this.value = value;
	this.next = next;
}

Link.prototype.prepend = function (link) {
	if(!(link instanceof Link)) 
		link = new Link(link);
	link.next = this;
	return link;
}

Link.prototype.getLast = function() {
	var last;
	this.forEach((c) => {
		if(!c.next) last = c;
	});
	return last;
};

Link.prototype.append = function(link) {
	if(!(link instanceof Link)) 
		link = new Link(link);
	this.getLast().next = link;
	return this;
}

Link.prototype.forEach = function(iterFunc) {
	var prev = null;
	var curr = this;
	while(curr) {
		iterFunc(curr, prev);
		prev = curr;
		curr = curr.next;
	}
}

Link.prototype.contains = function(value) {
	var flag = false;
	this.forEach((curr, prev) => {
		if(!flag) {
			flag = curr.equals(value);
		}
	});
	return flag;
}

Link.prototype.equals = function (rhs) {
	if(rhs instanceof Link) {
		return wrapEquals(this.value, rhs.value);
	} else {
		return wrapEquals(this.value, rhs);
	}
}

Link.prototype.size = function() {
	return this.allValues().length;
}


Link.prototype.toArray = function() {
	var collect = [];
	this.forEach((curr, prev) => {
		collect.push(curr);
	});
	return collect;
}

Link.prototype.allValues = function() {
	var collect = [];
	this.forEach((c, p) => {
		collect.push(c.value);
	});
	return collect;
}

Link.prototype.remove = function(link) {
	var head = this;
	if(!(link instanceof Link)) link = new Link(link);

	this.forEach((curr, prev) => {
		if(curr.equals(link)) {
			if(prev) {
				prev.next = curr.next;
			} else {
				head = curr.next;
			}
		} 
	});
	return head;
}

Link.prototype.toString = function() {
	return this.allValues() + '';
}

function wrapEquals(lhs, rhs){
	if(lhs && lhs.equals)
		return lhs.equals(rhs);
	return lhs === rhs;
}
