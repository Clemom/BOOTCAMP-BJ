import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateGame from "../hooks/useCreateGame";

export default function Home() {
    const { createGame } = useCreateGame();
    const [gameName, setGameName] = useState("");
    const [players, setPlayers] = useState([""]);                                   
    const navigate = useNavigate();                                                             

    const CreateGame = async () => {
        const filteredPlayers = players.filter(player => player.trim() !== "");
    
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

    const handlePlayerChange = (index, value) => {                                              // Permet de creer un nouveau joueur en lui attribuant un nom et un index
        const newPlayers = [...players];
        newPlayers[index] = value;
        setPlayers(newPlayers);
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
                    {players.map((player, index) => (                                           // a l'interaction de l'input player key donne l'index du joueur et la value donne le nom du joueur
                        <div className="input_players" key={player.id}>
                        <input
                            type="text"
                            placeholder={`Joueur ${index + 1}`}
                            key = {index + 1}
                            value={player.name}
                            onChange={(e) => handlePlayerChange(index, e.target.value)}
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
