import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import EditDetailsPage from "./components/edit-details/EditDetails";
import LandingPage from "./components/landing-page/LandingPage";
import AdminPage from "./components/admin-page/AdminPage";
import PostsPage from "./components/posts/PostsPage";
import PetDetails from "./components/pet-details/PetDetails";
import { routes } from "./routes";
import PrivateRoute from "./components/private-route/PrivateRoute";
import SignUpPage from "./components/sign-up/SignupPage";

const App = () => (
  <div className="App">
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path={routes.signup} element={<SignUpPage />} />
      {/* Everything that's inside private route is accessible only after logging in */}
      <Route element={<PrivateRoute />}>
        <Route path="posts" element={<PostsPage />} />
        <Route path="editDetails" element={<EditDetailsPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="pet" element={<PetDetails />} />
      </Route>
    </Routes>
  </div>
);

export default App;
