import React, { useEffect } from "react";
import styled from "styled-components"
import { preventScroll, allowScroll } from "../utils/modal";

function FullSizeViewModal({children}) {
    useEffect(() => {
        const prevScrollY = preventScroll();
        return () => {
          allowScroll(prevScrollY);
        };
    }, []);

    return (
        <Modal>
            <Wrapper>
                {children}
            </Wrapper>
        </Modal>
    );
}

const Modal = styled.div`
    display: flex;
    position: fixed;
    right: 0;
    height: 100%;
    width: calc(100% - 336px);
    z-index: 3;
    justify-content: center;
    align-items: center;

    @media (max-width: 1360px) {
        width: calc(100% - 73px);
    }

    @media (max-width: 767px) {
        height: calc(100% - 51px);
        width: 100%;
    }
`;

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    background-color: rgba(0,0,0,0.85);
    justify-content: center;
    align-items: center;
    @media (max-width: 1360px) {
    }

    @media (max-width: 767px) {
    }

    @media (max-width: 399px) {

    }
`;
export default FullSizeViewModal;