import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateGame from "../hooks/useCreateGame";

export default function Home() {
    const { createGame } = useCreateGame();
    const [gameName, setGameName] = useState("");
    const [players, setPlayers] = useState([""]);                                   
    const navigate = useNavigate();                                                             

    const CreateGame = async () => {
        const filteredPlayers = players.filter(player => player.name.trim() !== "");

    
        if (filteredPlayers.length >= 1) {
            try {
                const newGameId = createGame(gameName, filteredPlayers);
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

    const CreatePlayer = () => {
        setPlayers(prevPlayers => [
            ...prevPlayers,
            { name: "", id: prevPlayers.length + 1 }
        ]);
    };    

    const removePlayer = (id) => {
        const updatedPlayers = players.filter(player => player.id !== id);
        setPlayers(updatedPlayers);
    };  

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
                                value={player.name || ""} // Une valeur par défaut pour éviter une valeur nul ou undefini
                                onChange={(e) => handlePlayerChange(player.id, e.target.value)}
                            />
                            <button className="Delete" onClick={() => removePlayer(player.id)}>X</button>
                        </div>
                    ))}


                    
                    <button onClick={CreatePlayer}>Ajouter un joueur</button>        
                    <button onClick={CreateGame}>Create Game</button>
                </div>
            </div>
        </div>
    );
}
