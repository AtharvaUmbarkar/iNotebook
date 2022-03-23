import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {

  //TODO: Convert to AlertContext
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      showAlert(null);
    }, 1500);
  }

  return (
    <div>
      <BrowserRouter>
        <NoteState>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Navigate replace to="/home" />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            </Routes>
          </div>
        </NoteState>
      </BrowserRouter>
    </div>
  );
}

export default App;
