import { useRef, useState } from 'react';
import { Todo } from '../store';
import styles from './TodoList.module.css';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineDelete, AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';


interface Props {
    todo: Todo,
    isValidTask: (task: string) => boolean
}

const TodoItem = ({ todo, isValidTask }: Props) => {

    const [inEditMode, setInEditMode] = useState(false);
    const editInputRef = useRef<HTMLInputElement>(null);

    const del = (id: number) => { }

    const toggle = (todo: Todo) => { };

    const update = async (todo: Todo) => {
    }

    return (
        <li key={todo.id}
            className={`list-group-item ${inEditMode ? styles.editTask : ''} 
                 ${todo.completed ? styles['task-completed'] : ''}`}>
            <label>
                {inEditMode ? <input type="text" ref={editInputRef} defaultValue={todo.task} /> : todo.task}
            </label>
            <div className={styles.actions}>
                <i className={styles.deleteBtn} onClick={e => del(todo.id)}> <AiOutlineDelete /></i>
                <i className={styles.editBtn} onClick={e => inEditMode ? update(todo) : setInEditMode(true)}>
                    {inEditMode ? <AiOutlineCheck /> : <AiOutlineEdit />}
                </i>
                <i className={styles.checkBtn} onClick={e => toggle(todo)}> {todo.completed ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}</i>
            </div>
        </li>
    );
}

export default TodoItem;