import React from 'react';

const MypageComponent = ({data}) => {
    return (
        <tr >
            <td>{data.user_title}</td>
            <td>{data.user_region}</td>
            <td>{data.user_location}</td>
            <td>{data.user_date}</td>
            <td>{data.user_start}</td>
            <td>{data.user_num}</td>
        </tr>
    );
};

export default MypageComponent;