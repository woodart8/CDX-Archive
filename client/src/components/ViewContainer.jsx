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
    top: 0;
    right: 0;
    height: auto;
    width: calc(100% - 336px);
    background-color: #fff;
    justify-content: center;
    align-items: center;

    @media (max-width: 1360px) {
        width: calc(100% - 73px);
    }

    @media (max-width: 767px) {
        padding-bottom: 71px;
        width: 100vw;
    }
`;

export default ViewContainer;