// function fib(n: number) {
//     if (n <= 2) return 1;
//     else return fib(n - 1) + fib(n - 2);
// }

// console.log(fib(3));
// console.log(fib(4));
// console.log(fib(5));
// console.log(fib(6));
// console.log(fib(7));
// console.log(fib(10));

class TreeNode {
    constructor(
        public data: number,
        public left?: TreeNode,
        public right?: TreeNode
    ) {}
}

const root = new TreeNode(
    2,
    new TreeNode(
        3,
        new TreeNode(5),
        new TreeNode(7, new TreeNode(11), new TreeNode(3))
    ),
    new TreeNode(1)
);

function find_sum(rootNode: TreeNode) {
    if (!rootNode) return 0;
    return rootNode.data + find_sum(rootNode.left) + find_sum(rootNode.right);
}

function find_sum_non_leaf(rootNode: TreeNode) {
    if (!rootNode) return 0;
    else if (!rootNode.right && !rootNode.left) return 0;
    else
        return (
            rootNode.data +
            find_sum_non_leaf(rootNode.left) +
            find_sum_non_leaf(rootNode.right)
        );
}
