import { useCallback } from "react";

function useCreateGame() {
    const createGame = (gameName, players) => {
        fetch("http://localhost:8000/api/create_game", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: gameName,
                players: players,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la création du jeu");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Partie créée avec succès :", data);
                return data.id;
            })
            .catch((error) => {
                console.error("Erreur lors de la création de la partie :", error);
            });
        };
        const createPlayers = useCallback((gameId) => {
            return fetch(`http://127.0.0.1:8000/api/game/${gameId}/players`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
        },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Game details:", data);
            return data;
        })
        .catch((error) => {
            console.error("Error fetching game:", error);
        });
      }, []);
        return { createGame, createPlayers };
}

export default useCreateGame;
