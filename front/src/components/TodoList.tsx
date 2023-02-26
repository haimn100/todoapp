import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './TodoList.module.css';
import TodoItem from './TodoItem';


const TodoList = () => {

    const [task, setTask] = useState("");

    const onInputTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const add = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setTask("");
    };


    return (
        <div className={styles.container}>
            <form className="App-form">
                <input type="text" className={styles.inputTask} value={task} onChange={onInputTask} />
                <button type="submit" onClick={add}>+</button>
            </form>
        </div>
    )

}

export default TodoList;