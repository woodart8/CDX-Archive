import React from "react";
import MainNav from "../components/MainNav";
import ViewContainer from "../components/ViewContainer";
import AddButton from "../components/AddButton";
import RenderPhoto from "../components/RenderPhoto";

function GalleryPage() {
    return (
        <div className="GalleryPage">
            <MainNav></MainNav>
            <AddButton/>
            <ViewContainer>
                <RenderPhoto></RenderPhoto>
            </ViewContainer>
        </div>
    );
}

export default GalleryPage;