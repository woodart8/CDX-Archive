import React from "react";
import MainNav from "../components/MainNav";
import ViewContainer from "../components/ViewContainer";
import GlobalBackground from "../components/GlobalBackground";
import TypingText from "../components/TypingText";
import TextContainer from "../components/TextContainer";

function MainPage() {
  return (
    <div className="MainPage">
        <MainNav></MainNav>
        <ViewContainer>
          <TextContainer>
            <TypingText text="WELCOME TO CDX ARCHIVE"/>
          </TextContainer>
          <GlobalBackground/>
        </ViewContainer>
    </div>
  );
}

export default MainPage;