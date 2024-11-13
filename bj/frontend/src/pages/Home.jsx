import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateGame from "../hooks/useCreateGame";

export default function Home() {
    const { createGame } = useCreateGame();
    const [gameName, setGameName] = useState("");
    const [players, setPlayers] = useState([{ name: "", id: 1 }]);
    const navigate = useNavigate();

    // Fonction pour créer une partie
    const CreateGame = async () => {
        const filteredPlayers = players.filter(player => player.name.trim() !== "");

        if (filteredPlayers.length >= 1) {
            try {
                const newGameId = await createGame(gameName, filteredPlayers);
                if (newGameId) {
                    navigate(`/game/${newGameId}`, { state: { players: filteredPlayers, gameName } });
                }
            } catch (error) {
                alert("Une erreur est survenue lors de la création de la partie.");
            }
        } else {
            alert("Entrez au moins un joueur");
        }
    };

    // Fonction pour ajouter un joueur à la liste
    const CreatePlayer = () => {
        setPlayers(prevPlayers => [
            ...prevPlayers,
            { name: "", id: prevPlayers.length + 1 }
        ]);
    };

    // Fonction pour supprimer un joueur
    const removePlayer = (id) => {
        const updatedPlayers = players.filter(player => player.id !== id);
        setPlayers(updatedPlayers);
    };

    // Fonction pour gérer la modification d'un joueur
    const handlePlayerChange = (id, value) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === id ? { ...player, name: value } : player
            )
        );
    };

    return (
        <div className="center">
            <div className="form">
                <h1>BLACKJACK</h1>
                <div className="Board">
                    <input
                        type="text"
                        placeholder="Nom Partie"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                    />
                    {players.map((player, index) => (
                        <div className="input_players" key={player.id || index}> 
                            <input
                                type="text"
                                placeholder={`Joueur ${index + 1}`}
                                value={player.name || ""}
                                onChange={(e) => handlePlayerChange(player.id, e.target.value)}
                            />
                            <button 
                            className="Delete" 
                            onClick={() => removePlayer(player.id)}>X</button>
                        </div>
                    ))}

                    <button onClick={CreatePlayer}>Ajouter un joueur</button>        
                    <button onClick={CreateGame}>Créer une partie</button>
                </div>
            </div>
        </div>
    );
}
