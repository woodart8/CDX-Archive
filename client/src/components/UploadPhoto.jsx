import React, { useCallback, useRef, useState } from "react";
import axios from 'axios';
import styled from "styled-components";

function UploadPhoto() {
    const [photoSrc, setPhotoSrc] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    const handleChange = useCallback(async e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        try {
          reader.readAsDataURL(file);
        } catch (error) {
            console.log(error);
        }

        return new Promise((resolve) => {
            reader.onload = () => {
                setPhotoSrc(reader.result || null);
                resolve();
            };
        });
    }, []);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        if(photoSrc === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png") {
            alert("사진을 선택해주세요.");
            return;
        }
        setIsLoading(true);
        const uploadFiles = Array.from(e.target.images.files);
        const formData = new FormData();
        uploadFiles.forEach((element) => {
            formData.append("images", element);
        });
        axios.post("http://43.202.52.215:5000/upload", formData, {
            headers: { "Content-Type" : "multipart/form-data" },
        }).then(response => {
            setIsLoading(false);
            console.log(response);
            window.location.href = '/gallery';
        }).catch(err => {
            setIsLoading(false);
            console.log(err.response);
            alert("선택된 사진의 총 크기가 50MB 보다 크거나 유효하지 않은 확장자입니다.");
        });

    }, [photoSrc]);

    return (
        <Container>
            {
               isLoading && 
                <Loading>
                    <div class="loading-container">
                        <div class="loading"></div>
                        <div id="loading-text">loading</div>
                    </div>
                </Loading> 
            }
            <form onSubmit={handleSubmit}>
                <div className="upload-photo-thumbnail">
                    <img style={{height: "100%", width: "100%", objectFit: "cover"}} src={photoSrc} alt=""/>
                </div>
                <label htmlFor="uploadPhoto">
                    <div className="btn-upload">선택</div>
                </label>
                <input type="file" name="images" id="uploadPhoto" accept="image/*" multiple ref={inputRef} onChange={handleChange}/>
                <button className="btn-confirm" type="submit">확인</button>
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    position: relative;
    height: 600px;
    width: 800px;
    background-color: #fff;
    color: #000;
    border: none;
    border-radius: 25px;
    font-size: 22px;
    font-weight: bold;

    @media (max-width: 1360px) {
        height: 480px;
        width: 640px;
    }

    @media (max-width: 767px) {
        height: 480px;
        width: 400px;
        font-size: 20px;
    }

    .upload-photo-thumbnail {
        position: absolute;
        left: 50px;
        top: 50px;
        height: 500px;
        width: 500px;
        overflow: hidden;
        border-radius: 10px;

        @media (max-width: 1360px) {
            height: 375px;
            width: 375px;
        }
    
        @media (max-width: 767px) {
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
            height: 300px;
            width: 300px;
            font-size: 20px;
        }
    }

    .btn-upload {
        position: absolute;
        bottom: 30px;
        right: 100px;
        cursor: pointer;
    }

    .btn-confirm {
        position: absolute;
        bottom: 30px;
        right: 35px;
        border: none;
        background-color: transparent;
        color: #000;
        margin: 0;
        padding: 0;
        font-size: 22px;
        font-weight: bold;
        cursor: pointer; 

        @media (max-width: 767px) {
            font-size: 19px;
        }
    }

    #uploadPhoto {
        display: none;
    }
`;

const Loading = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: rgba(255,255,255,0.7);
    justify-content: center;
    align-items: center;

    @keyframes rotate-loading {
        0% {
          transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
        }
      }
      
      @-moz-keyframes rotate-loading {
        0% {
          transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
        }
      }
      
      @-webkit-keyframes rotate-loading {
        0% {
          transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
        }
      }
      
      @-o-keyframes rotate-loading {
        0% {
          transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
        }
      }
      
      @keyframes rotate-loading {
        0% {
          transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
        }
      }
      
      @-moz-keyframes rotate-loading {
        0% {
          transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
        }
      }
      
      @-webkit-keyframes rotate-loading {
        0% {
          transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
        }
      }
      
      @-o-keyframes rotate-loading {
        0% {
          transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
        }
      }
      
      @keyframes loading-text-opacity {
        0% {
          opacity: 0;
        }
        20% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      
      @-moz-keyframes loading-text-opacity {
        0% {
          opacity: 0;
        }
        20% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      
      @-webkit-keyframes loading-text-opacity {
        0% {
          opacity: 0;
        }
        20% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      
      @-o-keyframes loading-text-opacity {
        0% {
          opacity: 0;
        }
        20% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      .loading-container,
      .loading {
        height: 100px;
        position: relative;
        width: 100px;
        border-radius: 100%;
      }
      
      .loading-container {
        margin: 40px auto;
      }
      
      .loading {
        border: 2px solid transparent;
        border-color: transparent #000 transparent #000;
        -moz-animation: rotate-loading 1.5s linear 0s infinite normal;
        -moz-transform-origin: 50% 50%;
        -o-animation: rotate-loading 1.5s linear 0s infinite normal;
        -o-transform-origin: 50% 50%;
        -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;
        -webkit-transform-origin: 50% 50%;
        animation: rotate-loading 1.5s linear 0s infinite normal;
        transform-origin: 50% 50%;
      }
      
      #loading-text {
        -moz-animation: loading-text-opacity 2s linear 0s infinite normal;
        -o-animation: loading-text-opacity 2s linear 0s infinite normal;
        -webkit-animation: loading-text-opacity 2s linear 0s infinite normal;
        animation: loading-text-opacity 2s linear 0s infinite normal;
        color: #000;
        font-family: "Helvetica Neue, " Helvetica ", " "arial";
        font-size: 12px;
        font-weight: bold;
        margin-top: 45px;
        opacity: 0;
        position: absolute;
        text-align: center;
        text-transform: uppercase;
        top: 0;
        width: 100px;
      }
`;

export default UploadPhoto;