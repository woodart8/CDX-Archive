import React from "react";
import styled from "styled-components";

function Button({children}) {
    return (
        <Btn>{children}</Btn>
    );
}

const Btn = styled.button`
    display: flex;
    z-index: 3;
    background-color: transparent;
    color: #ffffff;
    font-size: 30px;
    font-weight: bold;
    border: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @media (max-width: 767px) {
        font-size: 28px;
    }
`;

export default Button;