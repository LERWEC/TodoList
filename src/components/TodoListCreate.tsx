import { SBtn } from '../assets/styles/SBtn';
import { SInputText } from '../assets/styles/SInput';
import styled from 'styled-components';
import { useState, SetStateAction, Dispatch } from 'react';

type SortStatus = 'all' | 'active' | 'completed';

interface ItemList {
    id: string;
    title: string;
    completed: boolean;
}

interface TodolistCreateProps {
    setListToDo: Dispatch<SetStateAction<ItemList[]>>;
    setSortListTodo: Dispatch<SetStateAction<SortStatus>>;
}

const STodoListCreate = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

function TodolistCreate({ setListToDo, setSortListTodo }: TodolistCreateProps) {
    const [newTask, setNewTask] = useState('');

    const createNewTask = () => {
        setListToDo(prev => [
            {
                id: `${Date.now()}`,
                title: newTask,
                completed: false,
            },
            ...prev,
        ]);

        setNewTask('');
    };

    return (
        <div>
            <STodoListCreate>
                <SInputText
                    type='text'
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    placeholder='New todo...'
                />
                <SBtn onClick={() => createNewTask()}>Add</SBtn>
            </STodoListCreate>
            <STodoListCreate>
                <SBtn onClick={() => setSortListTodo('all')}>Show All Tasks</SBtn>
                <SBtn onClick={() => setSortListTodo('active')}>Show Active Tasks</SBtn>
                <SBtn onClick={() => setSortListTodo('completed')}>Show completed Tasks</SBtn>
            </STodoListCreate>
        </div>
    );
}

export default TodolistCreate;
