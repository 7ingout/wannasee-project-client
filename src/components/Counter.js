import React from 'react';

const Counter = ({number, onIncrease, onDecrease}) => {
    return (
        <div id="counter">
            <button id="decreasebtn" onClick={onDecrease}>-</button>
            <h2>{number}</h2>
            <button id="increasebtn" onClick={onIncrease}>+</button>
        </div>
    );
};
export default Counter;