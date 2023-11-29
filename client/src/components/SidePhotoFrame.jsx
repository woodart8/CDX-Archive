import React from "react";
import styled from "styled-components";

function SidePhotoFrame() {
    return (
        <Frame></Frame>
    );
}

const Frame = styled.div`
    width: 240px;
    height: 360px;
    background-color: rgba(0,0,0,0.2);

    @media (max-width: 968px){
        display: none;
    }
`;

export default SidePhotoFrame;