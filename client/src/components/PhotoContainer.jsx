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
    display: grid;
    gap: 30px;
    padding: 50px;
    grid-template-columns: repeat(4,1fr);

    @media (max-width: 1680px) {
        grid-template-columns: repeat(3,1fr);
    }

    @media (max-width: 1080px) {
        grid-template-columns: repeat(2,1fr);
    }

    @media (max-width: 767px) {
        grid-template-columns: repeat(1,1fr);
        padding-bottom: 85px;
    }
`;

export default PhotoContainer;