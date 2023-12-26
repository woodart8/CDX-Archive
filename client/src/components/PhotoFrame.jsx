import React, { useState } from "react";
import axios from 'axios';
import styled from "styled-components";

function PhotoFrame({children}) {
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        setVisible(!visible);
    }

    const handleDelete = () => {
        axios.delete(`https://43.202.52.215:5000/delete/${children.props.id}`)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        window.location.reload(true);
    }
    
    return (
        <Frame onClick={handleClick}>
            {children}
            {visible && <DeleteButton id="delButton" onClick={handleDelete}>X</DeleteButton>}
        </Frame>
    );
}

const Frame = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    box-shadow: 3px 3px 8px rgba(0,0,0,0.2);
    border-radius: 10px;
    background-color: #aaa;
    overflow: hidden;

    img {
        height: 100%;
        width: 100%;
    }

    &:hover {
        transform: translateY(-1%);
        transition: 0.2s ease-in;
    }
`;

const DeleteButton = styled.button`
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
    height: 30px;
    background-color: red;
    color: #fff;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
`;

export default PhotoFrame;