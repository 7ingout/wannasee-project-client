import React, { useEffect } from 'react';
import AOS from 'aos';
import "../aos.css";
import { Link } from 'react-router-dom';
import { API_URL } from '../config/contansts';

const GenreComponent = ( {concert} ) => {
    useEffect(() => {
        AOS.init({
            duration : 1000
        });
    });
    return (
            <li className="AllContent" data-aos="fade-up" >
                <Link to={`/detailview/${concert.id}`}>
                    <span id="span_locaion">{concert.location}</span>
                    <div> <img src = {`${API_URL}/upload/${concert.imgsrc}`} alt="img" /></div>
                    <span className='span_title'>{concert.title}</span>
                    <div className='span_title' id="godetail">
                        <div id="small_detail">Show more</div>
                        <div id="small_ticket_icon"><img src='/concert.png' alt="ticket"/></div>
                    </div>
                </Link>
            </li>
    );
};

export default GenreComponent;