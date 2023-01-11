import { useEffect, useState } from 'react'
import { useClientContext } from '../hooks/useClientContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Button, Modal } from 'react-bootstrap'
import PatientDetails from '../components/PatientDetails'

const ClientDetails = ({ client }) => {
    const { dispatch } = useClientContext()
    const { user } = useAuthContext()
    const [patients, setPatients] = useState('')
    const [showed, setShowed] = useState('');
    const [showModal, setShowModal] = useState('')
    const [formData, setFormData] = useState({
        imie: client.imie,
        nazwisko: client.nazwisko,
        numer_konta: client.numer_konta
    })

    const handleCloseModal = () => {
        setShowModal('')
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

        const response = await fetch('/api/clients/' + client._id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': `application/json`
            },
            body: body
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'UPDATE_CLIENTS', payload: json})
            setShowModal('')
        }
    }

    const handleClickModify = () => {
        setShowModal(true)
    }

    useEffect(() => {
        const fetchData = async () => {   
            const response = await fetch('/api/patients', {
                headers: {
                  'Authorization': `Bearer ${user.token}`,
                  'Content-Type': `application/json`
                }
              })
            const json = await response.json()
            setPatients(json)
        }
        fetchData().catch(console.error);
    }, [])

    const handleClickDelete = async () => {
        if (!user) {
            return;
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
        <div>

            <div className={showModal ? "modal-container" : ""}>
                <Modal show={showModal} onHide={handleCloseModal} className="modal">
                    <Modal.Header className="modal-header">
                    <Modal.Title className="modal-title">Modyfikuj klienta</Modal.Title>
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
                            <label htmlFor="nazwisko">Nazwisko</label>
                            <input type="text" className="modal-form-control" name="nazwisko" value={formData.nazwisko} onChange={handleChange} />
                        </div>
                        <div className="modal-form-group">
                            <label htmlFor="numer_konta">Numer konta</label>
                            <input type="text" className="modal-form-control" name="numer_konta" value={formData.numer_konta} onChange={handleChange} />
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
                {(user.role === 1 || user.role === 2) && <button className="delete-button" onClick={handleClickDelete}>Usuń klienta</button>}
                {(user.role === 1 || user.role === 2) && <Button className="modify-button" onClick={handleClickModify}>Modyfikuj klienta</Button>}
                <p><strong>Imię: </strong>{client.imie}</p>
                <p><strong>Nazwisko: </strong>{client.nazwisko}</p>
                <p><strong>Numer konta: </strong>{client.numer_konta} </p>
                <p style={{color: "#E5BA73"}} onClick={() => setShowed(showed => !showed)}><strong>Pokaż szczegóły pacjentów:</strong></p>
                {showed ? 
                <div id="patient-details">
                    {patients && patients.filter(p => (p.id_klienta === client._id)).map(p => (
                    <PatientDetails patient={p} key={p._id}/>))}
                    <br></br>
                </div> : null}
                <p><i>Data dodania klienta do rejestru klientów: </i>{client.createdAt.substring(0, 10)}</p>
            </div>

        </div>
    )
}

export default ClientDetails