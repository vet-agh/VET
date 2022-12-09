const ClientDetails = ({ client }) => {

    return (
        <div className="client-details">
            <strong> <p> {client.imie} { } {client.nazwisko}</p> </strong>
            <p>Data dołączenia do rejestru klientów: {client.createdAt}</p>
            <p> Numer konta:{client.numer_konta} </p>
        </div>
    )

}

export default ClientDetails