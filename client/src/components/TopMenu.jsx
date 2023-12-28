import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";

function TopMenu({ handleOrderChange }) {
    const [isDesc, setIsDesc] = useState(true);
    const [total, setTotal] = useState(0);

    const initialRequest = useCallback(async () => {
        await axios.get('http://43.202.52.215:5000/gallery?pageNo=1&pageSize=12&isDesc=true')
        .then((res) => {
            setTotal(res.data.total);
        })
        .catch((err) => {console.log(err)});
    }, []);

    const handleClick = () => {
        setIsDesc(!isDesc);
    }

    useEffect(() => {
        initialRequest();
    },[])

    useEffect(() => {
        handleOrderChange(isDesc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isDesc])

    return (
        <Menu>
            <div className="total" style={{display: 'flex', height: '50px', lineHeight: '50px'}}>
                    <span>전체: {total}개</span>
            </div>
            <div className="order-select" style={{display: 'flex', height: '50px', lineHeight: '50px', cursor: 'pointer'}} onClick={handleClick}>
                {
                    isDesc ?
                    <div> 
                        <span>최신순 </span>
                        <i className="fa-solid fa-sort-up"></i>
                    </div>
                    : 
                    <div>
                        <span>오래된 순 </span>
                        <i className="fa-solid fa-sort-down"></i>
                    </div>
                }
                </div>
        </Menu>
    )
}

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    height: 50px; 
    width: 90%; 
    padding: 0 5% 0 5%;
    font-size: 17px;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;

    @media (max-width: 1680px) {

    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 767px) {
        font-size: 16px;
    }

    @media (max-width: 320px) {
        font-size: 15px;
    }
`;

export default TopMenu;