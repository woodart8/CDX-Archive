import React from "react";
import styled from "styled-components";

function PhotoFrame({children}) {
    return ( 
        <Frame>
            {children}
        </Frame>
    );
}

const Frame = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    box-shadow: 3px 3px 8px rgba(0,0,0,0.2);
    border-radius: 10px;
    background-color: #aaa;
    overflow: hidden;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    &:hover {
        transform: translateY(-1%);
        transition: 0.2s ease-in;
    }
`;

export default PhotoFrame;