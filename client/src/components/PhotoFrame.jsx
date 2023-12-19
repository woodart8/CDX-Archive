import React from "react";
import styled from "styled-components";

function PhotoFrame() {
    return (
        <Frame></Frame>
    );
}

const Frame = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 10px;
    background-color: #aaa;
`;

export default PhotoFrame;