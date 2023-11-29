import React from "react";
import styled from "styled-components";

function Year({children}) {
    return(
        <YearBox>
            {children}
        </YearBox>
    );
}

const YearBox = styled.div`
    display: flex;
    height: 180px;
    width: 300px;
    border-radius: 10px;
    background-color: #f1c2be;
    font-size: 40px;
    color: #fff;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export default Year;