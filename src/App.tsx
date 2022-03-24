import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import socketClient from "socket.io-client";
import SingupPage from "./components/sign-up/SignupPage";
import EditDetailsPage from "./components/edit-details/EditDetails";
import LandingPage from "./components/landing-page/LandingPage";
import { useAppSelector } from "./redux/store";
import AdminPage from "./components/admin-page/AdminPage";
import PostsPage from "./components/posts/PostsPage";

const socket = socketClient("http://localhost:4000");

const App = () => {
  const email = useAppSelector((state) => state.userReducer.email);

  useEffect(() => {
    // No email = no need to connect
    if (!email) return () => {};

    // Email was just set so we need to connect
    socket.emit("sign-in", email);

    // If the email changed before the window closed
    return () => socket.emit("sign-out");
  }, [email]);

  return (
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
};

export default App;
