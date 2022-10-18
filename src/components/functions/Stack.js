
class LStack {
    constructor() {
        this.top = null
    }

    Push(value) {
        const newNode = new StackNode(value, this.top)
        newNode.next = this.top
        this.top = newNode
    }

    Pop() {
        if (this.top == null) return
        const popped = this.top.value
        this.top = this.top.next
        return popped
    }


    Top() {
        if (this.top == null) return //console.log("There is no top element")
        return this.top.value

    }

    isEmpty() {
        if (this.top == null) return true
        return false
    }

    printTop() {
        if (this.top == null) return //console.log("There is no top element")
        console.log(this.Top().value)
    }


}

class StackNode {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}


module.exports = LStack