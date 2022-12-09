const ScheduleDetails = ({schedule}) => {
  return (
    <div className="schedule-details">
      <strong><p>Data: {schedule.data} { } ID Kliniki: {schedule.id_kliniki} ID Lekarza: {schedule.id_lekarza}</p></strong>
      <p>ID Klienta: {schedule.id_klienta}</p>
      <p>ID Pacjenta: {schedule.id_pacjenta}</p>
      <p>Minimalny czas trwania: {schedule.czas_trwania_min}</p>
      <p>Usługa: {schedule.usluga}</p>
      <p>Data dodania wizyty do harmonogramu: {schedule.createdAt}</p>
    </div>
  )
}

export default ScheduleDetails