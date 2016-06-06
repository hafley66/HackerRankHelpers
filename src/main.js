import {DiGraph} from 'Graph/Graphs';
import {SCC} from 'Graph/Traversals/Components';
import {TopSort} from 'Graph/Traversals/TopologicalSort';
debugger;
var x= [[1,2],[2,5],[2,6],[2,3],[3,4],[4,3],[3,7],[4,8],[5,1], [5,6], [6,7], [7,6], [7, 8]];
var g = new DiGraph(null, x);
var scc = new SCC(g);
scc.run();

window.scc = scc;