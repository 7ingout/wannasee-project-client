import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/contansts';
import './MemberJoin.css'
import PopupDom from "./PopupDom"
import PopupPostCode from "./PopupPostCode"

const MemberJoin = () => {
    const navigate = useNavigate(); // 리다이렉션
     // 우편번호 관리하기
     const onAddData = (data) => {
        console.log(data);
        setFormData({
            ...formData,
            add: data.address,
        })
    }
    // 팝업창 상태 관리
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    // 팝업창 상태 true로 변경
    const openPostCode = ()=> {
        setIsPopupOpen(true);
    }
    // 팝업창 상태 false로 변경
    const closePostCode = () => {
        setIsPopupOpen(false);
    }
    const [ formData, setFormData ] = useState({
        id: "",
        password: "",
        name: "",
        phone: "",
        email: "",
        add: "",
        adddetail: ""
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
     // 폼 submit 이벤트
     const onSubmit = (e) => {
        const userPw = document.querySelector('#password');
        const userPwCh = document.querySelector('#passwordCk');
        if(window.confirm("등록하시겠습니까?")){
            e.preventDefault();
            if(userPw.value !== userPwCh.value) {
                alert('비밀번호가 일치하지 않습니다.');
            }else {
                if(isNaN(formData.phone)){
                    alert("전화번호는 숫자만 입력해주세요");
                    setFormData({
                        ...formData,
                        phone: "",
                    })
                }
                // input에 값이 있는지 체크하고
                // 입력이 다되어있으면 post전송
                else if(formData.id !== "" && formData.password !== "" &&
                formData.name !== "" && formData.phone !== "" &&
                formData.email !== "" && formData.add !== "" && 
                formData.adddetail !== ""){
                    insertMember();
                }
                else {
                    alert("모든 기입란에 기입해주세요");
                }
            }
        }else{
            alert("등록이 취소되었습니다");
        }
    }
    function insertMember(){
        axios.post(`${API_URL}/join`,formData)
        .then((result)=>{
            console.log(result);
            navigate(-1); // 리다이렉션 추가
        })
        .catch(e=>{
            console.log(e);
        })
    }
    const OnPwCh = () => {
        const userPw = document.querySelector('#password');
        const userPwCh = document.querySelector('#passwordCk');
        const passInform = document.querySelector('#passInform');
        userPwCh.addEventListener('keyup',function(){
            if(userPw.value !== userPwCh.value) {
                passInform.innerHTML = '비밀번호가 일치하지 않습니다.';
                console.log('비밀번호가 일치하지 않습니다.');
            }else {
                passInform.innerHTML = '비밀번호가 일치합니다.';
                console.log('비밀번호가 일치합니다.');
            }
        })
    }
    const OnIdCh = async (e) => {
        let userId = document.querySelector('#id');
        const response = await axios.get(`${API_URL}/idCh`);
        const Iddb = response.data;
        let sameNum = 0;
        Iddb.forEach( id => {
            if(userId.value === id.userId){
                sameNum++;
            }
        });
        if(sameNum !== 0) {
            setFormData({
                ...formData,
                id: "",
            })
            alert('중복아이디입니다.');

            console.log(userId)
            console.log(userId.value)
        }else {
            alert('사용가능한 아이디입니다.');
        }
    }
    return (
        <div id="memberJoin">
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan={2}>
                                🎉 회원가입
                            </th>
                        </tr>
                        <tr>
                            <td>아이디</td>
                            <td>
                                <input type="text" id="id" name="id" value={formData.id} onChange={onChange} />
                                <span id ="duCk" onClick={(e)=>{OnIdCh(e);}}>👈 중복확인</span>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>
                            <input type="password" id="password" name="password" value={formData.password} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호 확인</td>
                            <td>
                            <input type="password"  id="passwordCk" name="passwordCk" value={formData.passwordCk} onChange={(e)=>{onChange(e); OnPwCh(e);}}/>
                            <span id="passInform"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td>
                            <input type="text" name="name" value={formData.name} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td>
                            <input type="text" name="phone" value={formData.phone} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>
                            <input type="text" name="email" value={formData.email} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td>
                                <input name="add" type="text" value={formData.add} onChange={onChange}/>
                                <input name="adddetail" type="text" value={formData.adddetail} onChange={onChange}/>
                                <button type="button" onClick={openPostCode}>우편번호 검색</button>
                                <div id="popupDom">
                                {isPopupOpen && (
                                    <PopupDom>
                                        <PopupPostCode onClose={closePostCode}
                                        onAddData={onAddData}
                                        />
                                    </PopupDom>
                                )}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} id="btns">
                               <button type="submit">등록</button>
                               <button type="reset">취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

        </div>
    );
};

export default MemberJoin;