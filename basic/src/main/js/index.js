import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Logg from "./Logg";

export default class Index extends React.Component{
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='login' element={<Logg />}/>
        </Routes>
      </Router>
    )
  }
}
