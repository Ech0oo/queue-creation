class Node {

	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.left = null;
		this.right = null;
		this.parent = null;
	}

	appendChild(node) {
		if(this.left === null) {
			this.left = node;
			this.left.parent = this;
		} else if (this.right === null) {
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if(this.left == node) {
			this.left.parent = null;
			this.left = null;
			return;
		}

		if(this.right == node) {
			this.right.parent = null;
			this.right = null;
			return;
		}

		throw new Error('Passed node is not a child of this node.');
	}

	remove() {
		if(this.parent === null) {return};

		this.parent.removeChild(this);
	}

	swapWithParent() {
		if(this.parent === null) {return};

		let tempParent,
				tempLeft,
				tempRight;

		tempParent = this.parent.parent;

		//update a (left/right) side for this.parent.perent.child
		if(this.parent.parent !== null) {
			if(this.parent.parent.left == this.parent) {
				this.parent.parent.left = this;
			} else {
				this.parent.parent.right = this;
			}
		}

		if(this.parent.left == this) {
			tempLeft = this.parent;
			tempRight = this.parent.right;

			//change parent for other child if it right and not null
			if(this.parent.right !== null) {
				this.parent.right.parent = this;
			}
		} else {
			tempRight = this.parent;
			tempLeft = this.parent.left;

			//change parent for left child
			if(this.parent.left !== null) {
				this.parent.left.parent = this;
			}
		}

		this.parent.parent = this;
		this.parent.left = this.left;
		this.parent.right = this.right;
		if (this.left) {this.left.parent = this.parent};
		if (this.right) {this.right.parent = this.parent};

		this.parent = tempParent;
		this.left = tempLeft;
		this.right = tempRight;

	}
}

module.exports = Node;
