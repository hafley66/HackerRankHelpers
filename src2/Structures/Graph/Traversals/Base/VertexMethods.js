import {key as k, un, n, StrictMap, keyMapShorthander, MultiMap} from 'Extras';
import {callBothPrivateAndPublic, convertToUpperUnderscoreCase, BOTH} from 'src/GoofyHelpers';
import {S} from './TraversalStates';

var methods = {
	_init() {
		this.time = 0;
		this.preorder = [];
		this.postorder = [];
		this._container = this._initContainer();
		this._explored = new Set();
		this._discovered = new Set();

		this._cycles = [];
		this._trees = [];
		this._tree = new Set();

		internalBookkeeping(this);

		this.Depth(null, -1);

		this.G.V().forEach(v=>this.initVertex(v));
	},
	discoverVertex(fromTreeEdge) {
		var {source, target} = fromTreeEdge;
		
		this.P(target, source);
		this.S(target, S.GRAY);
		this.Tic(target, ++(this.time));
		
		this.Depth(target, this.Depth(source) + 1);

		this.preorder.push(target);
		this._discovered.add(target);
		this._tree.add(target);
	},
	finishVertex({source, target} = fromTreeEdge) {
		
		this.S(target, S.BLACK);
		this.Toc(target, ++(this.time));

		this.postorder.push(target);
		this._discovered.delete(target);
		this._explored.add(target);
	},
	initVertex(v) {
		this.Depth(v, Infinity);
		this.P(v, null);
		this.S(v, S.WHITE);

		this.Tic(v, Infinity);
		this.Toc(v, Infinity);
	}
}

function internalBookkeeping(ast) {
	var maps = [
	['states', 'S'], 
	['tics', 'Tic'], 
	['tocs', 'Toc'], 
	['parents', 'P'], 
	['depths', 'Depth'],
	['generators', 'Adj']];
	maps.forEach(([fieldName, methodName]) => keyMapShorthander(ast, fieldName, methodName));
}

var VertexMethods = [methods];

export default VertexMethods;