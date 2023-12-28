import React from "react";
import styled from "styled-components";

function TopMenu({children}) {
    return (
        <Menu>
            {children}
        </Menu>
    )
}

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    height: 50px; 
    width: 92%; 
    padding: 0 4% 0 4%;
    font-size: 17px;
    justify-content: space-between;

    @media (max-width: 1680px) {
        width: 90%; 
        padding: 0 5% 0 5%;
    }

    @media (max-width: 1080px) {
        width: 84%; 
        padding: 0 8% 0 8%;
    }

    @media (max-width: 767px) {
        width: 72%; 
        padding: 0 14% 0 14%;
    }

    @media (max-width: 320px) {
        width: 64%;
        padding: 0 18% 0 18%;
    }
`;

export default TopMenu;