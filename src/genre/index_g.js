import React from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import GenreComponent from './genre';
import { API_URL } from '../config/contansts.js';

const ConcertGenre = () => {
    async function getConcerts(genre){
        const response = await axios.get(`${API_URL}/genre/${genre}`);
        return response.data;
    }
    const { genre } = useParams();
    const [ state ] = useAsync(()=>getConcerts(genre),[genre]);
    const { loading, data:concerts, error } = state;
    if(loading) 
    return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!concerts) return null;
    return (
        <div className='Allpage'>
            <h1>장르별</h1>
            <div className="pageinner">
                <div className="all_div">
                    <ul className="all_ul">
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

export default ConcertGenre;