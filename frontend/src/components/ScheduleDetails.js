import { useScheduleContext } from '../hooks/useScheduleContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const ScheduleDetails = ({ schedule }) => {
  const { dispatch } = useScheduleContext()
  const { user } = useAuthContext()

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
      data: schedule.data,
      czas_trwania_min: schedule.czas_trwania_min,
      usluga: schedule.usluga,
      id_kliniki: schedule.id_kliniki,
      id_lekarza: schedule.id_lekarza,
      id_klienta: schedule.id_klienta,
      id_pacjenta: schedule.id_pacjenta
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

      const response = await fetch('/api/schedule/' + schedule._id, {
          method: 'PATCH',
          headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': `application/json`
          },
          body: body
      })
      const json = await response.json()

      if (response.ok) {
          dispatch({type: 'UPDATE_SCHEDULE', payload: json})
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

    const response = await fetch('/api/schedule/' + schedule._id, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok)
    {
      dispatch({type: "DELETE_SCHEDULE", payload: json})
    }
  }
  
  return (
    <div>
            
    <div className={showModal ? "modal-container" : ""}>
        <Modal show={showModal} onHide={handleCloseModal} className="modal">
            <Modal.Header className="modal-header">
            <Modal.Title className="modal-title">Modyfikuj wizytę</Modal.Title>
            <button type="button" className="modal-close-button" onClick={handleCloseModal}>
                &times;
            </button>
            </Modal.Header>
            <Modal.Body className="modal-body">
            <form>
                <div className="modal-form-group">
                    <label htmlFor="data">Data</label>
                    <input type="text" className="modal-form-control" name="data" value={formData.data} onChange={handleChange} />
                </div>
                <div className="modal-form-group">
                    <label htmlFor="min_czas_trwania">Minimalny czas trwania</label>
                    <input type="text" className="modal-form-control" name="min_czas_trwania" value={formData.min_czas_trwania} onChange={handleChange} />
                </div>
                <div className="modal-form-group">
                    <label htmlFor="usluga">Usługa</label>
                    <input type="text" className="modal-form-control" name="usluga" value={formData.usluga} onChange={handleChange} />
                </div>
                <div className="modal-form-group">
                    <label htmlFor="id_kliniki">ID Kliniki</label>
                    <input type="text" className="modal-form-control" name="id_kliniki" value={formData.id_kliniki} onChange={handleChange} />
                </div>
                <div className="modal-form-group">
                    <label htmlFor="id_lekarza">ID Lekarza</label>
                    <input type="text" className="modal-form-control" name="id_lekarza" value={formData.id_lekarza} onChange={handleChange} />
                </div>
                <div className="modal-form-group">
                    <label htmlFor="id_klienta">ID Klienta</label>
                    <input type="text" className="modal-form-control" name="id_klienta" value={formData.id_klienta} onChange={handleChange} />
                </div>
                <div className="modal-form-group">
                    <label htmlFor="id_pacjenta">ID Pacjenta</label>
                    <input type="text" className="modal-form-control" name="id_pacjenta" value={formData.id_pacjenta} onChange={handleChange} />
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
      {(user.role === 1 || user.role === 2) && <button className="delete-button" onClick={handleClickDelete}>Usuń wizytę</button>}
      {(user.role === 1 || user.role === 2) && <Button className="modify-button" onClick={handleClickModify}>Modyfikuj wizytę</Button>}
      <p><strong>Data wizyty:</strong> {schedule.data.substring(11, 16) + ' ' + schedule.data.substring(0, 10)}</p>
      <p><strong>ID Kliniki</strong>: {schedule.id_kliniki}</p> 
      <p><strong>ID Lekarza</strong>: {schedule.id_lekarza}</p>
      <p><strong>ID Klienta</strong>: {schedule.id_klienta}</p>
      <p><strong>ID Pacjenta</strong>: {schedule.id_pacjenta}</p>
      <p><strong>Minimalny czas trwania</strong>: {schedule.czas_trwania_min}</p>
      <p><strong>Usługa</strong>: {schedule.usluga}</p>
      <p><i>Data dodania wizyty do harmonogramu:</i> {schedule.createdAt.substring(0, 10)}</p>
      <br></br>
    </div>

  </div>
  )
}

export default ScheduleDetails