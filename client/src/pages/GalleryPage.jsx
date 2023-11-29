import React from "react";
import MainNav from "../components/MainNav";
import GalleryContainer from "../components/GalleryContainer"
import PhotoFrame from "../components/PhotoFrame";

function GalleryPage() {
    return (
        <div className="GalleryPage">
            <MainNav></MainNav>
            <GalleryContainer>
                <PhotoFrame></PhotoFrame>
                <PhotoFrame></PhotoFrame>
                <PhotoFrame></PhotoFrame>
                <PhotoFrame></PhotoFrame>
                <PhotoFrame></PhotoFrame>
                <PhotoFrame></PhotoFrame>
            </GalleryContainer>
        </div>
    );
}

export default GalleryPage;