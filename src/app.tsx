import TodolistCreate from './components/TodoListCreate';
import TodoList from './components/TodoList';
import { SApp, STodoApp } from './assets/styles/app.styles';
import { useEffect, useState } from 'react';
import { TODO_LIST } from './constants/todos';

type SortStatus = 'all' | 'active' | 'completed';

function App() {
    const [listToDo, setListToDo] = useState(() => TODO_LIST);
    const [sortListTodo, setSortListTodo] = useState<SortStatus>('all');

    useEffect(() => {
        localStorage.hasOwnProperty('todo-list')
            ? setListToDo(JSON.parse(localStorage.getItem('todo-list') ?? ''))
            : localStorage.setItem('todo-list', JSON.stringify(listToDo));
    }, []);

    useEffect(() => {
        localStorage.setItem('todo-list', JSON.stringify(listToDo));
    }, [listToDo]);

    return (
        <SApp>
            <h1>ToDo</h1>
            <STodoApp>
                <TodolistCreate setListToDo={setListToDo} setSortListTodo={setSortListTodo}/>
                <TodoList list={listToDo} setListToDo={setListToDo} sortListTodo={sortListTodo} />
            </STodoApp>
        </SApp>
    );
}

export default App;
