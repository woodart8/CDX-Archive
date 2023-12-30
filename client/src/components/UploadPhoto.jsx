import React, { useCallback, useRef, useState } from "react";
import axios from 'axios';
import styled from "styled-components";

function UploadPhoto() {
    const [photoSrc, setPhotoSrc] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
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
        const uploadFiles = Array.from(e.target.images.files);
        const formData = new FormData();
        uploadFiles.forEach((element) => {
            formData.append("images", element);
        });
        axios.post("http://43.202.52.215:5000/upload", formData, {
            headers: { "Content-Type" : "multipart/form-data" },
        }).then(response => {
            console.log(response);
            setTimeout(()=>{window.location.href = '/gallery';}, 0);
        }).catch(err => {
            console.log(err.response);
            alert("사진의 크기가 10MB 보다 크거나 유효하지 않은 확장자입니다.");
        });

    }, [photoSrc]);

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <div className="upload-photo-frame">
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

    .upload-photo-frame {
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

export default UploadPhoto;