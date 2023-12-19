import React from "react";
import styled from "styled-components";

function UploadContainer({children}) {
    return (
        <Container>
            {children}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #c3c5f1;
`;

export default UploadContainer;