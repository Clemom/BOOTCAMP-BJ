import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GamePage() {
    const { id } = useParams()
    const navigate = useNavigate(); 
    const { players = ["Player 1", "Player 2"], gameName } = location.state || {};                 // Par défaut j'ai Player 1... sinon j'ai le nom récupérer sur Home par location
    const [currentPlayer, setCurrentPlayer] = useState(players[0]);                                // Récupere le nom du joueur et dans une liste lui attribut un playerIndex
    const [playerIndex, setPlayerIndex] = useState(0);                                             // Défini un index pour le joueur
    const [score, setScore] = useState(0);                                                         // Défini le score sur 0 et attend un nouvelle état
    const [diceCount, setDiceCount] = useState(1);                                                 // Défini le nombre de dés à lancer, initialise l'état sur 1
    const [turnsLeft, setTurnsLeft] = useState(3);                                                 // Défini le nombre de tours restant, initialise le nombre de tour restants sur 3
    const { getPlayers } = useCreateGame();                                                              // useLocation me permet de récuperer les noms des joueurs pour les envoyés dans ma partie
    const [scoreBoard, setScoreBoard] = useState([]);                                              // Créé un tableau vide qui attend le tableau de score

    const rollDice = () => {
        if (turnsLeft > 0 && score < 21) {
            const roll = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1); // Lancé de dés
            const rollAdd = roll.reduce((a, b) => a + b, 0);                                         // Additionne mes dés et desincrémente mes lancés
            const newScore = score + rollAdd;                                                        // Défini le score du joueur en fonction de rollADD
            setScore(newScore);                                                                      // Renvoi le nouveau score
            setTurnsLeft(turnsLeft - 1);                                                             // Désincrémente mes tours
    
            if (newScore >= 21 || turnsLeft === 1) {                                                 // Permet de terminer le tour avec 2 conditions
                endTurn(newScore);
            }
        }
    };
    
    const endTurn = (finalScore) => {                                                                // Met en place le scoreBoard
        setScoreBoard((prevScoreBoard) => [
            ...prevScoreBoard,
            { name: currentPlayer, score: finalScore }                                               // Place le nom du joueur actuel et son score de fin de partie
        ]);
    
        const nextIndex = (playerIndex + 1) % players.length;                                        // Permet de passer d'un joueur a l'autre en incrémentant l'index
        setPlayerIndex(nextIndex);
        setCurrentPlayer(players[nextIndex]);
    
        setScore(0);                                                                                 // Réinitialise le score à 0
        setTurnsLeft(3);                                                                             // Reinitialise les tours pour le prochains joueurs
    };

    return (
        <div className="GamePage">
            <div className="GamePageContainer">   
            <h2>Blackjack - {gameName}</h2>
            <p><span>{currentPlayer}</span></p>
            <p className="score">Score du joueur : {score}</p>
            <select value={diceCount} onChange={(e) => setDiceCount(parseInt(e.target.value))}>    {/*Met en place le select pour le choix de nombre de dés*/}
                <option value={1}>1 Dé</option>
                <option value={2}>2 Dés</option>
                <option value={3}>3 Dés</option>
            </select>
            <div className="actionTour">
            <button onClick={rollDice}>Lancer les dés</button>                                      {/*Lance les dés au clic*/}
            <button onClick={endTurn}>Finir tour</button>                                           {/*Fini le tour au clic*/}
            </div>
            <h2>ScoreBoard</h2>
            <button className="home" onClick={() => navigate("/")}>Retour à l'accueil</button>      {/* Redirige à l'accueil au clic, en passant par le navigate */}
        </div>
        </div>
    );
}
