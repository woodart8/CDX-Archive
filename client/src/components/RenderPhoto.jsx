import React, { useEffect, useState } from "react";
import PhotoFrame from "./PhotoFrame";
import PhotoContainer from "./PhotoContainer";
import axios from "axios";

function RenderPhoto() {
    const [photoList, setPhotoList] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5000/gallery")
        .then((res) => {
            setPhotoList(res.data.list);
        })
    },[]);

    return (
        <PhotoContainer>
            {
                Array.isArray(photoList) && photoList.length !== 0 ?
                photoList.map((photo,idx) => {
                    return(
                        <PhotoFrame key={idx}>
                            <img id={photo._id} src={photo.photoUrl} alt=""></img>
                        </PhotoFrame>
                    )
                })
                :
                <div className="empty"></div>
            }
        </PhotoContainer>
    );
}

export default RenderPhoto;