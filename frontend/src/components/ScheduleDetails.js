const ScheduleDetails = ({schedule}) => {
  return (
    <div className="schedule-details">
      <p><strong>Data:</strong> {schedule.data.substring(0, 10) + ' ' + schedule.data.substring(11, 19)}</p>
      <p><strong>ID Klniki</strong>: {schedule.id_kliniki}</p> 
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