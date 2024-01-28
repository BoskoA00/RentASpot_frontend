import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Forum from "./Pages/Forum";
import Home from "./Pages/Home";
import Profil from "./Pages/Profile";
import Footer from "./Components/Shared/Footer";
import Navigation from "./Components/Shared/Navigation";
import CreateOglas from "./Pages/CreateOglas.js";
import EditQuestion from "./Pages/EditQuestion.js";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContext";
import axios from "axios";
import EditOglas from "./Pages/EditOglas.js";
import CreateQuestion from "./Pages/CreateQuestion.js";
import DiffProfil from "./Pages/DiffProfile.js";
import OglasView from "./Pages/OglasView.js";
import Korisnici from "./Pages/Korisnici.js";
import CreateAnswer from "./Pages/CreateAnswer.js";
import EditProfile from "./Pages/EditProfile.js";
function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createOglas" element={<CreateOglas />} />
        <Route path="/editOglas" element={<EditOglas />} />
        <Route path="/createQuestion" element={<CreateQuestion />} />
        <Route path="/editQuestion" element={<EditQuestion />} />
        <Route path="/Oglas/:id" element={<OglasView />} />
        <Route path="/user/:id" element={<DiffProfil />} />
        <Route path="/Oglas/:id/edit" element={<EditOglas />} />
        <Route path="/:id/CreateAnswer" element={<CreateAnswer />} />
        <Route path="/korisnici" element={<Korisnici />} />
        <Route path="/:Qid/editQuestion" element={<EditQuestion />} />
        <Route path="/:QId/createAnswer" element={<CreateAnswer />} />
        <Route path="profil/:id/editProfile" element={<EditProfile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
