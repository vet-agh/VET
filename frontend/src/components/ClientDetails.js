import { useClientContext } from "../hooks/useClientContext"

const ClientDetails = ({ client }) => {
    const {dispatch} = useClientContext()

    const handleClickDelete = async () => {
        const response = await fetch('/api/clients/' + client._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_CLIENT', payload: json})
        }
    }

    return (
        <div className="form-details">
            <button className="delete-button" onClick={handleClickDelete}>Usuń klienta</button>
            <p><strong>Imię: </strong>{client.imie}</p>
            <p><strong>Nazwisko: </strong>{client.nazwisko}</p>
            <p><strong>Numer konta: </strong>{client.numer_konta} </p>
            <p><strong>Numer identyfikacyjny pacjenta: </strong>{client.id_pacjenta}</p>
            <p><i>Data dodania do rejestru klientów: </i>{client.createdAt.substring(0, 10)}</p>
            </div>
    )

}

export default ClientDetails