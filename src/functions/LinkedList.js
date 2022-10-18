class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    insertAtHead(data) {
        const newNode = new LinkedListNode(data, this.head)
        this.head = newNode
        this.length++
    }

    getByIndex(index) {
        if (index < 0 || index >= this.length) return null

        let current = this.head
        for (let i = 0; i < index; i++) {
            current = current.next
        }
        return current
    }

    removeHead() {
        this.head = this.head.next
        this.length--
    }

    insertAtIndex(index, value) {
        if (index === 0) return this.insertAtHead(value)

        const prev = this.getByIndex(index - 1)
        if (prev == null) return null

        prev.next = new LinkedListNode(value, prev.next)
        this.length++
    }

    removeAtIndex(index) {
        if (index === 0) return this.removeHead()

        const prev = this.getByIndex(index - 1)
        if (prev == null) return null

        prev.next = prev.next.next
        this.length--
    }

    reverseOrder() {
        if (this.length == 0) return
        // [prev = null] - > current -> [next] -> [node] -> [node]
        let current, prev, next;
        current = this.head
        prev = null;
        while (current != null) {
            //saves values to the right of current
            next = current.next
            // switches current to point to value of prev (left of current) and deletes pointer to next
            // [null] <- current  -x- [next] -> [node] -> [node]
            current.next = prev
            // assigns prev to the current value
            // [null] <- prev  [next] -> [node] -> [node]
            prev = current
            // [null] <- prev [current, next] -> [node] -> [node]
            current = next
        }

        this.head = prev
    }

    reverseOrderRecurive(current) {
        // if (current != this.head) return
        if (current.next == null) {
            this.head = current
            return
        }
        this.reverseOrderRecurive(current.next)
        let nextNode = current.next
        nextNode.next = current
        current.next = null
    }

    print() {
        let output = ''
        let current = this.head
        while (current) {
            output = `${output}${current.value} -> `
            current = current.next
        }
        console.log(`${output}null`)
    }

    reversePrint() {
        if (this.length == 0) return null
        if (this.length == 1) return this.print()
        let rl = this;
        rl.reverseOrder()
        rl.print()
    }

}


class LinkedListNode {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}

LinkedList.fromValues = function (...values) {
    const ll = new LinkedList()
    for (let i = values.length - 1; i >= 0; i--) {
        ll.insertAtHead(values[i])
    }
    return ll
}


module.exports = LinkedList