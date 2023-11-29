import React from "react";
import styled from "styled-components";

function PhotoFrame() {
    return (
        <Frame></Frame>
    );
}

const Frame = styled.div`
    width: 300px;
    height: 400px;
    background-color: blue;
`;

export default PhotoFrame;