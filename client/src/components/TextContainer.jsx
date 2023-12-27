import React from "react";
import styled from "styled-components";

function TextContainer({children}) {
    return (
        <Container>{children}</Container>
    );
}

const Container = styled.div`
    display: flex;
    position: relative;
    height: 100vh;
    width: calc(100% - 336px);
    background-color: #fff;

    @media (max-width: 1360px) {
        width: calc(100% - 73px);
    }

    @media (max-width: 767px) {
        width: 100%;
    }
`;

export default TextContainer;