"use strict";

class MinHeap{

    constructor (){
        this.heap = [] //Empty array for a heap
    }

    _getRoot(){ if (this.heap.length>0) return this.heap[0]; else return null;}

    _getParentIndex(index){ return Math.floor((index-1)/2); }
    _getLeftChildIndex(parentIndex){ return 2*parentIndex + 1};
    _getRightChildIndex(parentIndex){ return 2*parentIndex + 2};

    _getLeftChild(parentIndex) {return this.heap[this._getLeftChildIndex(parentIndex)];}
    _getRightChild(parentIndex) {return this.heap[this._getRightChildIndex(parentIndex)];}
    _getParent(index) {return this.heap[this._getParentIndex(index)];}

    _hasParent(index) { return this._getParentIndex(index)<this.heap.length}
    _hasLeftChild(index) { return this._getLeftChildIndex(index)<this.heap.length}
    _hasRightChild(index) { return this._getRightChildIndex(index)<this.heap.length}

    insert(data,compFunction){
        this.heap.push(data);
        this._heapifyUp(compFunction);
    }

    peek(){
        //returns the root value of the MinHeap
        if (this.heap.length>0)
            return this.heap[this.heap.length-1];
        else return null;
    }

    poll(){
        //TODO: Return the top element o the heap (Root);
        var rootNode=this._getRoot();

        if (rootNode===null)
            return null;

        this.heap[0]=this.heap[this.heap.length-1];

        this.heap.length--;
        this._heapifyDown();

        return rootNode;
    }

    _heapifyUp(compFunction){
        //Starting at the end of the heap (last item on the array)
        var lastIndex = this.heap.length-1;

        if (compFunction===undefined){
            compFunction = function(a,b){if (a>b) return true; else return false;}
        }
        
        while (this._hasParent(lastIndex) && compFunction(this._getParent(lastIndex),this.heap[lastIndex]) ){
            this._swapNodeData(lastIndex,this._getParentIndex(lastIndex));
            lastIndex = this._getParentIndex(lastIndex);
        }
    }

    _heapifyDown(compFunction){
        //Starting at the root of the heap (last item on the array)
        var lastIndex = 0;

        if (compFunction===undefined){
            compFunction = function(a,b){
                if (a>b) return true; else return false;
            }
        }
        
        while (this._hasLeftChild(lastIndex) ){
            var smallerChildIndex = this._getLeftChildIndex(lastIndex);

            if (this._hasRightChild(lastIndex)&&
                compFunction(this._getLeftChild(lastIndex),this._getRightChild(lastIndex)))

                smallerChildIndex = this._getRightChildIndex(lastIndex);

            if (!compFunction(this.heap[smallerChildIndex],this.heap[lastIndex])){
                this._swapNodeData(smallerChildIndex,lastIndex);
                lastIndex = smallerChildIndex;
            }
            else
                break;
        }
    }

    _swapNodeData(nodeIndex1,nodeIndex2){
        var data = this.heap[nodeIndex1];
        this.heap[nodeIndex1] = this.heap[nodeIndex2];
        this.heap[nodeIndex2] = data;
    }
}

/*var t=new MinHeap();
t.insert(10);
t.insert(15);
t.insert(20);
t.insert(17);
t.insert(8);
console.log(t.heap);
console.log(t.poll());
console.log(t.heap);
console.log(t.poll());
console.log(t.heap);
console.log(t.poll());
console.log(t.heap);
console.log(t.poll());
console.log(t.heap);*/