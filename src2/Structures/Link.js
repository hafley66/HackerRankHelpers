function Link(value, next) {
	if(value === undefined) this.isHead = true;
	this.value = (value === undefined? '__head__' : value);
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
	this.forEachLink((c) => {
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

Link.prototype.forEachLink = function(iterFunc) {
	var prev = null;
	var curr = this;
	while(curr) {
		iterFunc(curr, prev);
		prev = curr;
		curr = curr.next;
	}
}

Link.prototype.copy = function() {
	var curr = new Link();
	var head = curr;
	this.forEachLink(link=>{
		curr.append(link.value);
		curr = curr.next;
	});
	return head;
};

Link.prototype.addImmutably= function(otherLink) {
	var head = this.copy();
	head.getLast().next = otherLink;
	return head;
}


Link.prototype.forEach = function(iterFunc) {
	var prev = null;
	var curr = this;
	while(curr) {
		if(!curr.isHead)
			iterFunc(curr.value, prev? prev.value: null);
		prev = curr;
		curr = curr.next;
	}
}

Link.prototype.contains = function(value) {
	var flag = false;
	this.forEach((curr, prev) => {
		if(!flag) {
			flag = curr === value;
		}
	});
	return flag;
}

Link.prototype.size = function() {
	return this.allValues().length;
}


Link.prototype.values = function() {
	var collect = [];
	this.forEach((curr, prev) => {
		collect.push(curr);
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
