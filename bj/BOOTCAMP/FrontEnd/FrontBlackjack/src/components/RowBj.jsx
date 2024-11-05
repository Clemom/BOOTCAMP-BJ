export default function RowBj({ id, name, score }) {
    return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{score}</td>
    </tr>
    );
}