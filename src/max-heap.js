const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.isEmpty()) {
			return
		}

		let detached;
		detached = this.detachRoot();
		if (this.parentNodes.length>0) {
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
		}

		return detached.data;	
	}

	detachRoot() {
		let tempRoot;

		tempRoot = this.root;
		this.root = null;

		if (this.parentNodes[0] === tempRoot) {
			this.parentNodes.shift();
		}

		return tempRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];

		//delete last node
		if (lastInsertedNode.parent) {
			lastInsertedNode.parent.removeChild(lastInsertedNode);
		}
		this.parentNodes.pop();

		//set the last node to the root position
		lastInsertedNode.left = detached.left;
		lastInsertedNode.right = detached.right;
		if (detached.left) {detached.left.parent = lastInsertedNode};
		if (detached.right) {detached.right.parent = lastInsertedNode};
		if (!detached.left || !detached.right) {this.parentNodes.unshift(lastInsertedNode)};

		this.root = lastInsertedNode;
	}

	size() {
		let queue = [],
				heapSize = 0;

		if (this.root) {
			queue.push(this.root);
		}

		while (queue.length > 0) {
			if (queue[0].left !== null) {
				queue.push(queue[0].left);
			}
			if (queue[0].right !== null) {
				queue.push(queue[0].right);
			}
			queue.shift();
			heapSize++;
		}

		return heapSize;
	}

	isEmpty() {
		if (this.parentNodes.length === 0) {
			return true;
		} else {
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes.length = 0;
	}

	insertNode(node) {
		if(this.root === null) {
			// for tree
			this.root = node;

			// for array
			this.parentNodes.push(node);

			return;
		}


		//find out the parent for the new node (the first node with child === null),
		//and parent nodes (all nodes that have child === null);
		let queue = [],
				parentNode = false;

		if (this.root) {
			queue.push(this.root);
		}
		
		this.parentNodes.length = 0;

		while (queue.length > 0) {
			if ( (queue[0].left === null) || (queue[0].right === null)) {
				if (!parentNode){
					parentNode = true;
					queue[0].appendChild(node);
				}
			}

			if( (queue[0].left === null) || (queue[0].right === null) ) {
				this.parentNodes.push(queue[0]);
			}

			if (queue[0].left !== null) {
				queue.push(queue[0].left);
			}
			if (queue[0].right !== null) {
				queue.push(queue[0].right);
			}
			queue.shift();
		}


	}

	shiftNodeUp(node) {
		if ((node.parent !== null) && (node.priority > node.parent.priority)) {
			node.swapWithParent();
			this.shiftNodeUp(node);
		}

		// rebuild this.parentNodes
		let queue = [];

		if (this.root) {
			queue.push(this.root);
		}
		this.parentNodes.length = 0;

		while (queue.length > 0) {
			if( (queue[0].left === null) || (queue[0].right === null) ) {
				this.parentNodes.push(queue[0]);
			}

			if (queue[0].left !== null) {
				queue.push(queue[0].left);
			}
			if (queue[0].right !== null) {
				queue.push(queue[0].right);
			}
			queue.shift();
		}

		// set this.root
		if (node.parent === null) {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		if (node.left || node.right) {
			let biggerSide;
			
			if (node.left !== null && node.right === null) {
				biggerSide = 'left';
			} else if (node.right !== null && node.left === null){
				biggerSide = 'right';
			} else if (node.left.priority <= node.right.priority) {
				biggerSide = 'right';
			} else {
				biggerSide = 'left';
			}

			if (node[biggerSide].priority > node.priority) {
				node[biggerSide].swapWithParent();
			

				if (node.parent.parent === null) {
					this.root = node.parent;
				}

				// rebuild this.parentNodes
				let queue = [];

				if (this.root) {
					queue.push(this.root);
				}

				this.parentNodes.length = 0;

				while (queue.length > 0) {
					if( (queue[0].left === null) || (queue[0].right === null) ) {
						this.parentNodes.push(queue[0]);
					}

					if (queue[0].left !== null) {
						queue.push(queue[0].left);
					}
					if (queue[0].right !== null) {
						queue.push(queue[0].right);
					}
					queue.shift();
				}

				this.shiftNodeDown(node);
			}
		}
	}
}
module.exports = MaxHeap;
