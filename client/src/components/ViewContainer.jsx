import React from "react";
import styled from "styled-components";

function ViewContainer({children}) {
    return (
        <Container>
            {children}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 0;
    right: 0;
    height: auto;
    width: calc(100% - 336px);
    background-color: #fff;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    @media (max-width: 1360px) {
        width: calc(100% - 73px);
    }

    @media (max-width: 767px) {
        width: 100%;
    }
`;

export default ViewContainer;