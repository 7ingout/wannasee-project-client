// 리덕스 모듈 만들기
// 1. 초기상태선언
// 2. 액션타입선언
// 3. 액션생성함수정의
// 4. 리듀서 선언

// 1. 초기상태선언
const initialState = {
    number: 1,
}

// 2. 액션타입
// 다른 모듈과 액션 이름이 중복되는 것을 방지(접두사처럼 붙여준다)
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const RESET = "counter/RESET"

// 3. 액션생성함수선언
// 액션생성함수는 export 키워드를 사용하여 내보내기
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const reset = () => ({ type: RESET });

// 4. 리듀서 선언
export default function counter(state=initialState, action){
    switch(action.type){
        case INCREASE:
            return {
                ...state,
                number: state.number + 1
            }
        case DECREASE:
            return {
                ...state,
                number: state.number > 1 ? state.number - 1 : 1
            }
        case RESET:
            return {
                number: 1
            }
        default:
            return state;
    }
}