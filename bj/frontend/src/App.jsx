import './App.css'; 
import { Route, Routes } from "react-router-dom";
import GamePage from "./pages/GamePage";
import Home from "./pages/Home"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:id" element={<GamePage />} />
    </Routes>
  );
}

export default App; 
