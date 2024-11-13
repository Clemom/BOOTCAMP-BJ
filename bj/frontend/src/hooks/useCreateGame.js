import { useCallback } from "react";

function useCreateGame() {
    // Permet créer une partie avec un nom et une liste de joueurs
    const createGame = async (gameName, players) => {
            const playerNames = players.map(player => player.name); // Extrait les noms des joueurs

            const response = await fetch("http://localhost:8000/api/create_game", {
                method: "POST", // Envoie une requête POST à l'API
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: gameName,
                    players: playerNames,
                }),
            });

            const data = await response.json();
            return data.id; 
    };

    // Fonction pour récupérer les joueurs d'une partie existante
    const createPlayers = useCallback(async (gameId) => {
            const response = await fetch(`http://127.0.0.1:8000/api/game/${gameId}/players`, {
                method: "GET", // Envoie une requête GET pour récupérer les joueurs
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json(); 
            return data;
    }, []);

    return { createGame, createPlayers };
}

export default useCreateGame;
