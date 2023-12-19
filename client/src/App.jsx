import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GalleryPage from "./pages/GalleryPage";
import UploadPage from "./pages/UploadPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/upload" element={<UploadPage />} />
        </Routes>
    );
}

export default App;