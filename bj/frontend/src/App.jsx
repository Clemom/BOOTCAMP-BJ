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

BlackJack - Clément Moreau

Installer les dépendances :

Dans le répertoire du front-end : cd .\BOOTCAMP\bj\BOOTCAMP\FrontEnd\FrontBlackjack\

npm install

npm run dev

Back-end :

Dans le répertoire du back-end : cd .\BOOTCAMP\bj\BOOTCAMP\BlackJackV2\backend\

python -m venv .venv

.venv\Scripts\activate

python.exe -m pip install --upgrade pip

pip install Django

pip install Django-ninja

pip install django-cors-headers

python manage.py runserver

Des erreurs ont été faites à la création du projet d'où, le nombre intermédiaire de dossier.

Les dossiers principaux :

FrontBlackjack
backend