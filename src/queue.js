const MaxHeap = require('./max-heap.js');

class PriorityQueue {
  constructor(maxSize) {
    this.maxSize = maxSize || 30;
    this.heap = new MaxHeap();
  }

  push(data, priority) {
        let heapSize = this.heap.size();
        if (heapSize < this.maxSize) {
            this.heap.push(data, priority);
        } else {
            throw new Error('Errot: Queue has max size!')
        }
  }

  shift() {
        let heapSize = this.heap.size();
        if (heapSize > 0) {
          return  this.heap.pop();
        } 
        else {
            throw new Error('Error queue.shift(): Queue is empty!');
        }
        
  }

  size() {
    return this.heap.size();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }
}

module.exports = PriorityQueue;
