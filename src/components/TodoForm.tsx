import React, {useState} from 'react'
import {useTodosDispatch} from "../contexts/TodosContexts";

function TodoForm() {

    const [value, setValue] = useState('')
    const dispatch = useTodosDispatch();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({
            type: "CREATE",
            text: value
        })
        setValue('')
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                value={value}
                placeholder='무엇을 하실 건가요?'
                onChange={e => setValue(e.target.value)}
            />
            <button>등록</button>
        </form>
    )

}

export default TodoForm