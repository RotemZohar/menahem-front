import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SingupPage from "./components/sign-up/SignupPage";
import EditDetailsPage from "./components/edit-details/EditDetails";
import LandingPage from "./components/landing-page/LandingPage";
import AdminPage from "./components/admin-page/AdminPage";
import PostsPage from "./components/posts/PostsPage";
import CalendarPage from "./components/calendar/CalendarPage";
import { routes } from "./routes";
import PrivateRoute from "./components/private-route/PrivateRoute";

const App = () => (
  <Routes>
    <Route path="" element={<LandingPage />} />
    <Route path={routes.signup} element={<SingupPage />} />
    {/* Everything that's inside private route is accessible only after logging in */}
    <Route element={<PrivateRoute />}>
      <Route path="posts" element={<PostsPage />} />
      <Route path="editDetails" element={<EditDetailsPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="calendar" element={<CalendarPage />} />
    </Route>
  </Routes>
);

export default App;
