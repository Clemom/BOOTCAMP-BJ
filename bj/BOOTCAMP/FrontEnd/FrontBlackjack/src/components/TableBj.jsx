import RowBj from "./RowBj";
export default function TableBj({ players }){

    return(
        <table>
            <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Score</th>
            </thead>
            <tbody>
                {players?.map((player) => (
                    <RowBj
                        key={player.id}
                        id={player.id}
                        name={player.name}
                        score={player.score}
                    />
                    ))}
            </tbody>
        </table>
    );
}