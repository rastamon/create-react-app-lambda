import React, { useReducer } from 'react';
import './styles/keyboard.css'
import DigitButton from './digits';
import OperationButton from './operators';
import calculate from './functions/calculate';
import checkBalancedParentheses from './functions/checkBalancedParentheses';


export const ACTIONS = {
    ADD_DIGIT: 'add_digit',
    CHOOSE_OPERTATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaulate'
}

// const decimalStack = []

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            // if (state.overwrite) {
            //     return {
            //         ...state,
            //         currentOperand: `${state.currentOperand || ""}${payload.digit}`,
            //         overwrite: false
            //     }
            // }
            // if (payload.digit === "0" && state.currentOperand === "0") return state
            if (payload.digit === "." && state.pointStatus === false) {
                return {
                    ...state,
                }
            }
            if (payload.digit === ".") {
                if (state.currentOperand === null || state.opStatus === true) {
                    return {
                        ...state,
                        currentOperand: `${state.currentOperand || ""}0${payload.digit}`,
                        numStatus: false,
                        pointStatus: false

                    }
                }
                return {
                    ...state,
                    currentOperand: `${state.currentOperand || ""}${payload.digit}`,
                    pointStatus: false,
                    numStatus: false,
                    opStatus: false

                }
            }

            // if (payload.digit === ".") {
            //     decimalStack[0] = 1
            //     return {
            //         ...state,
            //         currentOperand: `${state.currentOperand || ""}${payload.digit}`
            //     }
            // }
            // if (state.currentOperand !== null) {
            //     if (decimalStack.length !== 0 && state.currentOperand.slice(-1) !== "." && payload.digit === ".") return state

            // }



            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,
                operation: null,
                numStatus: true,
                opStatus: false
            }

        case ACTIONS.CHOOSE_OPERTATION:
            if ((state.currentOperand === null && state.previousOperand === null) || state.numStatus === false) return state

            // if (state.previousOperand == null) {
            //     return {
            //         ...state,
            //         operation: payload.operation,
            //         previousOperand: state.currentOperand,
            //         currentOperand: null,
            //     }
            // }


            if (state.currentOperand === null) {
                return {
                    ...state,
                    operation: payload.operation,
                    opStatus: true
                }
            }

            if (state.operation !== null && state.pointStatus === false) {
                return state
            }
            return {
                ...state,
                operation: payload.operation,
                pointStatus: true,
                currentOperand: `${state.currentOperand || ""} ${payload.operation} `,
                numStatus: false,
                opStatus: true
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite)
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null
                }
            if (state.currentOperand === null) return state
            if (state.currentOperand.length === 1) {
                return { ...state, currentOperand: null }
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        case ACTIONS.EVALUATE:
            // if (
            //     state.operation == null ||
            //     state.currentOperand == null ||
            //     state.previousOperand == null
            // ) {
            //     return state
            // }
            if (!(checkBalancedParentheses(state.currentOperand))) {
                return {
                    ...state,
                    currentOperand: state.currentOperand
                }
            }
            // if (state.operation != null) {
            //     return state
            // }


            return {
                ...state,
                overwrite: true,
                previousOperand: state.currentOperand,
                operation: null,
                currentOperand: evaluate(state),
                opStatus: false
            }
        default:
            break
    }

}

function evaluate({ currentOperand, previousOperand, operation }) {
    let computation = ""
    computation = calculate(currentOperand)
    computation = parseFloat(computation)
    return computation.toString()
}
function Board() {
    const [{ currentOperand, previousOperand }, dispatch] = useReducer(reducer, {})

    // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } })
    return (
        <div className="keyboard">
            <div className="title">
                <h1>Abacus</h1>
            </div>
            <div className="calculator-grid">
                <div className="output">
                    <div data-previous-operand className="previous-operand">{previousOperand}</div>
                    <div data-current-operand className="current-operand">{currentOperand}</div>
                </div>
                <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>

                <DigitButton digit="(" dispatch={dispatch} />
                <DigitButton digit=")" dispatch={dispatch} />
                <button id="backspace" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
                    <span class="material-symbols-outlined">
                        backspace
                    </span>
                </button>
                <OperationButton operation="/" dispatch={dispatch} />
                <DigitButton digit="1" dispatch={dispatch} />
                <DigitButton digit="2" dispatch={dispatch} />
                <DigitButton digit="3" dispatch={dispatch} />
                <OperationButton operation="*" dispatch={dispatch} />
                <DigitButton digit="4" dispatch={dispatch} />
                <DigitButton digit="5" dispatch={dispatch} />
                <DigitButton digit="6" dispatch={dispatch} />
                <OperationButton operation="+" dispatch={dispatch} />
                <DigitButton digit="7" dispatch={dispatch} />
                <DigitButton digit="8" dispatch={dispatch} />
                <DigitButton digit="9" dispatch={dispatch} />
                <OperationButton operation="-" dispatch={dispatch} />
                <DigitButton digit="." dispatch={dispatch} />
                <DigitButton digit="0" dispatch={dispatch} />
                <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
            </div>
        </div>
    );
}

export default Board;