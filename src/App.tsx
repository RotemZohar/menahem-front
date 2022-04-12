import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SingupPage from "./components/sign-up/SignupPage";
import EditDetailsPage from "./components/edit-details/EditDetails";
import LandingPage from "./components/landing-page/LandingPage";
import { useAppSelector } from "./redux/store";
import AdminPage from "./components/admin-page/AdminPage";
import PostsPage from "./components/posts/PostsPage";
import PetDetails from "./components/pet-details/PetDetails";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="signup" element={<SingupPage />} />
      <Route path="posts" element={<PostsPage />} />
      <Route path="editDetails" element={<EditDetailsPage />} />
      <Route path="admin" element={<AdminPage />} />
    </Routes>
  </div>
);

export default App;
