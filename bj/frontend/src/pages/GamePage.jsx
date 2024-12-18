import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useCreateGame from "../hooks/useCreateGame"; 

export default function GamePage() {
    // Récupère les paramètres de l'URL et les outils de navigation/redirection
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { getPlayers } = useCreateGame(); 

     // Données par défaut pour le jeu
    const { players = [{ name: "Player 1" }, { name: "Player 2" }], gameName = "Game" } = location.state || {};
    const [currentPlayer, setCurrentPlayer] = useState(players[0]);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [diceCount, setDiceCount] = useState(1);
    const [scoreBoard, setScoreBoard] = useState([]);
    const [hasPlayed, setHasPlayed] = useState(Array(players.length).fill(false));
    const [gameFinished, setGameFinished] = useState(false);

    // Charge les joueurs si l'état initial n'est pas fourni
    useEffect(() => {
        async function fetchPlayers() {
            if (!location.state) {
                try {
                    const data = await getPlayers(id);
                    setCurrentPlayer(data.players[0]);
                    setScoreBoard(data.players.map(player => ({ name: player.name, score: 0 })));
                    setHasPlayed(Array(data.players.length).fill(false));
                } catch (error) {
                    console.error("Erreur lors de la récupération des joueurs :", error);
                }
            }
        }
        fetchPlayers();
    }, [id, location.state, getPlayers]);

    // Gère le lancer des dés et gère la logique du jeu (qui doit se trouver dans le back normalement...)
    const rollDice = () => {
        if (score < 21) {
            const roll = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
            const rollAdd = roll.reduce((a, b) => a + b, 0);
            const newScore = score + rollAdd;
            setScore(newScore);

            // Passe le tour si le score du joueur atteint ou dépasse 21
            if (newScore >= 21) {
                endTurn(newScore);
            }
        }
    };
    
    // Termine le tour et passe au joueur suivant
    const endTurn = (finalScore) => {
        setScoreBoard((prevScoreBoard) => [
            ...prevScoreBoard.filter(entry => entry.name !== currentPlayer.name),
            { name: currentPlayer.name, score: finalScore }
        ]);

        setHasPlayed((prevHasPlayed) => {
            const updatedHasPlayed = [...prevHasPlayed];
            updatedHasPlayed[playerIndex] = true;
            if (updatedHasPlayed.every((played) => played)) {
                setGameFinished(true); // Marque la partie comme terminée une fois que tous les joueurs ont lancés les dés
            }
            return updatedHasPlayed;
        });

        // Tres important !
        if (!gameFinished) {
            const nextIndex = (playerIndex + 1) % players.length;// Passe au joueur suivant
            setPlayerIndex(nextIndex);
            setCurrentPlayer(players[nextIndex]);
            setScore(0);// Met le score à 0 pour le prochain joueur
        }
    };

    // Détermine les gagnants de la partie
    const getWinners = () => {
        const maxScore = Math.max(...scoreBoard.map(player => player.score).filter(score => score <= 21));
        return scoreBoard.filter(player => player.score === maxScore);
    };

    return (
        <div className="GamePage">
            <div className="GamePageContainer">   
                <h2>Blackjack - {gameName}</h2>
                {gameFinished ? (
                    <div>
                        <h3>Score final</h3>
                        <ul>
                            {scoreBoard.map((entry, index) => (
                                <li key={index}>{entry.name}: {entry.score}</li>
                            ))}
                        </ul>
                        <h3>Gagnant(s)</h3>
                        <ul>
                            {getWinners().map((winner, index) => (
                                <li 
                                key={index} 
                                className="winner">{winner.name}: {winner.score}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <>
                        <p><span>{currentPlayer.name}</span></p>
                        <p className="score">Score du joueur : {score}</p>
                        <select 
                        value={diceCount} 
                        onChange={(e) => setDiceCount(parseInt(e.target.value))}>
                            <option value={1}>1 Dé</option>
                            <option value={2}>2 Dés</option>
                            <option value={3}>3 Dés</option>
                        </select>
                        <div className="actionTour">
                            <button 
                            onClick={rollDice} 
                            disabled={hasPlayed[playerIndex]}>Lancer les dés</button>
                            <button 
                            onClick={() => endTurn(score)} 
                            disabled={hasPlayed[playerIndex]}>Finir tour</button>
                        </div>
                        <h2>ScoreBoard</h2>
                        <ul>
                            {scoreBoard.map((entry, index) => (
                                <li key={index}>{entry.name}: {entry.score}</li>
                            ))}
                        </ul>
                    </>
                )}
                <button 
                className="home" 
                onClick={() => navigate("/")}>Retour à l'accueil</button>
            </div>
        </div>
    );
}
