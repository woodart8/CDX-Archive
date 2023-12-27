import React from "react";
import styled from "styled-components"

function FullSizeView({children}) {
    return (
        <View>
            {children}
        </View>
    );
}

const View = styled.div`
    display: flex;
    position: fixed;
    flex-direction: column;
    right: 0;
    height: 100%;
    width: calc(100% - 336px);
    z-index: 2;
    background-color: rgba(0,0,0,0.85);
    justify-content: center;
    align-items: center;

    @media (max-width: 1360px) {
        width: calc(100% - 73px);
    }

    @media (max-width: 767px) {
        height: calc(100% - 51px);
        width: 100vw;
    }
`;

export default FullSizeView;