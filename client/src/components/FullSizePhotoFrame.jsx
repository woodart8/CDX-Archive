import React from "react";
import styled from "styled-components"

function FullSizePhotoFrame({children}){
    return (
        <Frame>
            {children}
        </Frame>
    );
}

const Frame = styled.div`
    display: flex;
    height: 90%;
    width: 90%;
    z-index: 3;
    justify-content: center;
    align-items: center;
`;

export default FullSizePhotoFrame;