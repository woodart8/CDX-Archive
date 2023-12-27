import React from "react";
import styled from "styled-components";

function TextButtonContainer({children}) {
    return(
        <Container>
            {children}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    width: 580px; 
    flex-direction: row; 
    justify-content: right;
    gap: 10px;
    margin-top: 5px;

    @media (max-width: 1360px) {
        width: 520px;
    }

    @media (max-width: 767px) {
        width: 420px;
    }
`;

export default TextButtonContainer;