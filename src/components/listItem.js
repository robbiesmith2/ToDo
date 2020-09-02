import React, { useContext, useState, useRef } from 'react';
import { TaskContext } from '../taskContext';
import { MdEdit, MdDelete, MdCheck, MdCancel } from 'react-icons/md'

export const ListItem = (props) => {
    const { completeTask, incompleteTask, removeTask, editTask } = useContext(TaskContext);
    const [ edit, setEdit ] = useState(false);
    const task = props.details;
    const title = useRef();
    const description = useRef();

    const showDescription = task.taskDescription ? <p>{task.taskDescription}</p> : null;

    const toggleButtons = !task.completed ? (
        <button className="button button--blue" onClick={()=> completeTask({id: task.id})}><MdCheck /><span>Mark Task as Complete</span></button>
    ) : (
        <button className="button button--blue" onClick={()=> incompleteTask({id: task.id})}><MdCancel /><span>Mark Task as Incomplete</span></button>
    );

    const saveChanges = () => {
        let taskTitle = title.current.value;
        let taskDescription = description.current.value

        let updatedTask = {
            id: task.id,
            taskTitle,
            taskDescription,
            completed: task.completed,
        };

        editTask(updatedTask);
        setEdit(false);
    }

    const showCompleteIcon = task.completed ? (
        <div className="taskitem__complete-icon">
            <MdCheck />
        </div>
    ) : null;

    const toggleEdit = edit === false ? (
        <>
            <h4>{task.taskTitle}</h4>
            <h5>Created: {task.created}</h5>
            {showDescription}
            <div className="taskitem__buttons">
                <button className="button button--edit" onClick={() => setEdit(true)}><MdEdit /><span>Edit Task</span></button>
                {toggleButtons}
                <button className="button button--cancel" onClick={()=> removeTask({id: task.id})}><MdDelete /><span>Delete Task</span></button>
            </div>
        </>
    ) : (
        <div className="edittask">
            <h4>Edit Task:</h4>
            <input ref={title} type="text" placeholder="Add Task Title" defaultValue={task.taskTitle}></input>
            <textarea ref={description} type="textarea" placeholder="Add Task Description" defaultValue={task.taskDescription ? task.taskDescription : ''}></textarea>
            <div className="edittask__buttons">
                <button className="button button--blue" onClick={saveChanges}><span>Save Changes</span></button>
                <button className="button button--cancel" onClick={() => setEdit(false)}><span>Cancel</span></button>
            </div>
        </div>
     );

    return (
        <div className={task.completed === false ? 'taskitem' : 'taskitem taskitem--complete'} id={task.id}>
            {showCompleteIcon}
            {toggleEdit}
        </div>
    )
}