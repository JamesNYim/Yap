import React from "react";
import './App.css';
import LoginForm from './LoginForm';
import Signup from './Signup';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<LoginForm />}></Route>
              <Route path={'/signup'} element={<Signup />}></Route>>
          </Routes>
      </BrowserRouter>
    );
}

export default App;