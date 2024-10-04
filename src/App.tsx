import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import MortgageRenewal from "./components/MortgageRenewal";
import BrokenRenewal from "./components/BrokenRenewal";


const App: React.FC = () => {
  return (
    <div>
      {/* Navigation Links */}
      <nav>
        <Link to="/">Another Widget</Link> | <Link to="/mortgage-renewal">Mortgage Renewal</Link> | <Link to="/broken-renewal">Broken Renewal</Link>
      </nav>

      {/* Route Definitions */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mortgage-renewal" element={<MortgageRenewal />} />
        <Route path="/broken-renewal" element={<BrokenRenewal />} />
      </Routes>
    </div>
  );
};

export default App;
