import { useEquipmentContext } from '../hooks/useEquipmentContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ClinicsDetails from '../components/ClinicDetails'

const EquipmentDetails = ({ equipment }) => {
    const { dispatch } = useEquipmentContext()
    const { user } = useAuthContext()
    const [clinics, setClinics] = useState('')
    const [showed, setShowed] = useState('')

    const [showModal, setShowModal] = useState('')
    const [formData, setFormData] = useState({
        nazwa: equipment.nazwa,
        kategoria: equipment.kategoria,
        liczba_sprzetu: equipment.liczba_sprzetu,
        id_kliniki: equipment.id_kliniki
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
            return;
        }

        const body = JSON.stringify(formData)

        const response = await fetch('/api/equipment/' + equipment._id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': `application/json`
            },
            body: body
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'UPDATE_EQUIPMENT', payload: json})
            setShowModal('')
        }   
    }

    const handleClickModify = () => {
        setShowModal(true)
    }



    const handleClick = async() => {
        if (!user) {
            return
        }

        const response = await fetch('/api/equipment/' + equipment._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_EQUIPMENT', payload: json})
        }
    }

    useEffect(() => {
        const fetchData = async () => {   
            const response = await fetch('/api/clinics', {
                headers: {
                  'Authorization': `Bearer ${user.token}`,
                  'Content-Type': `application/json`
                }
              })
            const json = await response.json()
            setClinics(json)
        }
        fetchData().catch(console.error);
    }, [user.token])

    return (
    <div>

        <div className={showModal ? "modal-container" : ""}>
            <Modal show={showModal} onHide={handleCloseModal} className="modal">
                <Modal.Header className="modal-header">
                <Modal.Title className="modal-title">Modyfikuj sprzęt</Modal.Title>
                <button type="button" className="modal-close-button" onClick={handleCloseModal}>
                    &times;
                </button>
                </Modal.Header>
                <Modal.Body className="modal-body">
                <form>
                    <div className="modal-form-group">
                        <label htmlFor="nazwa">Nazwa sprzętu</label>
                        <input type="text" className="modal-form-control" name="nazwa" value={formData.nazwa} onChange={handleChange} />
                    </div>
                    <div className="modal-form-group">
                        <label htmlFor="kategoria">Kategoria sprzętu</label>
                        <input type="text" className="modal-form-control" name="kategoria" value={formData.kategoria} onChange={handleChange} />
                    </div>
                    <div className="modal-form-group">
                        <label htmlFor="liczba_sprzetu">Liczba sprzętu</label>
                        <input type="text" className="modal-form-control" name="liczba_sprzetu" value={formData.liczba_sprzetu} onChange={handleChange} />
                    </div>
                    <div className="modal-form-group">
                        <label htmlFor="id_kliniki">ID Kliniki</label>
                        <input type="text" className="modal-form-control" name="id_kliniki" value={formData.id_kliniki} onChange={handleChange} />
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
            {user.role === 1 && <button className="delete-button" id="delete-button-equipment" onClick={handleClick}> Usuń sprzęt </button>}
            {user.role === 1 && <Button className="modify-button" id="modify-button-equipment" onClick={handleClickModify}>Modyfikuj sprzęt</Button>}
            <p><strong>Nazwa: </strong>{equipment.nazwa}</p> 
            <p><strong>Kategoria: </strong>{equipment.kategoria}</p> 
            <p><strong>Liczba sprzętu: </strong>{equipment.liczba_sprzetu}</p>
            <p><strong>ID kliniki: </strong>{equipment.id_kliniki}</p>
            <p style={{color: "#E5BA73"}} onClick={() => setShowed(showed => !showed)}><strong>Pokaż szczegóły kliniki:</strong></p>
            {showed ? 
            <div id="patient-details">
                {clinics && clinics.filter(c => (c._id === equipment.id_kliniki)).map(c => (
                <ClinicsDetails clinic={c} key={c._id}/>))}
                <br></br>
            </div> : null}
            <p><i>Data dodania sprzętu: </i>{equipment.createdAt.substring(0, 10)}</p>
        </div>

    </div>    
    )
}

export default EquipmentDetails