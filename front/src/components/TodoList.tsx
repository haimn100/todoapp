import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { todoApi } from '../store'
import styles from './TodoList.module.css';
import TodoItem from './TodoItem';


const TodoList = () => {

    const { data: todos, isLoading, isError } = todoApi.useGetAllQuery();
    const [addTodo] = todoApi.useAddTodoMutation();

    const [task, setTask] = useState("");

    const onInputTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const add = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isValidTask(task)) await addTodo(task);
        setTask("");
    };

    const isValidTask = (task: string): boolean => {
        return task.length > 0 && todos?.find(el => el.task === task) === undefined;
    }

    if (isError) {
        return <span>An error has occured</span>
    }
    return (
        <div className={styles.container}>
            <form className="App-form">
                <input type="text" className={styles.inputTask} value={task} onChange={onInputTask} />
                <button type="submit" onClick={add}>+</button>
            </form>
            {
                isLoading ?
                    <span>Loading...</span>
                    :
                    todos?.length === 0 ?
                        <p>Start adding Todo's</p>
                        :
                        <ul> {todos?.map(todo => <TodoItem key={todo.id} todo={todo} isValidTask={isValidTask} />)}</ul>
            }

        </div>
    )

}

export default TodoList;