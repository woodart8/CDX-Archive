import React from "react";
import MainNav from "../components/MainNav";
import PhotoFrame from "../components/PhotoFrame";
import PhotoContainer from "../components/PhotoContainer";
import ViewContainer from "../components/ViewContainer";

function GalleryPage() {
    return (
        <div className="GalleryPage">
            <MainNav></MainNav>
            <ViewContainer>
                <PhotoContainer>
                    <PhotoFrame></PhotoFrame>
                    <PhotoFrame></PhotoFrame>
                    <PhotoFrame></PhotoFrame>
                    <PhotoFrame></PhotoFrame>
                    <PhotoFrame></PhotoFrame>
                </PhotoContainer>
            </ViewContainer>
        </div>
    );
}

export default GalleryPage;