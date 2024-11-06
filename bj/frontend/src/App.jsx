import './App.css';
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import GamePage from "./pages/GamePage";
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;