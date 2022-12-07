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
        <div className="client-details">
            <button onClick={handleClickDelete}>Usuń klienta</button>
            <strong> <p> {client.imie} { } {client.nazwisko}</p> </strong>
            <p>Data dołączenia do rejestru klientów: {client.createdAt}</p>
            <p> Numer konta:{client.numer_konta} </p>
        </div>
    )

}

export default ClientDetails