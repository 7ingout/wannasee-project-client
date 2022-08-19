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
    const [mailCk, setMailCk] = useState(false);
    const emailCk = (e) =>  {
        const text = document.querySelector('#email');
        const mailInform = document.querySelector('#mailCkMessage');
        //eslint-disable-next-line
        var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        mailInform.style.color = 'crimson';
        mailInform.style.fontSize = '12px';
        if (regEmail.test(text.value) === true) {
            mailInform.innerHTML = '';
            setMailCk(true);
        }else {
            mailInform.innerHTML = '이메일 형식이 아닙니다.';
            setMailCk(false);
        }
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
    function phoneNumber(e) {
        var { name, value } = e.target;
        // if (!value) {
        //   return "";
        // }
        value = value.replace(/[^0-9]/g, "");
        let result = [];
        let restNumber = "";

        // 지역번호와 나머지 번호로 나누기
        if (value.startsWith("02")) {
          // 서울 02 지역번호
          result.push(value.substr(0, 2));
          restNumber = value.substring(2);
        } else if (value.startsWith("1")) {
          // 지역 번호가 없는 경우
          // 1xxx-yyyy
          restNumber = value;
        } else {
          // 나머지 3자리 지역번호
          // 0xx-yyyy-zzzz
          result.push(value.substr(0, 3));
          restNumber = value.substring(3);
        }
     
        if (restNumber.length === 7) {
          // 7자리만 남았을 때는 xxx-yyyy
          result.push(restNumber.substring(0, 3));
          result.push(restNumber.substring(3));
        } else {
          result.push(restNumber.substring(0, 4));
          result.push(restNumber.substring(4));
        }
        value = result.filter((val) => val).join("-");
        setFormData({
            ...formData,
            [name]:value
        })
        return value;
      }
    const OnPwCh = () => {
        const userPw = document.querySelector('#password');
        const userPwCh = document.querySelector('#passwordCk');
        const passInform = document.querySelector('#passInform');
        passInform.style.color = 'crimson';
        passInform.style.fontSize = '12px';
        userPwCh.addEventListener('keyup',function(){
            if(userPw.value !== userPwCh.value) {
                passInform.innerHTML = '비밀번호가 일치하지 않습니다.';
                console.log('비밀번호가 일치하지 않습니다.');
            }else {
                passInform.innerHTML = '';
                console.log('비밀번호가 일치합니다.');
            }
        })
    }
    const [ idCk, setidCk ] = useState(false);
    const OnIdCh = async (e) => {
        let userId = document.querySelector('#id');
        const response = await axios.get(`${API_URL}/idCh`);
        const Iddb = response.data;
        let sameNum = 0;
        var regId = /^[A-Za-z0-9]{8,12}$/;	
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
        } else if(!regId.test(userId.value)) {
            alert('영문/숫자 8~12자 이내로 입력');
        }
        else {
            alert('사용가능한 아이디입니다.');
            setidCk(true);
        }
    }
    const [ psCh, setPassCheck ] = useState(false);
   
     // 폼 submit 이벤트
     const onSubmit = (e) => {
        const userPw = document.querySelector('#password');
        const userPwCh = document.querySelector('#passwordCk');
      
        if(window.confirm("등록하시겠습니까?")){
            e.preventDefault();
            var text = document.querySelector('#password').value;
            console.log(text);
                // eslint-disable-next-line
            let regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
            if (regPass.test(text) === false) {
                alert('비밀번호는 영문/숫자 조합으로 8-20자리 입력해주세요.')
            }else {
                setPassCheck(true);
                if(userPw.value !== userPwCh.value) {
                    alert('비밀번호가 일치하지 않습니다.');
                }else {
                    if(formData.id !== "" && formData.password !== "" &&
                    formData.name !== "" && formData.phone !== "" &&
                    formData.email !== "" && formData.add !== "" && 
                    formData.adddetail !== ""){
                        if(idCk && mailCk) {
                            insertMember();
                        } else if(!idCk) {
                            alert('아이디 중복확인을 해주세요.')
                        } else if(!mailCk) {
                            alert('이메일 형식을 확인해주세요')
                        } else if(!psCh) {
                            alert('비밀번호는 영문/숫자 조합으로 8-20자리 입력해주세요.')
                        }
                    }
                    else {
                        alert("모든 기입란에 기입해주세요");
                    }
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
                                <input type="text" id="id" name="id" value={formData.id} onChange={onChange} 
                                placeholder="영문/숫자 모두 포함, 8~12자 이내"/>
                                <span id ="duCk" onClick={(e)=>{OnIdCh(e);}}>👈 중복확인</span>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>
                                <input type="password" id="password" name="password" value={formData.password} onChange={onChange}
                                placeholder='영문/숫자 조합으로 8~20자리'/>
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
                            <td>휴대전화</td>
                            <td>
                            <input type="text" name="phone" value={formData.phone}  onChange={phoneNumber}
                            placeholder='숫자만 입력, 10자~12자'/>
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>
                            <input id="email" type="text" name="email" value={formData.email} onChange={(e)=>{onChange(e); emailCk(e);}}
                            placeholder='aaa@email.com 형식으로 입력'/>
                              <span id='mailCkMessage' className='small_span'></span>
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