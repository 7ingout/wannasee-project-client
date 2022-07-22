import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config/contansts';
import './Detailconcert.css';
import CounterContainer from './CounterContainer';

const Detailconcert = () => {

    // console.log(CounterContainer.value);
    // console.log(number);
    // console.log(counter)


    const { id } = useParams();
    const navigate = useNavigate();
    const [ state ] = useAsync(()=>getConcerts(id),[id]);
    const { loading, data:concert, error } = state;
    const idid = sessionStorage.getItem('loginId');
    
    // const [number, setNumber ] =useState(0)
    // const getNumber = (number) => {
    //     setNumber(number);
    // }
    // console.log(number);
    async function getConcerts(id){
        const response = await axios.get(`${API_URL}/detailview/${id}`);
        return response.data;
    }  
    
    const [ goData, setGoData ] = useState({
        c_user_id: "",
        c_user_title: "",
        c_user_region: "",
        c_user_location: "",
        c_user_date: "",
        c_user_start: "",
        c_user_num: "",
    })

    async function addReserve(){
        setGoData({
            ...goData,
            c_user_id: idid,
        })
        axios.post(`${API_URL}/addReservation`)
        .then((result)=>{
            console.log(result);
            navigate(-1); // 리다이렉션 추가
        })
        .catch(e=>{
            console.log(e);
        })
    }

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

    let per = document.querySelector("#purchace");
    // console.log(per)

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
                    <span id="span_title">{concert.title}</span>
                    <div id="div_singer">{concert.singer}</div>
                    <div id="div_genre">{concert.genre}</div>
                    <span id="span_locaion">{concert.location}</span>
                    <div>{concert.concert_place}</div>
                    <div id="div_date">{concert.concertdate} / ₩{concert.price}</div>
                    <div>🕒 공연 시간 {concert.start_time}시부터 {concert.end_time}시까지</div>
                    <div id="gopurchace">
                        <CounterContainer per={per}/>
                        <Link to={`/mypage/${idid}`}><div id="outerpur"><button id="purchace" onClick={addReserve}>티켓 예매하기</button></div></Link>
                    </div>
                </div>
            </div>
            <div id="div_description">{concert.description}</div>
        </div>
    );
};

export default Detailconcert;