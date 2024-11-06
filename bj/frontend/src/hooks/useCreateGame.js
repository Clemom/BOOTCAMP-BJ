import { useCallback } from "react";

function useCreateGame() {
    const createGame = async (gameName, players) => {
        try {
            const playerNames = players.map(player => player.name);

            const response = await fetch("http://localhost:8000/api/create_game", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: gameName,
                    players: playerNames,
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création du jeu");
            }

            const data = await response.json();
            console.log("Partie créée avec succès :", data);
            return data.id;
        } catch (error) {
            console.error("Erreur lors de la création de la partie :", error);
            throw error;
        }
    };

    const createPlayers = useCallback(async (gameId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/game/${gameId}/players`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("Game details:", data);
            return data;
        } catch (error) {
            console.error("Error fetching game:", error);
            throw error;
        }
    }, []);

    return { createGame, createPlayers };
}

export default useCreateGame;
