import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Home from './Pages/home';
import Login from "./Pages/login";
import Signup from "./Pages/signUp"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
