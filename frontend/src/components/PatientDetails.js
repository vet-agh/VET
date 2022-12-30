import { usePatientContext } from '../hooks/usePatientContext'
import { useAuthContext } from '../hooks/useAuthContext'

const PatientDetails = ({ patient }) => {
    const { dispatch } = usePatientContext()
    const { user } = useAuthContext()

    const handleClickDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/patients/' + patient._id, {
           method: 'DELETE',
           headers: {
               'Authorization': `Bearer ${user.token}`
           }
        })
        const json = await response.json()

        if (response.ok)
        {
            dispatch({type: 'DELETE_PATIENT', payload: json})
        }
    }

    return (
        <div className="form-details">
            <button className="delete-button" onClick={handleClickDelete}>Usuń pacjenta</button>
            <p><strong>Imie:</strong> {patient.imie} </p>
            <p><strong>Gatunek:</strong> {patient.gatunek} </p>
            <p><strong>Rasa: </strong>{patient.rasa}</p>
            <p><strong>ID Klienta:</strong> {patient.id_klienta} </p>
            <p><i>Data dodania pacjenta do rejestru pacjentów: </i>{patient.createdAt.substring(0, 10)}</p>
        </div>
    )
}

export default PatientDetails