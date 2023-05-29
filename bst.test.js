const {BST, inOrderRecur, Node, height} = require('./bst');

//Preliminary test only. It could be better !
describe('Binary Search Tree', () => {
	let tree;
  	beforeEach(() => {
		tree = new BST();
  	});

	it('Correctly return null if nothing passed in', () => {
		expect(tree.root).toEqual(null);
	});

 	it('Should correctly construct a binary tree', () => {
		const arr = [-7, -5, -1, 0, 1, 2,  3,  4, 7, 9, 27];
		tree.root = tree.buildTree(arr)

		const expectedResult =
		[
		  -7, -5, -1, 0, 1,
		   2,  3,  4, 7, 9,
		  27
		];

		//Using in order we would get a sorted array
		expect(inOrderRecur(tree.root)).toEqual(expectedResult);
 	});
	it('should return the node containing a given value in the binary search tree', () => {
		const arr = [-1, -5, -8, 1 , 2, 3];
		tree.root = tree.buildTree(arr)
		
		arr.forEach(val => {
			let [parentNode, currentNode]  = tree.findNode(val)
			expect(currentNode.value).toEqual(val);
		});
	});

	it('Should insert a value into the binary search tree', () => {
		const arr = [-1, -5, -8, 1 , 2, 3];
		tree.root = tree.buildTree(arr)
		
		const insertedArr = [11, 36, 89];
		insertedArr.forEach(val => {
			tree.insert(val)

			let [parentNode, currentNode]  = tree.findNode(val)
			expect(currentNode.value).toEqual(val);
		})
	});

	it('should remove a value from the binary search tree', () => {
		const arr = [-1, -5, -8, 1 , 2, 3];
		tree.root = tree.buildTree(arr)

		let [parentNode, currentNode]  = tree.findNode(1)
		expect(currentNode.value).toEqual(1);
		tree.remove(1);
		[parentNode, currentNode]  = tree.findNode(1)
		expect(currentNode).toEqual(null);
	});


	it('should return the height of a node in the binary search tree to leaf', () => {
		expect(height((new BST()).root)).toBe(0);


		const arr = [-7, -5, -1, 0, 1, 2,  3,  4, 7, 9, 27];
		tree.root = tree.buildTree(arr)

		expect(height(tree.root)).toEqual(4)
	});

	it('should return if the tree is balance', () => {
		const arr = [-7, -5, -1, 0, 1, 2,  3,  4, 7, 9, 27];
		tree.root = tree.buildTree(arr)

		expect((tree.isBalanced())).toEqual(true);
		
		//Heavily skewed so it should be unbalanced
		tree.insert(-10);
		tree.insert(-20);
		tree.insert(-30);
		tree.insert(-40);
		tree.insert(-50);

		expect((tree.isBalanced())).toEqual(false);
	});

	it('should be able to rebalance itself', () => {
		const arr = [-7, -5, -1, 0, 1, 2,  3,  4, 7, 9, 27];
		tree.root = tree.buildTree(arr)
		//Heavily skewed so it should be unbalanced
		tree.insert(-10);
		tree.insert(-20);
		tree.insert(-30);
		tree.insert(-40);
		tree.insert(-50);
		expect((tree.isBalanced())).toEqual(false);
		tree.rebalance();
		expect((tree.isBalanced())).toEqual(true);
	});

	it('should be able to find depth', () => {
		const arr = [-7, -5, -1, 0, 1, 2,  3,  4, 7, 9, 27, 100];
		tree.root = tree.buildTree(arr)

		let [parentNode, currentNode]  = tree.findNode(100)
		expect(tree.depth(currentNode)).toEqual(height(tree.root))
	});
});

