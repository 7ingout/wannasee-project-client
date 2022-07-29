import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import PeriodComponent from './period';
import { API_URL } from '../config/contansts.js';
import './period.css'

async function getConcerts(){
    const response = await axios.get(`${API_URL}/period`);
    return response.data;
}

const PeriodPage = () => {
    const [state] = useAsync(getConcerts, [])
    const { loading, data: concerts, error } = state;
    if(loading) 
    return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!concerts) return <div>로딩중입니다.</div>
    return (
        <div className="Allpage">
            <h1>기간별</h1>
            <div className="pageinner">
                <div className="all_div">
                    <ul id="mo_p" className='all_ul period_ul'>
                        <li><Link to='/period'>전체보기</Link></li>
                        <li id="monthly">
                            <Link to='/period'>월간</Link>
                            <ul id="monthdiv">
                                <li><Link to='/period/7'>- 7월</Link></li>
                                <li><Link to='/period/8'>- 8월</Link></li>
                            </ul>
                        </li>
                        <li><Link to='/period/1'>주말</Link></li>
                    </ul>
                </div>
                <ul className='component'>
                    {concerts.map(concert=>(
                        <PeriodComponent  key={concert.id} concert={concert}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PeriodPage;