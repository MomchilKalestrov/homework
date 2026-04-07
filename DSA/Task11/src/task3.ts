class Node {
    word: string;
    left: Node | null = null;
    right: Node | null = null;

    constructor(word: string) {
        this.word = word;
    }
}

class BST {
    root: Node | null = null;

    insert(word: string, printPosition: boolean = false): void {
        const newNode = new Node(word);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while (true) {
            if (word < current.word) {
                if (!current.left) {
                    printPosition && console.log(`Добавяме ${ newNode.word } от ляво на ${ current.word }`);
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    printPosition && console.log(`Добавяме ${ newNode.word } от дясно на ${ current.word }`);
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    searchWithSteps(word: string): number {
        let current = this.root;
        let steps = 0;

        while (current) {
            steps++;

            if (word === current.word) {
                return steps;
            }

            current = word < current.word ? current.left : current.right;
        }

        return -1;
    }
}

const bst = new BST();

['banana', 'apple', 'cherry', 'date', 'elderberry', 'fig']
    .forEach(w => bst.insert(w));
    
const steps = bst.searchWithSteps('cherry');
console.log('Стъпки до cherry:', steps);

bst.insert('apricot', true);
