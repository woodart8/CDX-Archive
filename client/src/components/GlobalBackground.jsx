import React from "react";
import styled from "styled-components";

function GlobalBackground({children}) {
    return (
        <Background>
            {children}
        </Background>
    );
}

const Background = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #fff;
`;

export default GlobalBackground;