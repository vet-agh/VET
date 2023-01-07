import { useEffect, useState } from 'react'
import { useClientContext } from '../hooks/useClientContext'
import { useAuthContext } from '../hooks/useAuthContext'
import PatientDetails from '../components/PatientDetails'

const ClientDetails = ({ client }) => {
    const { dispatch } = useClientContext()
    const { user } = useAuthContext()
    const [patients, setPatients] = useState('')
    const [showed, setShowed] = useState('');

    useEffect(() => {
        const fetchData = async () => {   
            const response = await fetch('/api/patients', {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              })
            const json = await response.json()
            setPatients(json)
        }
        fetchData().catch(console.error);
    }, [])

    const handleClickDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/clients/' + client._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_CLIENT', payload: json})
        }
    }

    return (
        <div className="form-details">
            {(user.role === 1 || user.role === 2) && <button className="delete-button" onClick={handleClickDelete}>Usuń klienta</button>}
            <p><strong>Imię: </strong>{client.imie}</p>
            <p><strong>Nazwisko: </strong>{client.nazwisko}</p>
            <p><strong>Numer konta: </strong>{client.numer_konta} </p>
            <p><strong>ID Pacjenta: </strong>{client.id_pacjenta}</p>
            <p style={{color: "#E5BA73"}} onClick={() => setShowed(showed => !showed)}><strong>Pokaż szczegóły pacjentów:</strong></p>
            {showed ? 
            <div id="patient-details">
                {patients && patients.filter(p => (p.id_klienta === client._id)).map(p => (
                <PatientDetails patient={p} key={p._id}/>))}
                <br></br>
            </div> : null}
            <p><i>Data dodania klienta do rejestru klientów: </i>{client.createdAt.substring(0, 10)}</p>
        </div>
    )
}

export default ClientDetails