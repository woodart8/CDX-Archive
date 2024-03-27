import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styled from "styled-components";

function UploadPhoto() {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => 
      { return () => {files.forEach(file => URL.revokeObjectURL(file.preview));} },
    [files]);

    const onDrop = (acceptedFiles) => {
      setFiles(
        acceptedFiles.map(file => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        })
      )
    }

    const {acceptedFiles, fileRejections, getRootProps, getInputProps} = useDropzone({onDrop, accept: {"image/*": [".jpeg", ".jpg", ".png"]}, maxFiles:6, maxSize:10 * 1024 * 1024 * 5});
    
    const thumbs = acceptedFiles.map(file => (
      <Thumb key={file.name}>
        <Image src={file.preview} alt=""/>
      </Thumb>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => { 
      return (
        <li key={file.path}>
             {file.path} - {file.size} bytes
             <ul>
               {errors.map(e => <li key={e.code}>{e.message}</li>)}
            </ul>
        </li>
      ) 
     });

    const handleSubmit = () => {
        setIsLoading(true);
        const formData = new FormData();
        acceptedFiles.forEach((element) => {
            formData.append("images", element);
        });
        axios.post("http://43.202.52.215:5000/upload", formData, {
            headers: { "Content-Type" : "multipart/form-data" },
        }).then(response => {
            setIsLoading(false);
            console.log(response);
            setTimeout(() => {
              window.location.href = '/gallery';
            }, 0);
        }).catch(err => {
            setIsLoading(false);
            console.log(err.response);
            alert("선택된 사진의 총 크기가 50MB 보다 크거나 유효하지 않은 확장자입니다.");
            window.location.reload();
        });
    };

    return (
      <div>
        <DragNDropContainer>
            {
               isLoading && 
                <Loading>
                    <div className="loading-container">
                        <div className="loading"></div>
                        <div id="loading-text">loading</div>
                    </div>
                </Loading> 
            }
            <section className="form-container">
              <label htmlFor="uploadPhoto">
                <div {...getRootProps({className: 'dropzone'})}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                  </svg>
                  <input {...getInputProps()} type="file" name="images" id="uploadPhoto" accept="image/*" multiple ref={inputRef}/>
                  <p>Drag & drop or click to select files</p>
                </div>
              </label>
            </section>
        </DragNDropContainer>
        { fileRejectionItems.length > 0 && <span style={{color: "red"}}>'6 files(50MB)' are the maximum number of 'Images' you can drop here</span>}
        {thumbs.length > 0 && <React.Fragment>
          <ThumbsContainer>{thumbs}</ThumbsContainer>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </React.Fragment>}
      </div>
    );
}

const DragNDropContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 480px;
    width: 640px;
    background-color: #fff;
    color: #000;
    border: none;
    border-radius: 25px;
    font-size: 22px;
    font-weight: bold;

    @media (max-width: 767px) {
        height: 320px;
        width: 400px;
        font-size: 20px;
    }

    .form-container {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;

      .dropzone {
        display: flex;
        flex-direction: column;
        height: 480px;
        width: 640px;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        @media (max-width: 767px) {
          height: 320px;
          width: 400px;
          font-size: 20px;
        }

        svg {
          height: 80px;
          width: 80px;
        }

        p {
          font-size: 21px;
    
          @media (max-width: 767px) {
            font-size: 18px;
          }
        }
      }
    }
`;

const ThumbsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Thumb = styled.div`
  display: flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SubmitButton = styled.button`
    display: block;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #747AFD;
    color: #ffffff;
    height: 30px;
    width: 100px;
    font-weight: medium;
    
    &:hover {
      background-color: #646AFD;
      transition: 0.2s ease;
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