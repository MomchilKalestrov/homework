class Node {
    public value: number;
    public leftChild: Node | null = null;
    public rightChild: Node | null = null;

    constructor(value: number) {
        this.value = value;
    };

    public toString(): string {
        return `Node = ${ this.value }`;
    };
};

class BSTree {
    public root: Node | null = null;

    public insert(value: number): void {
        const node = new Node(value);

        if (this.root === null)
            return void (this.root = node);

        let current = this.root;
        traversal: while (true) {
            if (value < current.value) {
                if (current.leftChild === null) {
                    current.leftChild = node;
                    break traversal;
                };
                current = current.leftChild;
            } else {
                if (current.rightChild === null) {
                    current.rightChild = node;
                    break traversal;
                };
                current = current.rightChild;
            };
        };
    };

    public find(value: number): boolean {
        let current = this.root;
        while (current !== null) {
            if (value < current.value) current = current.leftChild;
            else if (value > current.value) current = current.rightChild;
            else return true;
        };
        return false;
    };
    
    public traversePreOrder(visit: (value: number) => void = console.log): void {
        const traversePreOrder = (node: Node | null) => {
            if (node === null) return;
            visit(node.value);
            traversePreOrder(node.leftChild);
            traversePreOrder(node.rightChild);
        };
        traversePreOrder(this.root);
    };
    
    public traverseInOrder(visit: (value: number) => void = console.log): void {
        const traverseInOrder = (root: Node | null): void => {
            if (root === null) return;
            traverseInOrder(root.leftChild);
            visit(root.value);
            traverseInOrder(root.rightChild);
        };
        traverseInOrder(this.root);
    };

    public traversePostOrder(visit: (value: number) => void = console.log): void {
        const traversePostOrder = (root: Node | null): void => {
            if (root === null) return;
            traversePostOrder(root.leftChild);
            traversePostOrder(root.rightChild);
            visit(root.value);
        };
        traversePostOrder(this.root);
    };

    public equals(other: BSTree | null | undefined): boolean {
        if (!other) return false;
        return this.#equalsNodes(this.root, other.root);
    }

    #equalsNodes(
        first: Node | null,
        second: Node | null,
    ): boolean {
        if (first === null && second === null) return true;
        if (first !== null && second !== null) {
            return (
                first.value === second.value &&
                this.#equalsNodes(first.leftChild, second.leftChild) &&
                this.#equalsNodes(first.rightChild, second.rightChild)
            );
        }
        return false;
    }
    // #endregion

    // #region Height
    // biggest number of edges from a leaf to the root
    public height(): number {
        return this.#height(this.root);
    }

    #height(root: Node | null): number {
        if (root === null) return -1; // empty tree
        if (this.#isLeaf(root)) return 0;
        return (
            1 +
            Math.max(
                this.#height(root.leftChild),
                this.#height(root.rightChild),
            )
        );
    }
    // #endregion

    // #region Min
    // For a general binary tree (not necessarily BST)
    public treeMin(): number {
        if (this.root === null) throw new Error("Missing tree");
        return this.#treeMin(this.root);
    }

    #treeMin(root: Node): number {
        if (this.#isLeaf(root)) return root.value;

        const left = root.leftChild ? this.#treeMin(root.leftChild) : Number.POSITIVE_INFINITY;
        const right = root.rightChild ? this.#treeMin(root.rightChild) : Number.POSITIVE_INFINITY;

        return Math.min(root.value, left, right);
    }

    // For BST: left-most node
    public bsTreeMin(): number {
        if (this.root === null) throw new Error("Missing tree");
        let current: Node | null = this.root;
        let leftMost: Node = this.root;

        while (current !== null) {
            leftMost = current;
            current = current.leftChild;
        }
        return leftMost.value;
    }
    // #endregion

    // #region DepthToNode -> Get Nodes At Distance
    public getNodesAtDistance(distance: number): number[] {
        const list: number[] = [];
        this.#getNodesAtDistance(this.root, distance, list);
        return list;
    }

    #getNodesAtDistance(
        root: Node | null,
        distance: number,
        list: number[],
    ): void {
        if (root === null) return;
        if (distance === 0) {
            list.push(root.value);
            return;
        }
        this.#getNodesAtDistance(root.leftChild, distance - 1, list);
        this.#getNodesAtDistance(root.rightChild, distance - 1, list);
    }
    // #endregion

    // #region LevelOrderTraversal
    public traverseLevelOrder(visit: (value: number) => void = console.log): void {
        for (let i = 0; i < this.height(); i++) {
            for (const item of this.getNodesAtDistance(i)) {
                visit(item);
            }
        }
    }
    // #endregion

    public size(): number {
        return this.#size(this.root);
    }

    #size(root: Node | null): number {
        if (root === null) return 0;
        return 1 + this.#size(root.leftChild) + this.#size(root.rightChild);
    }

    #isLeaf(node: Node): boolean {
        return node.leftChild === null && node.rightChild === null;
    }
    // #endregion

    // #region CountOfTheLeaves
    public countLeaves(): number {
        return this.#countLeaves(this.root);
    }

    #countLeaves(root: Node | null): number {
        if (root === null) return 0;
        if (this.#isLeaf(root)) return 1;
        return this.#countLeaves(root.leftChild) + this.#countLeaves(root.rightChild);
    }
    // #endregion

    // #region IsBalanced
    public isBalanced(): boolean {
        return this.#isBalanced(this.root);
    }

    #isBalanced(root: Node | null): boolean {
        if (root === null) return true;
        const coef = this.#height(root.leftChild) - this.#height(root.rightChild);
        return (
            Math.abs(coef) <= 1 &&
            this.#isBalanced(root.leftChild) &&
            this.#isBalanced(root.rightChild)
        );
    }
    // #endregion

    // #region ValidatingBST
    public isBinarySearchTree(): boolean {
        return this.#isBinarySearchTree(this.root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    }

    #isBinarySearchTree(
        root: Node | null,
        min: number,
        max: number,
    ): boolean {
        if (root === null) return true;
        if (root.value < min || root.value > max) return false;

        // Important: use root.leftChild/root.rightChild (not this.root.*)
        return (
            this.#isBinarySearchTree(root.leftChild, min, root.value - 1) &&
            this.#isBinarySearchTree(root.rightChild, root.value + 1, max)
        );
    }
    // #endregion
};

export default BSTree