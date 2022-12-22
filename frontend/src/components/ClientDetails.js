import { useClientContext } from "../hooks/useClientContext"
import {usePatientContext} from "../hooks/usePatientContext"

// Fetch clinics data
const {patient, dispatch} = usePatientContext()
useEffect(() => {
    const fetchPatients = async () => {
        const response = await fetch('/api/patient')
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'SET_PATIENT', payload: json})
        }
    }
    fetchPatients()
}, [dispatch])

// No auto refresh - bug ment to be fixed
//const {dispatch} = useEquipmentContext()


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
            <p><strong>ID Pacjenta: </strong>{client.id_pacjenta}</p>
            <p><strong>Szczegóły pacjenta: </strong>
            {{patient , patient.map((patient) => (
                    key={client._id} , value={patient._id}>
                        {patient.imie})}</p>
            
            <p><i>Data dodania do rejestru klientów: </i>{client.createdAt.substring(0, 10)}</p>
        </div>
    )
}

export default ClientDetails