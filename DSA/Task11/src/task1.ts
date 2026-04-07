class BSTNode {
    key: string;
    owner: string;
    left: BSTNode | null = null;
    right: BSTNode | null = null;

    constructor(key: string, owner: string) {
        this.key = key;
        this.owner = owner;
    }
}

class BST {
    root: BSTNode | null = null;

    insert(key: string, owner: string): void {
        const newNode = new BSTNode(key, owner);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while (true) {
            if (key < current.key) {
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

    search(key: string): boolean {
        let current = this.root;

        while (current) {
            if (key === current.key) return true;
            current = key < current.key ? current.left : current.right;
        }

        return false;
    }

    inOrder(node: BSTNode | null = this.root): void {
        if (!node) return;

        this.inOrder(node.left);
        console.log(`${node.key} - ${node.owner}`);
        this.inOrder(node.right);
    }
}

const bst = new BST();

bst.insert('CB1234AA', 'Ivan Petrov');
bst.insert('A5555PB', 'Maria Ivanova');
bst.insert('PB0001KK', 'Georgi Georgiev');
bst.insert('H9999TT', 'Petar Dimitrov');
bst.insert('B2222BT', 'Dimitar Nikolov');

const exists = bst.search('PB0001KK');
console.log('PB0001KK съществува ли?', exists);

console.log('Всички регистрационни номера:');
bst.inOrder();