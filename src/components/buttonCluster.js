import React, { useState } from 'react';

const ButtonCluster = (props) => {
    const [ currentFilter, setCurrentFilter ] = useState('none');

    const handleClick = (value) => {
        props.callbackFunction(value);
        setCurrentFilter(value);
    }

    const produceButton = (state, text) => {
        return (
            <button
                className={currentFilter === state ? 'active' : ''}
                onClick={() => handleClick(state)}>
                Show{currentFilter === state ? 'ing' : '' } {text}
            </button>
        )
    }

    return (
        <div className="button-cluster">
            { produceButton('none', 'All Tasks') }
            { produceButton('active', 'Active Tasks') }
            { produceButton('completed', 'Completed Tasks') }
        </div>
    )
}

export default ButtonCluster;