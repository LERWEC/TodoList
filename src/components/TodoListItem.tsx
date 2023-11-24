import { SInputCheck, SInputText } from '../assets/styles/SInput';
import { SBtn } from '../assets/styles/SBtn';
import { useCallback, useEffect, useMemo, useState, memo, useRef, ChangeEvent, SetStateAction, Dispatch } from 'react';
import styled from 'styled-components';

interface ItemList {
    id: string;
    title: string;
    completed: boolean;
}

const STodoListItem = styled.div`
    div {
        display: flex;
    }

    label {
        font-size: 1.6rem;
        flex: 1 1;
        margin: auto;
    }

    button {
        max-width: 5rem;
    }
`;

interface TodoListItemProps {
    item: ItemList;
    deleteTodoElement: (id: string) => void;
    onChangeCompleted: (value: boolean, id: string) => void;
    saveEditTitle: (newTitle: string, id: string) => void;
}

function TodoListItem({ item, deleteTodoElement, onChangeCompleted, saveEditTitle }: TodoListItemProps) {
    const [isEdit, setIsEdit] = useState(false);
    const [valueTitle, setValueTitle] = useState('');

    return (
        <div>
            <STodoListItem key={`todo-list-item-${item.id}`}>
                {!isEdit ? (
                    <div>
                        <SInputCheck
                            id={item.id}
                            type='checkbox'
                            checked={item.completed}
                            onChange={e => onChangeCompleted(e.target.checked, item.id)}
                        />
                        <label htmlFor={item.id}>{item.title}</label>
                    </div>
                ) : (
                    <SInputText type='text' defaultValue={item.title} onChange={e => setValueTitle(e.target.value)} />
                )}
                {!isEdit ? (
                    <div>
                        <SBtn onClick={() => setIsEdit(true)}>Edit</SBtn>
                        <SBtn onClick={() => deleteTodoElement(item.id)}>Delete</SBtn>
                    </div>
                ) : (
                    <div>
                        <SBtn onClick={() => setIsEdit(false)}>Cancel</SBtn>
                        <SBtn
                            onClick={() => {
                                saveEditTitle(valueTitle, item.id);
                                setIsEdit(false);
                            }}
                        >
                            Save
                        </SBtn>
                    </div>
                )}
            </STodoListItem>
        </div>
    );
}

export default TodoListItem;
