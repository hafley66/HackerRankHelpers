var DFS = (function DFS(){
	
	var WHITE= 0,
	GRAY= 1,
	BLACK= 2;
	
	

	function DFS(G, source) {
		Object.setPrototypeOf(this, G);
		Object.assign(this, DFS.prototype);

		this.source = this.v(source);

		this.time = 0;
		keyMapShorthander(this, 'parents', 'P');
		keyMapShorthander(this, 'states', 'S');
		keyMapShorthander(this, 'tics', 'Tic');
		keyMapShorthander(this, 'tocs', 'Toc');
		this.curr = {
			source: null,
			to: null
		};
	}
	
	var Methods = {
		init() {
			this.V().forEach(v=>this._initVertex(v));
		},
		_initVertex(vertex){
			this.P(vertex, null);
			this.S(vertex, WHITE);
			this.Tic(vertex, -1);
			this.Toc(vertex, -1);
			this.initVertex(vertex);
		},
		run(){
			this.init();
			
			if(un(this.source)){
				this.V().forEach(v=>{
					if(this.Tic(v) === -1)
						this.visit(v);
				});
			} else 
				this.visit(this.source);

			this.onFinish();
		},
		visit(source) {
			this.curr.source = source;
			this._discoverVertex(source);

			this._Adj(source).forEach(edge => {
				var target = this.curr.target = edge.except(source);

				this.examineEdge();
				
				if(this.isTreeEdge()){
					this._onTreeEdge();

					this.visit(target);
					
					this.curr.source = source; this.curr.target = target;

					this.afterTreeEdge();
				} 
				else {
					this.onNonTreeEdge();
					if(this.isBackEdge()) 
						this.onBackEdge();
					else if(this.isCrossEdge())
						this.onCrossEdge();
					else if(this.isForwardEdge())
						this.onForwardEdge();
				}

				if(this.isFinished()) 
					return [source, target];
			});  

			this._finishVertex(source);
		},
		_discoverVertex(source=this.curr.source) {
			this.S(source, GRAY);
			this.Tic(source, ++(this.time));
			this.discoverVertex(source);
		},
		_Adj(vertex=this.curr.source) {
			return this.Adj() || vertex.E();
		},
		_finishVertex(vertex=this.curr.source){
			this.S(vertex, BLACK);
			this.Toc(vertex, ++(this.time));
			this.finishVertex();
		},
		_onTreeEdge({source, target} = this.curr) {
			this.P(target, source);
			this.S(target, GRAY);
			this.onTreeEdge();
		},

		initVertex(){},

		discoverVertex(){},
		
		Adj() {},

		examineEdge(){},
		
		onTreeEdge() {},
		afterTreeEdge(){},
		
		onNonTreeEdge(){},
		onBackEdge() {},
		onCrossEdge() {},
		onForwardEdge(){},

		finishVertex(){},

		onFinish() {},

		isFinished() {
			return false;
		},
		isTreeEdge(target=this.curr.target) {
			return this.S(target) === WHITE;
		},
		isBackEdge({source, target} = this.curr) {
			var isUndirectedBackEdge = (this.S(target) !== BLACK) && this.P(source) !== target;
			return isUndirectedBackEdge;
		},
		isCrossEdge(){

		},
		isForwardEdge(){

		}
	};

	Object.assign(DFS.prototype, Methods);
	
	return DFS;
})();

var BFS = (function BFS(){
	var WHITE= 0,
	GRAY= 1,
	BLACK= 2;

	function BFS(G, source) {
		Object.setPrototypeOf(this, G);
		Object.assign(this, BFS.prototype);

		this.source = this.v(source);

		this.time = 0;
		keyMapShorthander(this, 'parents', 'P');
		keyMapShorthander(this, 'states', 'S');
		keyMapShorthander(this, 'tics', 'Tic');
		keyMapShorthander(this, 'tocs', 'Toc');
		keyMapShorthander(this, 'distances', 'D');
	}
	
	var Methods = {
		init() {
			this.V().forEach(v=>this._initVertex(v));
			this.D(this.source, 0);
			this.S(this.source, GRAY);
		},
		
		run() {
			this.init();
			var Q = [this.source];
			this.discoverVertex(this.source);

			while(Q.length) {
				var source = Q.shift();

				this.examineVertex(source);
				this._getEdges(source).forEach(edge => {

					var to = edge.except(source);
					this.examineEdge(source, to, edge);

					if(this.isTreeEdge(source, to, edge)) {
						Q.push(to);
						this.discoverVertex(to);
						this._onTreeEdge(source, to, edge);
					} 
					else this._onNonTreeEdge(source, to, edge);
				});

				this.finishVertex(source);
			}
		},
		_initVertex(v) {
			this.D(v, Infinity);
			this.P(v, null);
			this.S(v, WHITE);
			
			this.initVertex(v);
		},
		_getEdges(v){
			return this.getEdges(v) || v.e();
		},
		_onTreeEdge(source, to, edge){
			this.D(to, this.D(source) + edge.weight());
			this.P(to, source);
			this.S(to, GRAY);
			this.onTreeEdge(source, to, edge);
		},
		_onNonTreeEdge(source, to, edge){
			this.onNonTreeEdge(source, to, edge);
			if(this.S(to) === GRAY) this.onGrayTarget(source, to, edge);
			else if(this.S(to) === BLACK) this.onBlackTarget(source, to, edge);
		},

		initVertex(v){},
		discoverVertex(v){},
		examineVertex(v) {},
		getEdges(v) {},
		examineEdge(source, to, edge) {},
		onTreeEdge(source, to, edge){},
		onNonTreeEdge(source, to, edge){},
		onGrayTarget(source, to, edge){},
		onBlackTarget(source, to, edge){},
		finishVertex(v){},

		D(vertex, distance) {
			return mapShorthand(this.distances, k(vertex), distance);
		},
		P(vertex, parent) {
			return mapShorthand(this.parents, k(vertex), parent);
		},
		S(vertex, state) {
			return mapShorthand(this.states, k(vertex), state);
		},
		isTreeEdge(source, to, edge) {
			return this.S(to) === WHITE;
		}
	};
	
	Object.assign(BFS.prototype, Methods);
	
	return BFS;
	
})();