import LStack from "./Stack"

function checkBalancedParentheses(string) {
    // the position of open and closed () must be conserved
    // open ( on the left closed ) on the right
    // Any parentheses open last should be closed first (LIFO)

    // # scan from left to right
    // # if opening symbol, add it to a stack
    // # if closing symbol remove last opening symbol from stack

    if (typeof string !== 'string') return
    if (string === '' || string === ' ') return
    let Stack = new LStack()

    for (let i = 0; i < string.length; i++) {
        let pair = string[i]
        if (isOpenPair(pair)) {
            Stack.Push(pair)
        }
        if (Stack.isEmpty()) return false

        if (isClosedPair(pair)) {
            if (!((matchingType(pair, Stack.Top())) && !Stack.isEmpty())) {
                break
            }
            Stack.Pop()
        }

    }

    return Stack.isEmpty()

    function isOpenPair(char) {
        if ((char === "(") || (char === "{") || (char === "[")) return true
        return false

    }
    function isClosedPair(char) {
        if ((char === ")") || (char === "}") || (char === "]")) return true
        return false
    }

    function matchingType(char1, char2) {
        if (char1 === null || char2 === null) return false
        let value = true

        switch (char1) {
            case ')':
                if (char2 === '[' || char2 === '{') {
                    value = false
                }
                break;

            case '}':
                if (char2 === '[' || char2 === '(') {
                    value = false
                }
                break;

            case ']':
                if (char2 === '(' || char2 === '{') {
                    value = false
                }
                break;

            default:
                break;
        }
        return value
    }

}

export default checkBalancedParentheses