import React, { useContext } from 'react';
import { ListItem } from './listItem';
import { TaskContext } from '../taskContext';

export const TaskList = (props) => {
    const { tasks } = useContext(TaskContext);
    let taskList = tasks;
    let filteredTaskList, heading;

    switch (props.filterList) {
        case 'active':
            filteredTaskList = taskList.filter(task => task.completed === false);
            heading = `${filteredTaskList.length} Active Task${(filteredTaskList.length > 1) || (filteredTaskList.length === 0) ? 's' : ''}`;
            break
        case 'completed':
            filteredTaskList = taskList.filter(task => task.completed === true);
            heading = `${filteredTaskList.length} Completed Task${(filteredTaskList.length > 1) || (filteredTaskList.length === 0) ? 's' : ''}`;
            break
        default:
            filteredTaskList = taskList;
            heading = `${taskList.length} Task${taskList.length > 1 ? 's' : ''}`;
            break
    }

    const showList = taskList.length ? (
        <div className="task-list">
            <h3 className="task-list__heading">{ heading }:</h3>
            { filteredTaskList.map((item, i) => <ListItem details={item} key={i} /> ) }
        </div>
    ) : null;

    return (
        showList
    )
}