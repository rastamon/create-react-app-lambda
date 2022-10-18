import { ACTIONS } from "./Board"

export default function OperationButton({ dispatch, operation }) {
    return (
        <button
            onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERTATION, payload: { operation } })}> {operation}</button>
    )
}