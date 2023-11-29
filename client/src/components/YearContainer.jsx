import React from "react";
import styled from "styled-components";

function YearContainer({children}) {
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
    }

    div:hover {
        transition: 0.3s;
        box-shadow: 3px 4px 8px 2px rgba(0,0,0,0.2);
    }
`;

export default YearContainer;