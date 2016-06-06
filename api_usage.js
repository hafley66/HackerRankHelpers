a.value(setter);

a.to(b) //boolean.
a.from(b) //boolean.
a.reaches(b) //boolean.
a.near(b) //boolean.
a.shortestPath(b) //returns array of edges. 

a.E()\e() //return all edges incident with this node.
a.E(b, weight)\e(b, weight) //set weight of edge.
a.E(b) //Return or create edge if doesnt exist.
a.e(b) //return (no create) edge.

a.In() // sequence of nodes leading to node.
a.Out() // sequence of nodes near from node.
a.in() // sequence of edges incoming to node.
a.out() //sequence of edges outgoing from node.
a.distanceTo(b);
a.component();

a.V()\v() //sequence of neighbors.
a.G() //The graph of the node.


graph.V()/v() //the set of all vertices
graph.V(a) // get node and create if null.
graph.v(a) //get node, null if no exist.

graph.E(a,b, weight)/e(...) //set edge a --> b to weight.
graph.E(a)/e(a) //get all edges incident to a.
graph.E()/e() //get all edges.
graph.Has(a,b) //same as has, but with objects as inputs.
graph.has(a, b) 
	// primitive inputs only.
	// if edge or array, boolean for edge.
	// if single key value, if vertex exists.
	// if two single values, for edge. 
graph.asMatrix(nullValue);
graph.extend(); //Return graph with all prototypes of every object.

graph.N(a) //get adjacent neighbors of node.
graph.N() //undefined.


graph.isSubgraph(superGraph);
graph.isSupergraph(subgraph);
graph.isConnected();
graph.isComplete();
graph.isBitartite();
graph.isEmpty();
graph.isOriented();
graph.isRegular(r);
graph.isIrregular();
graph.isAcyclic();
graph.isCyclic();
graph.isTree();
graph.isForest();

graph.hasOddCycles();

graph.minDegree();
graph.maxDegree();
graph.order();
graph.size();
graph.weight();

graph.odds(); //Sequence of all odd vertices.
graph.evens(); //Sequence of all even vertices.
graph.diameter();
graph.complement();

graph.components(); //as sets of vertices keys.
graph.Components(); //as graphs

graph.incidenceMatrix();
graph.adjacencyMatrix();

e.from() // return Vertex.
e.to() // return Vertex.
e.weight()	//Any.
e.V() //return set of incident on bv.
e.E() //All edges adjacent to this.
e.G() //Graph;
e.reversed(); //reverse from and to.
e.equals(otherEdge) // boolean;
e.incident(node) // boolean.
e.adjacent(otherEdge); //boolean, if two edges adjacent.
e.isBridge();
e.isLeaf();
e.isIsolated();

//Algorithms
DFS(G);
BFS(G);
MaxFlow(G);
Dijkstras(G, source);
Prims(G, source);
BellmanFord(G, source);
Kruskals(G, source);
Components(G);
SCComponents(G);
TopologicalSearch(G);
AStar(G, source);

IsConnected(G);
IsTree(G);
IsDAG(G);

`GraphArithmetic:::
 Union,
 Difference,
 Cartesian Product
 Join,
 Intersection,
`
ga.minus(node/edge/graph);
ga.join(graph);
ga.cartesianProduct(graph);
ga.union(graph);
ga.intersection(graph);
