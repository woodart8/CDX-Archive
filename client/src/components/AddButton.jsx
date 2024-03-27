import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function AddButton() {
    return (
        <Link to="/upload" className="link-upload">
            <Button>+</Button>
        </Link>
    );
}

const Button = styled.button`
    display: flex;
    position: fixed;
    z-index: 1;
    bottom: 80px;
    right: 50px;
    height: 64px;
    width: 64px;
    background-color: #747AFD;
    color: #ffffff;
    font-size: 64px;
    font-weight: bold;
    line-height: 64px;
    border: none;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @media (max-width: 1360px) {
        right: 40px;
    }

    @media (max-width: 767px) {
        bottom: 100px;
        right: 25px;
    }
`;

export default AddButton;