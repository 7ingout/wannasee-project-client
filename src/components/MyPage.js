import React from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import './MyPage.css';
import { API_URL } from '../config/contansts';
import MypageComponent from './MypageComponent';
import { useParams } from 'react-router-dom';

const MyPage = () => {
    async function getOrder(idid){
        const response = await axios.get(`${API_URL}/mypage/${idid}`);
        return response.data;
    }  
    const { idid } = useParams();
    const [ state ] = useAsync(()=>getOrder(idid),[idid]);
    const { loading, data: datas, error } = state;
    if(loading)  return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!datas) return <div></div>;
    console.log(datas);
    return (
        <div id="Mypage">
        <form>
            <table>
                <tbody>
                    <tr>
                        <th colSpan={3}>
                            😎 {idid}님의 티켓 예매내역입니다.
                        </th>
                    </tr>
                    <tr id="table_tr">
                        <td>제목</td>
                        <td>지역</td>
                        <td>장소</td>
                        <td>날짜</td>
                        <td>시작시간</td>
                        <td>수량</td>
                    </tr>
                    {datas.length === 0 ? <tr><td id="noreserve" colSpan={6}>🤔 예매내역이 없습니다.</td></tr>
                     : datas.map((data, index)=>(<MypageComponent key={index} data={data}/> ))}
                </tbody>
            </table>
        </form>
    </div>
    );
};

export default MyPage;