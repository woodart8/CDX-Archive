import React, { useEffect, useState, useCallback } from "react";
import PhotoFrame from "./PhotoFrame";
import PhotoContainer from "./PhotoContainer";
import FullSizeViewModal from "./FullSizeViewModal";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import FullSizePhotoFrame from "./FullSizePhotoFrame";
import Button from "./Button";
import ButtonContainer from "./ButtonContainer";
import TopMenu from "./TopMenu";

function RenderPhoto() {
    const [photoList, setPhotoList] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [visible, setVisible] = useState(false);
    const [fullSizePhotoId, setFullSizePhotoId] = useState("");
    const [fullSizePhotoUrl, setFullSizePhotoUrl] = useState("");
    const [isDesc, setIsDesc] = useState(true);
    const [ref, inView] = useInView({
        threshold: 0
    });

    const photoFetchAsc = useCallback(async () => {
        await axios.get(`http://localhost:5000/gallery?pageNo=${page}&pageSize=12&isDesc=false`)
        .then((res) => {
            setPhotoList([...photoList, ...res.data.list]);
            setPage((page) => page + 1);
            setTotal(res.data.total);
        })
        .catch((err) => {console.log(err)});
    }, [page, photoList]);

    const photoFetchDesc = useCallback(async () => {
        await axios.get(`http://localhost:5000/gallery?pageNo=${page}&pageSize=12&isDesc=true`)
        .then((res) => {
            setPhotoList([...photoList, ...res.data.list]);
            setPage((page) => page + 1);
            setTotal(res.data.total);
        })
        .catch((err) => {console.log(err)});
    }, [page, photoList]);
    
    useEffect(() => {
        photoFetchDesc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(inView && photoList.length !== total) {
            if(isDesc)
                photoFetchDesc();
            else
                photoFetchAsc();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const handleClick = (e) => {
        setVisible(!visible);
        fullSizePhotoId === "" ? setFullSizePhotoId(e._id) : setFullSizePhotoId("");
        fullSizePhotoUrl === "" ? setFullSizePhotoUrl(e.photoUrl) : setFullSizePhotoUrl("");
    }

    const handleOrder = () => {
        setIsDesc(!isDesc);
        setPhotoList(photoList.reverse());
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/delete/${fullSizePhotoId}`)
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
            <TopMenu>
                <div className="total" style={{display: 'flex', height: '50px', lineHeight: '50px'}}>
                    <span>전체: {total}개</span>
                </div>
                <div className="order-select" style={{display: 'flex', height: '50px', lineHeight: '50px', cursor: 'pointer'}} onClick={handleOrder}>
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
            </TopMenu>
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

export default RenderPhoto;