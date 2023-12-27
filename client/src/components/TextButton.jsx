import React from "react";
import styled from "styled-components";

function TextButton({children}) {
    return (
        <Button>{children}</Button>
    );
}

const Button = styled.button`
    display: flex;
    z-index: 3;
    background-color: transparent;
    color: #ffffff;
    font-size: 22px;
    font-weight: bold;
    border: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @media (max-width: 767px) {
        font-size: 19px;
    }
`;

export default TextButton;