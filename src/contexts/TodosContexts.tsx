import React, {createContext, Dispatch, useContext, useReducer} from 'react'


// 상태 전용 Context
// 나중에 다른 컴포넌트에서 타입을 불러와서 쓸 수 있도록 내보내겠습니다.
export type Todo = {
    id: number
    text: string
    done: boolean
}

type TodosState = Todo[]

const TodosStateContext = createContext<TodosState | undefined>(undefined)


// 액션을 위한 타입 선언
// CREATE: 새로운 항목 생성
// TOGGLE: done 값 반전
// REMOVE: 항목 제거
type Action =
    | { type: 'CREATE'; text: string }
    | { type: 'TOGGLE'; id: number }
    | { type: 'REMOVE'; id: number }


// dispatch 전용 Context
type TodosDispatch = Dispatch<Action>
const TodosDispatchContext = createContext<TodosDispatch | undefined>(undefined)


// 리듀서
function todosReducer(state: TodosState, action: Action): TodosState {

    switch (action.type) {

        case "CREATE":
            const nextId = Math.max(...state.map(todo => todo.id)) + 1
            return state.concat({
                id: nextId,
                text: action.text,
                done: false,
            })

        case 'TOGGLE':
            return state.map(todo => todo.id === action.id ? {...todo, done: !todo.done} : todo)

        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id)

        default:
            throw new Error('Unhandled action')

    }
}

export function TodosContextProvider({children}: { children: React.ReactNode }) {
    const [todos, dispatch] = useReducer(todosReducer, [
        {
            id: 1,
            text: 'Context API 배우기',
            done: true
        },
        {
            id: 2,
            text: 'TypeScript API 배우기',
            done: true
        },
        {
            id: 3,
            text: 'TypeScript 와 Context API 배우기',
            done: false
        },
    ])

    return (
        <TodosDispatchContext.Provider value={dispatch}>
            <TodosStateContext.Provider value={todos}>
                {children}
            </TodosStateContext.Provider>
        </TodosDispatchContext.Provider>
    )
}

export function useTodosState() {
    const state = useContext(TodosStateContext);
    if (!state) throw new Error('TodosProvider not found');
    return state;
}

export function useTodosDispatch() {
    const dispatch = useContext(TodosDispatchContext);
    if (!dispatch) throw new Error('TodosProvider not found');
    return dispatch;
}