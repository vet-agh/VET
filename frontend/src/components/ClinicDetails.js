import { useClinicContext } from '../hooks/useClinicContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const ClinicDetails = ({ clinic }) => {
    const { dispatch } = useClinicContext()
    const { user } = useAuthContext()

    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        nazwa: clinic.nazwa,
        numer_telefonu: clinic.numer_telefonu,
        adres: clinic.adres
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
            return;
        }

        const body = JSON.stringify(formData)

        const response = await fetch('/api/clinics/' + clinic._id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': `application/json`
            },
            body: body
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'UPDATE_CLINICS', payload: json})
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
        
        const response = await fetch('/api/clinics/' + clinic._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_CLINICS', payload: json})
        }
    }
    
    return (
        <div>

            <div className={showModal ? "modal-container" : ""}>
                <Modal show={showModal} onHide={handleCloseModal} className="modal">
                    <Modal.Header className="modal-header">
                    <Modal.Title className="modal-title">Modyfikuj klinikę</Modal.Title>
                    <button type="button" className="modal-close-button" onClick={handleCloseModal}>
                        &times;
                    </button>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                    <form>
                        <div className="modal-form-group">
                            <label htmlFor="nazwa">Nazwa</label>
                            <input type="text" className="modal-form-control" name="nazwa" value={formData.nazwa} onChange={handleChange} />
                        </div>
                        <div className="modal-form-group">
                            <label htmlFor="numer_telefonu">Numer telefonu</label>
                            <input type="text" className="modal-form-control" name="numer_telefonu" value={formData.numer_telefonu} onChange={handleChange} />
                        </div>
                        <div className="modal-form-group">
                            <label htmlFor="adres">Adres</label>
                            <input type="text" className="modal-form-control" name="adres" value={formData.adres} onChange={handleChange} />
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
                {(user.role === 1 || user.role === 2) && <button className="delete-button" id="delete-button-clinics" onClick={handleClickDelete}>Usuń klinikę</button>}
                {user.role === 1 && <Button className="modify-button" id="modify-button-clinics" onClick={handleClickModify}>Modyfikuj klinikę</Button>}
                <p><strong>Nazwa:</strong> {clinic.nazwa} </p>
                <p><strong>Numer telefonu:</strong> {clinic.numer_telefonu} </p>
                <p><strong>Adres: </strong>{clinic.adres}</p>
                <p><i>Data dodania kliniki do rejestru klinik: </i>{clinic.createdAt.substring(0, 10)}</p>
            </div>
        </div>
    )
}

export default ClinicDetails