import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useResultContext } from '../Contexts/context';
import './Header.css';
import { API_URL } from '../config/contansts';
// import useAsync from '../customHook/useAsync';
import axios from 'axios';

const Header = () => {
    function go_up() {
        window.scrollTo(0,0);
    }
    const Navigate = useNavigate();
    // console.log(sessionStorage)
    const idid = sessionStorage.getItem('loginId');
    function goHome() {
        Navigate('/');
    }
    const Logout = async () => {
        sessionStorage.clear();
        console.log(JSON.stringify(sessionStorage));
    }
    return (
        <div id="header">
            <div id="top_header">
                <div className='inner'>
                    <div id="ticket_icon"><img src='/concert.png' alt="ticket"/></div>
                    <h1><Link to ='/'>WANNASEE?</Link></h1>
                    <ul>
                        {idid === 'admin' ? <li><Link to="/insert">insert</Link></li> : ''} 
                        {idid === null ? <li><Link to="/login">login</Link></li> : <><li> Welcome {idid} 💙</li><li id="pointer" onClick={()=>{goHome(); Logout();}}>logout</li></>} 
                        {idid === null ? <li><Link to="/join">join</Link></li> : ''}    
                        {idid === null ? '' :  <li><Link to={`/mypage/${idid}`}>mypage</Link></li>} 
                    </ul>
                </div>
            </div>
            <nav>
                <ul id="category">
                    <li id="genre"><Link to ='/genre'>#장르별</Link></li>
                    <li id="region"><Link to ='/region'>#지역별</Link></li>
                    <li id="period"><Link to ='/period'>#기간별</Link></li>
                </ul>
                {/* <ul>
                    <li id="welcome"><Link to ='/'>Welcome</Link></li>
                </ul> */}
            </nav>
            <div id="Arrimg" onClick={go_up}><img src='/arrow.png' alt="arrow_pic" /></div>
        </div>
    );
};

export default Header;