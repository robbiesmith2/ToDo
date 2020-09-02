import React, { useRef, useContext, useState } from 'react';
import { TaskContext } from '../taskContext';
import { v4 as uuid } from "uuid";
import { MdCheck } from 'react-icons/md';
import moment from 'moment';

export const AddTask = React.memo((props) => {
    const [ titleLength, setTitleLength ] = useState(0);
    const { addTask } = useContext(TaskContext);
    const title = useRef();
    const description = useRef();

    const resetFieldValues = () => {
        title.current.value = "";
        description.current.value = "";
        title.current.focus();
        setTitleLength(0);
    }

    const handleClick = (e) => {
        let taskTitle = title.current.value;
        let taskDescription = description.current.value;

        let task = {
            id: uuid(),
            taskTitle,
            taskDescription,
            completed: false,
            created: moment().format("Do MMM")
        };
        
        addTask(task);
        props.closeTask();
        resetFieldValues();
        e.preventDefault();
    }

    const updateValueLength = (e) => {
        setTitleLength(e.target.value.length);
    }

    const disableButton = titleLength > 0 ? null : 'disabled'; 

    return (
        <div className="addtask">
            <div className="addtask__wrapper">
                <h2>Add a Task to Your List:</h2>
                <label>Title:</label>
                <input ref={title} type="text" placeholder="Add Task Title" onChange={updateValueLength}></input>
                <label>Description:</label>
                <textarea ref={description} type="textarea" placeholder="Add Task Description"></textarea>
                <div className="addtask__buttons">
                    <button className="button button--blue button--add-task" onClick={handleClick} disabled={disableButton}><MdCheck /><span>Add</span></button>
                    <button onClick={props.closeTask} className="addtask__cancel button button--cancel"><span>Cancel</span></button>
                </div>
            </div>
        </div>
    )
})