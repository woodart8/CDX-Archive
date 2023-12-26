import React, { useEffect, useState, useCallback } from "react";
import PhotoFrame from "./PhotoFrame";
import PhotoContainer from "./PhotoContainer";
import axios from "axios";
import { useInView } from 'react-intersection-observer';

function RenderPhoto() {
    const [photoList, setPhotoList] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [ref, inView] = useInView({
        threshold: 0
    });

    const photoFetch = useCallback(async () => {
        await axios.get(`http://43.202.52.215:5000/gallery?pageNo=${page}&pageSize=12`)
        .then((res) => {
            setPhotoList([...photoList, ...res.data.list]);
            setPage((page) => page + 1);
            setTotal(res.data.total);
        })
        .catch((err) => {console.log(err)});
    }, [page, photoList]);

    useEffect(() => {
        photoFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if(inView && photoList.length !== total) photoFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return (
        <div>
            <PhotoContainer>
                {
                    Array.isArray(photoList) && photoList.map((photo,idx) => {
                        return (
                            photoList.length - 1 === idx ?
                                <PhotoFrame key={idx}>
                                    <img id={photo._id} src={photo.photoUrl} alt="" ref={ref}></img>
                                </PhotoFrame>
                                :
                                <PhotoFrame key={idx}>
                                    <img id={photo._id} src={photo.photoUrl} alt=""></img>
                                </PhotoFrame>
                        );
                    })
                }
            </PhotoContainer>
        </div>
    );
}

export default RenderPhoto;