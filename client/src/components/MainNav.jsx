import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

function MainNav() {
    return (
        <Nav>
            <Link to="/" className="link-first">
                <div className="nav-main">
                    <i className="ic-logo fa-brands fa-instagram"></i>
                    <span className="project-name">CDX Archive</span>
                </div>
            </Link>
            <Link to="/" className="link">
                <div className="nav-menu">
                    <i className="ic-home fa-solid fa-house"></i>
                    <span className="home focus">홈</span>
                </div>
            </Link>
            <Link to="/gallery" className="link">
                <div className="nav-menu">
                    <i className="ic-gallery fa-solid fa-photo-film"></i>
                    <span className="gallery">갤러리</span>
                </div>
            </Link>
        </Nav>
    );
}

const Nav = styled.nav`
    display: flex;
    position: fixed;
    height: 100%;
    width: 335px;
    z-index: 9999;
    background-color: #fff;
    border-right: 1px solid #e1e1e1; 
    color: #2d2d2d;
    flex-direction: column;
    align-items: center;

    .nav-main {
        display: flex;
        margin: 26px;
        padding: 10px;
        width: 285px;
        cursor: pointer;
        font-size: 22px;
        font-weight: bold;

        i {
            display: none;
        }
    }

    .nav-menu {
        display: flex;
        margin-bottom: 10px;
        padding: 14px;
        width: 285px;
        cursor: pointer;
        font-size: 17px;
        border-radius: 10px;

        i {
            margin-right: 10px;
            font-size: 22px;
        }
    }

    .nav-menu:hover {
        background-color: #f1f1f1;
        transition: 0.3s;
    }

    a {
        color: inherit;
        text-decoration: none;
    }


    @media (max-width: 1360px) {
        width: 72px;

        a div span {
            display: none;
        }

        .nav-main {
            width: 24px;
    
            i {
                display: block;
                margin-right: 10px;
                font-size: 26px;
            }
        }
    
        .nav-menu {
            width: 24px;
        }
    }

    @media (max-width: 767px) {
        bottom: 0px;
        height: 50px;
        width: 100%;
        border-top: 1px solid #e1e1e1;
        flex-direction: row;
        justify-content: space-evenly;

        .link-first {
            display: none;
        }

        .nav-menu {
            padding: 8px;
            margin: 0;
        }

        .nav-menu:hover {
            background-color: #fff;
            transition: 0.3s;

            i {
                font-size: 23px;
            }
        }
    }
`;

export default MainNav;