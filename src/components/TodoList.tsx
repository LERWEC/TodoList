import TodoListItem from './TodoListItem';
import { SInputCheck, SInputText } from '../assets/styles/SInput';
import { SBtn } from '../assets/styles/SBtn';
import { useEffect, SetStateAction, Dispatch } from 'react';
import styled from 'styled-components';

interface ItemList {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoListProps {
    sortListTodo: string;
    list: ItemList[];
    setListToDo: Dispatch<SetStateAction<ItemList[]>>;
}

function TodoList({ list, setListToDo, sortListTodo }: TodoListProps) {
    let sortList: ItemList[] = [];

    switch (sortListTodo) {
        case 'active':
            sortList = list.filter(item => !item.completed);
            break;

        case 'completed':
            sortList = list.filter(item => item.completed);
            break;

        default:
            sortList = list;
            break;
    }

    const onChangeCompleted = (value: boolean, id: string) => {
        setListToDo(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                          id: item.id,
                          title: item.title,
                          completed: value,
                      }
                    : item
            )
        );
    };

    const saveEditTitle = (newTitle: string, id: string) => {
        setListToDo(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                          id: item.id,
                          title: newTitle,
                          completed: item.completed,
                      }
                    : item
            )
        );
    };

    const deleteTodoElement = (id: string) => {
        setListToDo(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div>
            <h2>{list.length} tasks remaining</h2>
            {sortList.map(item => (
                <TodoListItem
                    key={`todo-id-item-key-${item.id}`}
                    item={item}
                    onChangeCompleted={onChangeCompleted}
                    deleteTodoElement={deleteTodoElement}
                    saveEditTitle={saveEditTitle}
                />
            ))}
        </div>
    );
}

export default TodoList;
