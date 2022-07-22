import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config/contansts';
import './Detailconcert.css';
import CounterContainer from './CounterContainer';
import { useSelector } from 'react-redux';

async function getConcerts(id){
    const response = await axios.get(`${API_URL}/detailview/${id}`);
    return response.data;
}  

const Detailconcert = () => {
    let { number } = useSelector(state => (state.counter));
    const { id } = useParams();
    const navigate = useNavigate();
    const idid = sessionStorage.getItem('loginId');
    const [ goData, setGoData ] = useState({
        c_user_id: "",
        c_user_title: "",
        c_user_region: "",
        c_user_location: "",
        c_user_date: "",
        c_user_start: "",
        c_user_num: "",
    })

    const [ state ] = useAsync(()=>getConcerts(id),[id]);
    const { loading, data:concert, error } = state;
    useEffect(()=>{
        setGoData({
            c_user_id: idid,
            c_user_title: concert? concert.title : "",
            c_user_region: concert? concert.location : "",
            c_user_location: concert? concert.concert_place : "",
            c_user_date: concert? concert.concertdate : "",
            c_user_start: concert? concert.start_time : "",
            c_user_num: number
        })
    },[concert,number])

    function addReserve(){

        axios.post(`${API_URL}/addReservation`,goData)
        .then((result)=>{
            // console.log(result);
            window.location.replace(`/mypage/${idid}`)
        })
        .catch(e=>{
            // console.log(e);
        })
    }
    // if(window.history.back() == true){
    //     window.location.reload();
    // }
    // 콘서트 삭제
    const onDelete = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            axios.delete(`${API_URL}/delConcert/${id}`)
            .then(result=>{
                console.log("삭제되었습니다.");
                navigate("/"); // 리다이렉션 추가
            })
            .catch(e=>{
                console.log(e);
            })
        }else{
            alert("삭제가 취소되었습니다");
        }

    }

    function dd() {
        console.log(number);
        number = 0;
        console.log(number);
        window.location.replace("/")
    }
    

    if(loading)  return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!concert) return null;
    return (
        <div>

            <div id="detail_concert">
                <div id='btns'>
                    <button><Link to={`/editConcert/${id}`}>수정</Link></button>
                    <button onClick={onDelete}>삭제</button>
                </div>
                <div id="left_detail">
                    
                    <div id="detail_img"><img src={`../${concert.imgsrc}`} alt="singer_pic" /></div>
                </div>
                <div id="right_detail">
                    <span onClick={dd} id="span_title">{concert.title}</span>
                    <div id="div_singer">{concert.singer}</div>
                    <div id="div_genre">{concert.genre}</div>
                    <span id="span_locaion">{concert.location}</span>
                    <div>{concert.concert_place}</div>
                    <div id="div_date">{concert.concertdate} / ₩{concert.price}</div>
                    <div>🕒 공연 시간 {concert.start_time}시부터 {concert.end_time}시까지</div>
                    <div id="gopurchace">
                        <CounterContainer Detailconcert={Detailconcert}/>
                        <Link to={`/mypage/${idid}`}><div id="outerpur"><button id="purchace" onClick={addReserve}>티켓 예매하기</button></div></Link>
                    </div>
                </div>
            </div>
            <div id="div_description">{concert.description}</div>

        </div>
    );
};

export default Detailconcert;