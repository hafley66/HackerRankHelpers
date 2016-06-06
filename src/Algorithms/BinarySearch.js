function BinarySearch(source, target, params) {
	function get(index) {
		if(typeof source === 'function') return source(index);
		else return source[index];
	}

	function compare(lhs, rhs, index) {
		if(params.compare)
			return params.compare(lhs, rhs, index);
		else return intCompare(lhs, rhs);
	}
	

	var L = params.L || 0;
	var R = params.R || source.length;
	
	var index;
	var currentValue;

	var loops = 0;
	var compared;

	while(L <= R && (loops++) !== 1000) {
		index = mid(L, R);
		currentValue = get(index);
		compared = compare(currentValue, target, index);
		if(compared < 0) L = index + 1;
		else if(compared > 0) R = index - 1;
		else break;
	}
	if(L > R){
		// log('Could not find target value');
	}

	return index;
}