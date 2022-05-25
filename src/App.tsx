import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import EditDetailsPage from "./components/edit-details/EditDetails";
import LandingPage from "./components/landing-page/LandingPage";
import AdminPage from "./components/admin-page/AdminPage";
import CalendarPage from "./components/calendar/CalendarPage";
import { routes } from "./routes";
import PrivateRoute from "./components/private-route/PrivateRoute";
import { useAppSelector } from "./redux/store";
import SignupPage from "./components/sign-up/SignupPage";
import GroupsPage from "./components/groups-page/Groups";
import PetsPage from "./components/pets-page/Pets";
import PetDetails from "./components/pet-details/PetDetails";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  const showNavbar = useAppSelector((state) => state.navbarReducer);

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path={routes.signup} element={<SignupPage />} />
        {/* Everything that's inside private route is accessible only after logging in */}
        <Route element={<PrivateRoute />}>
          <Route path="editDetails" element={<EditDetailsPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path={routes.calendar} element={<CalendarPage />} />
          <Route path={routes.groups} element={<GroupsPage />} />
          <Route path={routes.pets} element={<PetsPage />} />
          <Route path={routes.pet} element={<PetDetails />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
