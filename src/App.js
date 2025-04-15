import './App.scss';
import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

// Init code React app by `create react app`
const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container">

        </div>
        <div className="app-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
