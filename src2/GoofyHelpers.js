import {keyMapShorthander} from 'Extras';


export function stripUnderscore(collection) {
	var map = {};
	_.forEach(collection, (value, key) => {
		map[_.replace(key, '_', '')] = function(){};
	});
	return map;
}

export function convertToUpperUnderscoreCase(str) {
	return str.replace(/([A-Z])/g, ' $1').split(' ').map(s=>s.toUpperCase() ).join('_');
}

export function BOTH(obj, method, privateFirst=true) {
	return function privateFirstCurry(...args) {
		if(privateFirst) {
			obj['_' + method](...args);
			obj[method](...args);
		} else {
			obj[method](...args);
			obj['_' + method](...args);
		}
	};
}