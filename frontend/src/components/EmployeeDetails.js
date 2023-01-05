import { useEmployeesContext } from '../hooks/useEmployeeContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'

const EmployeeDetails = ({employee}) => {
    const { dispatch } = useEmployeesContext()
    const { user } = useAuthContext()

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        imie: employee.imie,
        nazwisko: employee.nazwisko,
        numer_telefonu: employee.numer_telefonu,
        numer_konta: employee.numer_konta,
        adres: employee.adres,
        id_kliniki: employee.id_kliniki
    });

    const handleCloseModal = () => {
        setShowModal(false);
    }


    const handleChange = (event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value
        });
    }

    const handleSubmitModal = async () => {
        if (!user) {
        return;
        }

        const body = JSON.stringify(formData);

        const response = await fetch('/api/employees/' + employee._id, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': `application/json`
        },
        body: body
        });
        const json = await response.json()

        if (response.ok) {
        dispatch({type: 'UPDATE_EMPLOYEES', payload: json});
        setShowModal(false);
        }
    }

    const handleClickModify = () => {
        setShowModal(true);
    }
        

    const handleClickDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/employees/' + employee._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_EMPLOYEES', payload: json})
        }
    }

    return (
        <div>

        <div className={showModal ? "modal-container" : ""}>
            <Modal show={showModal} onHide={handleCloseModal} className="modal">
                <Modal.Header className="modal-header">
                <Modal.Title className="modal-title">Modyfikuj pracownika</Modal.Title>
                <button type="button" className="modal-close-button" onClick={handleCloseModal}>
                    &times;
                </button>
                </Modal.Header>
                <Modal.Body className="modal-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="imie">Imię</label>
                        <input type="text" className="form-control" name="imie" value={formData.imie} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nazwisko">Nazwisko</label>
                        <input type="text" className="form-control" name="nazwisko" value={formData.nazwisko} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numer_telefonu">Numer telefonu</label>
                        <input type="text" className="form-control" name="numer_telefonu" value={formData.numer_telefonu} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numer_konta">Numer konta</label>
                        <input type="text" className="form-control" name="numer_konta" value={formData.numer_konta} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adres">Adres</label>
                        <input type="text" className="form-control" name="adres" value={formData.adres} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="id_kliniki">ID Kliniki</label>
                        <input type="text" className="form-control" name="id_kliniki" value={formData.id_kliniki} onChange={handleChange} />
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
            {user.role === 1 && <button className="delete-button" onClick={handleClickDelete}>Usuń pracownika</button>}
            <Button className="modify-button" onClick={handleClickModify}>Modyfikuj pracownika</Button>
            <p><strong>Imię: </strong>{employee.imie}</p>
            <p><strong>Nazwisko: </strong>{employee.nazwisko}</p>
            <p><strong>Numer telefonu: </strong>{employee.numer_telefonu}</p>
            <p><strong>Numer konta: </strong>{employee.numer_konta}</p>
            <p><strong>Adres: </strong>{employee.adres}</p>
            <p><strong>ID Kliniki: </strong>{employee.id_kliniki}</p>
            <p><i>Data dodania do rejestru pracowników: </i>{employee.createdAt.substring(0, 10)}</p>
        </div>
            
        </div>
    )
}

export default EmployeeDetails