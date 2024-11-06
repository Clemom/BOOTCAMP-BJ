import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useCreateGame from "../hooks/useCreateGame"; 

export default function GamePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // Permet d'acceder à location.state
    const { getPlayers } = useCreateGame(); // Permet d'acceder à getPlayers

    const { players = [{ name: "Player 1" }, { name: "Player 2" }], gameName = "Game" } = location.state || {}; // Par défaut, j'ai Player 1 et Player 2 si aucun état n'est passé
    const [currentPlayer, setCurrentPlayer] = useState(players[0]);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [diceCount, setDiceCount] = useState(1);
    const [turnsLeft, setTurnsLeft] = useState(3);
    const [scoreBoard, setScoreBoard] = useState([]);

    // Utilisez useEffect pour récupérer les joueurs depuis l'API si besoin
    useEffect(() => {
        async function fetchPlayers() {
            if (!location.state) { // Si aucun state n'est passé, on récupère les joueurs depuis la base de données
                try {
                    const data = await getPlayers(id);
                    setCurrentPlayer(data.players[0]);
                    setScoreBoard(data.players.map(player => ({ name: player.name, score: 0 })));
                } catch (error) {
                    console.error("Erreur lors de la récupération des joueurs :", error);
                }
            }
        }
        fetchPlayers();
    }, [id, location.state, getPlayers]);

    const rollDice = () => {
        if (turnsLeft > 0 && score < 21) {
            const roll = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
            const rollAdd = roll.reduce((a, b) => a + b, 0);
            const newScore = score + rollAdd;
            setScore(newScore);
            setTurnsLeft(turnsLeft - 1);
    
            if (newScore >= 21 || turnsLeft === 1) {
                endTurn(newScore);
            }
        }
    };
    
    const endTurn = (finalScore) => {
        setScoreBoard((prevScoreBoard) => [
            ...prevScoreBoard,
            { name: currentPlayer.name, score: finalScore }
        ]);
    
        const nextIndex = (playerIndex + 1) % players.length;
        setPlayerIndex(nextIndex);
        setCurrentPlayer(players[nextIndex]);
    
        setScore(0);
        setTurnsLeft(3);
    };

    return (
        <div className="GamePage">
            <div className="GamePageContainer">   
                <h2>Blackjack - {gameName}</h2>
                <p><span>{currentPlayer.name}</span></p>
                <p className="score">Score du joueur : {score}</p>
                <select value={diceCount} onChange={(e) => setDiceCount(parseInt(e.target.value))}>
                    <option value={1}>1 Dé</option>
                    <option value={2}>2 Dés</option>
                    <option value={3}>3 Dés</option>
                </select>
                <div className="actionTour">
                    <button onClick={rollDice}>Lancer les dés</button>
                    <button onClick={() => endTurn(score)}>Finir tour</button>
                </div>
                <h2>ScoreBoard</h2>
                <ul>
                    {scoreBoard.map((entry, index) => (
                        <li key={index}>{entry.name}: {entry.score}</li>
                    ))}
                </ul>
                <button className="home" onClick={() => navigate("/")}>Retour à l'accueil</button>
            </div>
        </div>
    );
}
