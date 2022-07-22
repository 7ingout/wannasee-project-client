import React from 'react';
import { API_URL } from '../config/contansts';
import axios from 'axios';

const MypageComponent = ({data}) => {
    console.log(data.id)
    // const { id } = useParams();
    const onDelete = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            axios.delete(`${API_URL}/delReservation/${data.id}`)
            .then(result=>{
                console.log("삭제되었습니다.");
            })
            .catch(e=>{
                console.log(e);
            })
        }else{
            alert("삭제가 취소되었습니다");
        }
    }
    return (
        <tr >
            <td>{data.user_title}</td>
            <td>{data.user_region}</td>
            <td>{data.user_location}</td>
            <td>{data.user_date}</td>
            <td>{data.user_start}</td>
            <td>{data.user_num}</td>
            <td><button onClick={onDelete}>삭제</button></td>
        </tr>
    );
};

export default MypageComponent;