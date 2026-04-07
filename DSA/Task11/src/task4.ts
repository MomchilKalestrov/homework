class Node {
    id: number;
    left: Node | null = null;
    right: Node | null = null;

    constructor(id: number) {
        this.id = id;
    }
}

class BST {
    root: Node | null = null;

    insert(id: number): void {
        const newNode = new Node(id);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while (true) {
            if (id < current.id) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    height(node: Node | null = this.root): number {
        if (!node) return 0;

        const left = this.height(node.left);
        const right = this.height(node.right);

        return Math.max(left, right) + 1;
    }

    levelOrder(): number[] {
        const result: number[] = [];
        if (!this.root) return result;

        const queue: Node[] = [this.root];

        while (queue.length > 0) {
            const node = queue.shift()!;
            result.push(node.id);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return result;
    }

    findMin(node: Node): Node {
        while (node.left) node = node.left;
        return node;
    }

    delete(id: number, node: Node | null = this.root): Node | null {
        if (!node) return null;

        if (id < node.id) {
            node.left = this.delete(id, node.left);
        } else if (id > node.id) {
            node.right = this.delete(id, node.right);
        } else {
            if (!node.left && !node.right) return null;

            if (!node.left) return node.right;
            if (!node.right) return node.left;

            const successor = this.findMin(node.right);
            node.id = successor.id;
            node.right = this.delete(successor.id, node.right);
        }

        return node;
    }
}

const company = new BST();

[100, 50, 150, 25, 75, 125, 175].forEach(id => company.insert(id));

console.log('Height:', company.height());

console.log('Level order:', company.levelOrder());

company.root = company.delete(50);

console.log('After removing 50:');
console.log('Level order:', company.levelOrder());