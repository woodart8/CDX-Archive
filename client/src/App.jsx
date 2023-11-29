import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GalleryPage from "./pages/GalleryPage";
function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
    );
}

export default App;