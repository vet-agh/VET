import { useScheduleContext } from "../hooks/useScheduleContext"


const ScheduleDetails = ({schedule}) => {
  const {dispatch} = useScheduleContext()
  const handleClickDelete = async () => {
    const response = await fetch('/api/schedule/' + schedule._id, {
      method: "DELETE"
    })
    const json = await response.json()

    if (response.ok)
    {
      dispatch({type: "DELETE_SCHEDULE", payload: json})
    }
  }
  
  return (
    <div className="form-details">
      <button className="delete-button" onClick={handleClickDelete}>Usuń wizyte</button>
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
  )
}

export default ScheduleDetails