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
    width: 90%; 
    flex-direction: row; 
    justify-content: center;
    gap: 40px;
    padding-top: 10px;
`;

export default TextButtonContainer;