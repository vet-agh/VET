const ClientDetails = ({ client }) => {

    return (
        <div className="client-details">
            <strong> <p> {client.imie} { } {client.nazwisko}</p> </strong>
            <p>Data dodania do rejestru klientów: {client.createdAt.substring(0, 10)}</p>
            <p>Numer konta: {client.numer_konta} </p>
            <p>Numer identyfikacyjny pacjenta: {client.id_pacjenta}</p>
            </div>
    )

}

export default ClientDetails