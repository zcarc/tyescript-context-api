import React from 'react';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import {TodosContextProvider} from "./contexts/TodosContexts";

function App() {
    return (
        <>
            <TodosContextProvider>
                <TodoForm/>
                <TodoList/>
            </TodosContextProvider>
        </>
    );
}

export default App;
