import React from "react";
import MainNav from "../components/MainNav";
import ViewContainer from "../components/ViewContainer";
import Year from "../components/Year";
import YearContainer from "../components/YearContainer";

function MainPage() {
  return (
    <div className="MainPage">
        <MainNav></MainNav>
        <ViewContainer>
          <YearContainer>
            <Year>2023</Year>
            <Year>2022</Year>
            <Year>2021</Year>
            <Year>2020</Year>
            <Year>2019</Year>
            <Year>2018</Year>
            <Year>2017</Year>
            <Year>2016</Year>
            <Year>2015</Year>
            <Year>2014</Year>
          </YearContainer>
        </ViewContainer>
    </div>
  );
}

export default MainPage;