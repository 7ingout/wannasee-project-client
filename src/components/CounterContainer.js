import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease, reset } from '../modules/counter';
import Counter from './Counter';


const CounterContainer = (  ) => {
    // useSelector는 리덕스 스토어의 상태를 조회하는 Hook함수
    // store.getState()할 때 결과와 동일함
    const { number } = useSelector(state => (state.counter));
    
    // {number: 0, diff: 1}
    // useDispatch는 리덕스 스토어의 dispatch를 함수에서 사용할 수 있게 해주는 Hook함수
    const dispatch = useDispatch();
    // 각 액션을 dispatch하는 함수
    const onIncrease = () => dispatch(increase());
    const onDecrease = () => dispatch(decrease());
    // props.getNumber(number);
    // getNumber(number);
    // Detailconcert(number);
    return (
        <div>
            <Counter 
            number={number} 
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            />
        </div>
    );
};

export default CounterContainer;