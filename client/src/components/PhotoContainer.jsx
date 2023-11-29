import React from "react";
import styled from "styled-components";

function PhotoContainer({children}) {
    return (
        <Container>
            {children}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`;

export default PhotoContainer;