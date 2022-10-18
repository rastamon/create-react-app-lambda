import LStack from "./Stack";


function calculate(exp) {
    let result;
    const arrExp = exp.match(/[)+/(*-]|\d+\.?\d*/g);
    const postFix = ToPostFix(arrExp)
    result = EvaluatePostfix(postFix)
    if (result === 0) return `${result}`
    return result

}



function ToPostFix(exp) {

    //if (typeof (exp) !== 'string') return
    let output = []
    let Stack = new LStack()
    for (let i = 0; i < exp.length; i++) {
        let token = exp[i]
        if (!isNaN(token)) { output.push(token) }
        if (token === "(") Stack.Push(token)
        if (token === ')') {
            while (Stack.Top() !== '(') {
                output.push(Stack.Top())
                Stack.Pop()
            }
            Stack.Pop()
        }


        if (!(token === '+' || token === '-' || token === '*' || token === '/')) continue
        while (!Stack.isEmpty() && prec(token) <= prec(Stack.Top())) {
            output.push(Stack.Top())
            Stack.Pop()
        } Stack.Push(token)
    }
    while (!Stack.isEmpty()) {
        output.push(Stack.Top())
        Stack.Pop()
    }
    return output


    function prec(op) {
        let result;
        switch (op) {
            case '*':
            case '/':
                result = 2
                break;

            case '+':
            case '-':
                result = 1
                break;

            default:
                break;
        }
        return result
    }


}

function EvaluatePostfix(exp) {
    let Stack = new LStack()
    for (let i = 0; i < exp.length; i++) {
        if (!isNaN(parseFloat(exp[i]))) Stack.Push(parseFloat(exp[i]))
        if (exp[i] === '+' || exp[i] === '-' || exp[i] === '*' || exp[i] === '/') {
            const operand2 = Stack.Pop()
            const operand1 = Stack.Pop()
            Stack.Push(Operate(operand1, operand2, exp[i]))
        }
        function Operate(op1, op2, operator) {
            let value = 0
            let round = 0
            switch (operator) {
                case '+':
                    value = op1 + op2
                    round = Math.max(countDecimalDigits(op1), countDecimalDigits(op2))
                    break;
                case '-':
                    value = op1 - op2
                    round = Math.max(countDecimalDigits(op1), countDecimalDigits(op2))
                    break;
                case '*':
                    value = op1 * op2
                    round = countDecimalDigits(op1) + countDecimalDigits(op2)
                    break;
                case '/':
                    value = op1 / op2
                    round = countDecimalDigits(value)
                    break;

                default:
                    break;
            }
            if (isWhole(value)) return value
            return value.toFixed(round)
        }
    }

    return Stack.Top()
}

function countDecimalDigits(num) {
    const string = `${num}`
    if (!string.includes(".")) return 0
    const sequence = string.split('.')
    return sequence[1].length
}

function isWhole(num) {
    return Math.round(num) === num
}



export default calculate