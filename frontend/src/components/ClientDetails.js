import { useEffect } from "react"
import { useClientContext } from "../hooks/useClientContext"
import { useState } from "react"
import PatientDetails from '../components/PatientDetails'

const ClientDetails = ({ client }) => {
    const {dispatch} = useClientContext()
    const [patients, setPatients] = useState('')

    useEffect(() => {
        const fetchData = async () => {   
            const response = await fetch('/api/patients')
            const json = await response.json()
            setPatients(json)
        }
        fetchData().catch(console.error);
    }, [])

    console.log(patients)

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
            <p><strong>ID Pacjenta: </strong>{client.id_pacjenta}</p>
            <p><strong>Szczegóły pacjenta: </strong></p>
            {patients && patients.filter(p => (p._id === client.id_pacjenta)).map(p => (<p key={client.id_pacjenta}>{p.imie}</p>))}
            {patients && patients.filter(p => (p._id === client.id_pacjenta)).map(p => (
            <PatientDetails patient={p} key={p._id}/>))}
            <p><i>Data dodania do rejestru klientów: </i>{client.createdAt.substring(0, 10)}</p>
        </div>
    )
}

export default ClientDetails