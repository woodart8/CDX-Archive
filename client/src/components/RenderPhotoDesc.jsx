import React, { useEffect, useState, useCallback } from "react";
import PhotoFrame from "./PhotoFrame";
import PhotoContainer from "./PhotoContainer";
import FullSizeViewModal from "./FullSizeViewModal";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import FullSizePhotoFrame from "./FullSizePhotoFrame";
import Button from "./Button";
import ButtonContainer from "./ButtonContainer";

function RenderPhotoDesc() {
    const [photoList, setPhotoList] = useState([]);
    const [page, setPage] = useState(1);
    const [isEnd, setIsEnd] = useState(false);
    const [visible, setVisible] = useState(false);
    const [fullSizePhotoId, setFullSizePhotoId] = useState("");
    const [fullSizePhotoUrl, setFullSizePhotoUrl] = useState("");
    const [ref, inView] = useInView({
        threshold: 0
    });

    const photoFetchDesc = useCallback(async () => {
        await axios.get(`http://43.202.52.215:5000/gallery?pageNo=${page}&pageSize=12&isDesc=true`)
        .then((res) => {
            setPhotoList([...photoList, ...res.data.list]);
            setPage((page) => page + 1);
            setIsEnd(res.data.isEnd);
        })
        .catch((err) => {console.log(err)});
    }, [page, photoList]);
    
    useEffect(() => {
        photoFetchDesc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(inView && !isEnd) {
            photoFetchDesc();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const handleClick = (e) => {
        setVisible(!visible);
        fullSizePhotoId === "" ? setFullSizePhotoId(e._id) : setFullSizePhotoId("");
        fullSizePhotoUrl === "" ? setFullSizePhotoUrl(e.photoUrl) : setFullSizePhotoUrl("");
    }

    const handleDelete = () => {
        axios.delete(`http://43.202.52.215:5000/delete/${fullSizePhotoId}`)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        setTimeout(() => {window.location.reload(true);}, 500);
    }

    return (
        <div>
            {
                visible && 
                <FullSizeViewModal>
                    <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}} onClick={() => handleClick()}>
                        <FullSizePhotoFrame>
                            <img id={fullSizePhotoId} src={fullSizePhotoUrl} alt="" style={{height: '100%', width: '100%', objectFit: 'contain'}}></img>
                        </FullSizePhotoFrame>
                        <ButtonContainer>
                            <Button><i className="fa-solid fa-trash" onClick={handleDelete}></i></Button>
                        </ButtonContainer>
                    </div>
                </FullSizeViewModal>
            }
            <PhotoContainer>
                {
                    Array.isArray(photoList) && photoList.map((photo,idx) => {
                        return (
                            photoList.length - 1 === idx ?
                                <PhotoFrame key={idx}>
                                    <img id={photo._id} src={photo.photoUrl} alt="" onClick={() => handleClick(photo)} ref={ref}></img>
                                </PhotoFrame>
                                :
                                <PhotoFrame key={idx}>
                                    <img id={photo._id} src={photo.photoUrl} alt="" onClick={() => handleClick(photo)}></img>
                                </PhotoFrame>
                        );
                    })
                }
            </PhotoContainer>
        </div>
    );
}

export default RenderPhotoDesc;