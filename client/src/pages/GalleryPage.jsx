import React, { useCallback, useState } from "react";
import MainNav from "../components/MainNav";
import ViewContainer from "../components/ViewContainer";
import AddButton from "../components/AddButton";
import RenderPhotoDesc from "../components/RenderPhotoDesc";
import RenderPhotoAsc from "../components/RenderPhotoAsc";
import TopMenu from "../components/TopMenu";

function GalleryPage() {
    const [isDesc, setIsDesc] = useState(true);

    const handleOrderChange = useCallback((order) => {
        setIsDesc(order);
    },[]);

    return (
        <div className="GalleryPage">
            <MainNav></MainNav>
            <AddButton/>
            <ViewContainer>
                <TopMenu handleOrderChange={handleOrderChange}></TopMenu>
                {
                    isDesc ?
                    <RenderPhotoDesc></RenderPhotoDesc>
                    :
                    <RenderPhotoAsc></RenderPhotoAsc>
                }
            </ViewContainer>
        </div>
    );
}

export default GalleryPage;