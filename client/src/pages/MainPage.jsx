import React from "react";
import MainNav from "../components/MainNav";
import PhotoFrame from "../components/PhotoFrame";
import ViewContainer from "../components/ViewContainer";
import PhotoContainer from "../components/PhotoContainer";
import SidePhotoFrame from "../components/SidePhotoFrame";

function MainPage() {
  return (
    <div className="MainPage">
        <MainNav></MainNav>
        <ViewContainer>
          <PhotoContainer>
            <SidePhotoFrame></SidePhotoFrame>
            <PhotoFrame></PhotoFrame>
            <SidePhotoFrame></SidePhotoFrame>
          </PhotoContainer>
        </ViewContainer>
    </div>
  );
}

export default MainPage;