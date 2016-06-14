import {Graph, DiGraph} from 'Graph/Graphs'
import {BFS} from 'Traversals/Base/BFS'
import {DFS} from 'Traversals/Base/DFS-Iterative'
import {DFS as DFS_R} from 'Traversals/Base/DFS'
import {SCC} from 'Traversals/SCC';
import PriorityQueue from 'Structures/PriorityQueue';
import {MultiGraphMixin} from 'Graph/MultiGraph';

function processData(input) {
    var input = input.split('\n').map(row=>row.split(' ').map(Number))
    var g = new Graph(range(input[0][0]), input.slice(1));
    debugger;
    var search = new BFS(g);
    search.run();
    var components = search.trees();
    var nationPairs = nCk(components, 2)

    var total = nationPairs.map(([one, two]) => one.length*two.length).reduce((total, next)=>total + next, 0);
    console.log(total);
} 

var x=[
[1,2],
[1,3],
[1,4],
[2,3],
[2,5],
[2,6],
[3,6],
[6,2],
[1,7],
[7,2]
];

x= [
[1,2],
[2,3],
[3,1],
[4,2],
[4,3],
[4,5],
[5,4],
[5,6],
[6,3],
[6,7],
[7,6],
[8,5],
[8,7],
[11,12],
[12,13],
[13,11],
[14,12],
[14,13],
[14,15],
[15,14],
[15,16],
[16,13],
[16,17],
[17,16],
[18,15],
[18,17]
];

// x = [
// [1,2],
// [1,3],
// [1,4],
// [2,5],		
// [6,7],
// [6,8],
// [6,9],
// [10, 11],
// [10, 12],
// [10, 13]
// ];

var g = new DiGraph(null, x);
var b = new BFS(g, 1);
var d = new DFS(g, 1);
var dR = new DFS(g, 1);
var scc = new SCC(g, 1);
window.PriorityQueue = PriorityQueue;


var p = new PriorityQueue(Number.compareDesc)
var [A, B, C] = [[0], [1], [2]];
window.A = A;
window.B = B;
window.C = C;
p.push(A, 0);
p.push(B, 1);
p.push(C, 2);
p.update(A, 25);
window.p = p;

window.mm = new MultiGraphMixin(DiGraph)(null, x);