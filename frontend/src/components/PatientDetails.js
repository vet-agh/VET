import { useEffect, useState } from 'react'
import { usePatientContext } from '../hooks/usePatientContext'
import { useAuthContext } from '../hooks/useAuthContext'
import ClientDetails from '../components/ClientDetails'
import { Modal, Button } from 'react-bootstrap'

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
        <div>
            
            <div className={showModal ? "modal-container" : ""}>
                <Modal show={showModal} onHide={handleCloseModal} className="modal">
                    <Modal.Header className="modal-header">
                    <Modal.Title className="modal-title">Modyfikuj pacjenta</Modal.Title>
                    <button type="button" className="modal-close-button" onClick={handleCloseModal}>
                        &times;
                    </button>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                    <form>
                        <div className="modal-form-group">
                            <label htmlFor="imie">Imię</label>
                            <input type="text" className="modal-form-control" name="imie" value={formData.imie} onChange={handleChange} />
                        </div>
                        <div className="modal-form-group">
                            <label htmlFor="gatunek">Gatunek</label>
                            <input type="text" className="modal-form-control" name="gatunek" value={formData.gatunek} onChange={handleChange} />
                        </div>
                        <div className="modal-form-group">
                            <label htmlFor="rasa">Rasa</label>
                            <input type="text" className="modal-form-control" name="rasa" value={formData.rasa} onChange={handleChange} />
                        </div>
                        <div className="modal-form-group">
                            <label htmlFor="id_klienta">ID Klienta</label>
                            <input type="text" className="modal-form-control" name="id_klienta" value={formData.id_klienta} onChange={handleChange} />
                        </div>
                    </form>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                    <Button variant="secondary" className="modal-form-button" onClick={handleCloseModal}>
                        Anuluj
                    </Button>
                    <Button variant="primary" className="modal-form-button" onClick={handleSubmitModal}>
                        Zatwierdź zmiany
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className="form-details">
                {(user.role === 1 || user.role === 2) && <button className="delete-button" id="delete-button-patients" onClick={handleClickDelete}>Usuń pacjenta</button>}
                {(user.role === 1 || user.role === 2) && <Button className="modify-button" id="modify-button-patients" onClick={handleClickModify}>Modyfikuj pacjenta</Button>}
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
            
    </div>
    )

}

export default PatientDetails