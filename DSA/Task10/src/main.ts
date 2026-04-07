import BSTree from "./bst.js";

const tree = new BSTree();
tree.insert(7);
tree.insert(4);
tree.insert(9);
tree.insert(1);
tree.insert(6);
tree.insert(8);
tree.insert(10);

console.log("Pre-order traversal:");
tree.traversePreOrder();

console.log("\nIn-order traversal:");
tree.traverseInOrder();

console.log("\nPost-order traversal:");
tree.traversePostOrder();

console.log("\nLevel-order traversal:");
tree.traverseLevelOrder();

console.log(`\nIs 5 in the tree? ${tree.find(5)}`);
console.log(`Is 6 in the tree? ${tree.find(6)}`);

console.log(`\nHeight of the tree: ${tree.height()}`);
console.log(`Size of the tree: ${tree.size()}`);
console.log(`Number of leaves: ${tree.countLeaves()}`);

console.log(`\nIs the tree balanced? ${tree.isBalanced()}`);
console.log(`Is it a valid binary search tree? ${tree.isBinarySearchTree()}`);

console.log(`\nNodes at distance 2: ${tree.getNodesAtDistance(2)}`);

console.log(`\nMin value in the tree (BST method): ${tree.bsTreeMin()}`);
console.log(`Min value in the tree (general tree method): ${tree.treeMin()}`);

const tree2 = new BSTree();
tree2.insert(7);
tree2.insert(4);
tree2.insert(9);
tree2.insert(1);
tree2.insert(6);
tree2.insert(8);
tree2.insert(10);

console.log(`\nAre the two trees equal? ${tree.equals(tree2)}`);

const tree3 = new BSTree();
tree3.insert(1);
tree3.insert(2);
tree3.insert(3);

console.log(`\nIs the third tree balanced? ${tree3.isBalanced()}`);

export {};
