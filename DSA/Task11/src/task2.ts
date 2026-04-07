class Node {
    value: number;
    model: string;
    left: Node | null = null;
    right: Node | null = null;

    constructor(value: number, model: string) {
        this.value = value;
        this.model = model;
    }
}

class BST {
    root: Node | null = null;

    insert(value: number, model: string): void {
        const newNode = new Node(value, model);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while (true) {
            if (value < current.value) {
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

    rangeSearch(min: number, max: number, node: Node | null = this.root): void {
        if (!node) return;

        // ако стойността е по-голяма от min, има смисъл да търсим вляво
        if (node.value > min) {
            this.rangeSearch(min, max, node.left);
        }

        // ако е в диапазона – извеждаме
        if (node.value >= min && node.value <= max) {
            console.log(node.value);
        }

        // ако стойността е по-малка от max, има смисъл да търсим вдясно
        if (node.value < max) {
            this.rangeSearch(min, max, node.right);
        }
    }
}

const bst = new BST();

const prices = [1200, 800, 1500, 600, 950, 1300, 1800, 1000];
prices.forEach(p => bst.insert(p, 'laptop-' + p));

console.log('Цени между 900 и 1400:');
bst.rangeSearch(900, 1400);