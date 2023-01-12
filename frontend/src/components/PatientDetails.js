import { useEffect, useState } from 'react'
import { usePatientContext } from '../hooks/usePatientContext'
import { useAuthContext } from '../hooks/useAuthContext'
import ClientDetails from '../components/ClientDetails'


const PatientDetails = ({ patient }) => {
    const { dispatch } = usePatientContext()
    const { user } = useAuthContext()
    const [clients, setClients] = useState('')
    const [showed, setShowed] = useState('');

    useEffect(() => {
        const fetchData = async () => {   
            const response = await fetch('/api/clients', {
                headers: {
                  'Authorization': `Bearer ${user.token}`,
                  'Content-Type': `application/json`
                }
              })
            const json = await response.json()
            setClients(json)
        }
        fetchData().catch(console.error);
    }, [])

    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        imie: patient.imie,
        gatunek: patient.gatunek,
        rasa: patient.rasa,
        id_klienta: patient.id_klienta
    })

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmitModal = async () => {
        if (!user) {
            return
        }

        const body = JSON.stringify(formData)

        const response = await fetch('/api/patients/' + patient._id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': `application/json`
            },
            body: body
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'UPDATE_PATIENTS', payload: json})
            setShowModal(false)
        }
    }

    const handleClickModify = () => {
        setShowModal(true)
    }

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
            {(user.role === 1 || user.role === 2) && <button className="delete-button" onClick={handleClickDelete}>Usuń pacjenta</button>}
            <p><strong>Imie:</strong> {patient.imie} </p>
            <p><strong>Gatunek:</strong> {patient.gatunek} </p>
            <p><strong>Rasa: </strong>{patient.rasa}</p>
            <p><strong>ID Klienta:</strong> {patient.id_klienta} </p>
            <p style={{color: "#E5BA73"}} onClick={() => setShowed(showed => !showed)}><strong>Pokaż szczegóły klienta:</strong></p>
            {showed ? 
            <div id="patient-details">
                {clients && clients.filter(c => (c._id === patient.id_klienta)).map(c => (
                <ClientDetails client={c} key={c._id}/>))}
                <br></br>
            </div> : null}
            <p><i>Data dodania pacjenta do rejestru pacjentów: </i>{patient.createdAt.substring(0, 10)}</p>
        </div>
    )
}

export default PatientDetails