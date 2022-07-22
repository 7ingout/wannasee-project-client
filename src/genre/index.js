import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import GenreComponent from './genre';
import { API_URL } from '../config/contansts.js';

async function getConcerts(){
    const response = await axios.get(`${API_URL}/genre`);
    return response.data;
}

const GenrePage = () => {
    const [state] = useAsync(getConcerts, [])
    const { loading, data: concerts, error } = state;
    if(loading) 
    return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!concerts) return <div>로딩중입니다.</div>
    return (
        <div className="Allpage">
            <h1>장르별</h1>
            <div className="pageinner">
                <div id="all_div">
                    <ul id="all_ul">
                        <li><Link to='/genre'>전체보기</Link></li>
                        <li><Link to="/genre/발라드">발라드</Link></li>
                        <li><Link to="/genre/트로트">트로트</Link></li>
                        <li><Link to="/genre/락메탈" >락/메탈</Link></li>
                        <li><Link to="/genre/힙합">힙합</Link></li>
                    </ul>
                </div>    
                <ul className='component'>
                {concerts.map(concert=>(
                            <GenreComponent key={concert.id} concert={concert}/>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default GenrePage;