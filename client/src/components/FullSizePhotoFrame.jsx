import React from "react";
import styled from "styled-components"

function FullSizePhotoFrame({children}) {
    return (
        <Frame>
            {children}
        </Frame>
    );
}

const Frame = styled.div`
    display: flex;
    height: auto;
    width: 580px;
    z-index: 3;
    justify-content: center;
    align-iterms: center;

    @media (max-width: 1360px) {
        width: 500px;
    }

    @media (max-width: 767px) {
        width: 320px;
    }

    img {
        width: 100%;
    }
`;

export default FullSizePhotoFrame;