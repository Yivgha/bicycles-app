import React from "react";
import { Route, Routes } from "react-router-dom";
import BicycleList from "./components/bicycleList";
import Edit from "./components/edit";
import Create from "./components/create";
import "./styles/main.scss";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<BicycleList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};
export default App;
