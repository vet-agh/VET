import { useEffect, useState } from 'react'
import { useScheduleContext } from '../hooks/useScheduleContext'
import { useAuthContext } from '../hooks/useAuthContext'
import PatientDetails from '../components/PatientDetails'
import ClientDetails from '../components/ClientDetails'
import EmployeeDetails from '../components/EmployeeDetails'
import ClinicDetails from '../components/ClinicDetails'

const ScheduleDetails = ({schedule}) => {
  const { dispatch } = useScheduleContext()
  const { user } = useAuthContext()
  const [patients, setPatients] = useState('');
  const [clients, setClients] = useState('');
  const [employees, setEmployees] = useState('');
  const [clinics, setClinics] = useState('');
  const [showed_clients, setShowed_clients] = useState('');
  const [showed_patients, setShowed_patients] = useState('');
  const [showed_employees, setShowed_employees] = useState('');
  const [showed_clinics, setShowed_clinics] = useState('');

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
}, [])



  useEffect(() => {
    const fetchData = async () => {   
        const response = await fetch('/api/employees', {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': `application/json`
            }
          })
        const json = await response.json()
        setEmployees(json)
    }
    fetchData().catch(console.error);
}, [])

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
    <div className="form-details">
      {(user.role === 1 || user.role === 2) && <button className="delete-button" onClick={handleClickDelete}>Usuń wizyte</button>}
      <p><strong>Data wizyty:</strong> {schedule.data.substring(11, 16) + ' ' + schedule.data.substring(0, 10)}</p>
      <p><strong>ID Kliniki</strong>: {schedule.id_kliniki}</p> 
      <p style={{color: "#E5BA73"}} onClick={() => setShowed_clinics(showed_clinics => !showed_clinics)}><strong>Pokaż szczegóły kliniki:</strong></p>
                {showed_clinics ? 
                <div id="patient-details">
                    {clinics && clinics.filter(c => (c._id === schedule.id_kliniki)).map(c => (
                    <ClinicDetails clinic={c} key={c._id}/>))}
                    <br></br>
                </div> : null}
      <p><strong>ID Lekarza</strong>: {schedule.id_lekarza}</p>
      <p style={{color: "#E5BA73"}} onClick={() => setShowed_employees(showed_employees => !showed_employees)}><strong>Pokaż szczegóły lekarza:</strong></p>
                {showed_employees ? 
                <div id="patient-details">
                    {employees && employees.filter(e => (e._id === schedule.id_lekarza)).map(e => (
                    <EmployeeDetails employee={e} key={e._id}/>))}
                    <br></br>
                </div> : null}
      <p><strong>ID Klienta</strong>: {schedule.id_klienta}</p>
      <p style={{color: "#E5BA73"}} onClick={() => setShowed_clients(showed_clients => !showed_clients)}><strong>Pokaż szczegóły klienta:</strong></p>
                {showed_clients ? 
                <div id="patient-details">
                    {clients && clients.filter(c => (c._id === schedule.id_klienta)).map(c => (
                    <ClientDetails client={c} key={c._id}/>))}
                    <br></br>
                </div> : null}
      <p><strong>ID Pacjenta</strong>: {schedule.id_pacjenta}</p>
      <p style={{color: "#E5BA73"}} onClick={() => setShowed_patients(setShowed_patients => !showed_patients)}><strong>Pokaż szczegóły pacjentów:</strong></p>
                {showed_patients ? 
                <div id="patient-details">
                    {patients && patients.filter(p => (p._id === schedule.id_pacjenta)).map(p => (
                    <PatientDetails patient={p} key={p._id}/>))}
                    <br></br>
                </div> : null}
      <p><strong>Minimalny czas trwania</strong>: {schedule.czas_trwania_min}</p>
      <p><strong>Usługa</strong>: {schedule.usluga}</p>
      <p><i>Data dodania wizyty do harmonogramu:</i> {schedule.createdAt.substring(0, 10)}</p>
      <br></br>
    </div>
  )
}

export default ScheduleDetails