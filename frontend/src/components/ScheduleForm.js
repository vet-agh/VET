import { useState, useEffect } from 'react'
import { useScheduleContext } from '../hooks/useScheduleContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEmployeesContext } from '../hooks/useEmployeeContext'
import { useClientContext } from '../hooks/useClientContext'
import { usePatientContext } from '../hooks/usePatientContext'
import { useClinicContext } from '../hooks/useClinicContext'

const ScheduleForm = () => {  
  const { dispatch } = useScheduleContext()
  const { user } = useAuthContext()

  const { clinics } = useClinicContext()
  {
      const { dispatch } = useClinicContext()
        useEffect(() => {
          const fetchClinics = async () => {
            const response = await fetch('/api/clinics', {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
              })
              const json = await response.json()

              if (response.ok){
                dispatch({type: 'SET_CLINICS', payload: json})
              }
            }
            fetchClinics()
        }, [dispatch, user])
  }

  const { employees } = useEmployeesContext()
  {
      const { dispatch } = useEmployeesContext()
        useEffect(() => {
          const fetchEmployees = async () => {
            const response = await fetch('/api/employees', {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
              })
              const json = await response.json()

              if (response.ok){
                dispatch({type: 'SET_EMPLOYEES', payload: json})
              }
            }
            fetchEmployees()
        }, [dispatch, user])
  }
  
  const { clients } = useClientContext()
  {
      const { dispatch } = useClientContext()

          useEffect(() => {
          const fetchClients = async () => {
              const response = await fetch('/api/clients', {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
                })
              const json = await response.json()

              if (response.ok){
                  dispatch({type: 'SET_CLIENTS', payload: json})
              }
          }
          fetchClients()
      }, [dispatch, user])
  }


  const { patient } = usePatientContext()
  {
      const { dispatch } = usePatientContext()
        useEffect(() => {
          const fetchPatients = async () => {
            const response = await fetch('/api/patients', {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
              })
              const json = await response.json()

              if (response.ok){
                dispatch({type: 'SET_PATIENT', payload: json})
              }
            }
            fetchPatients()
        }, [dispatch, user])
  }

  const [data, setData] = useState('')
  const [czas_trwania_min, setCzasTrwaniaMin] = useState('')
  const [usluga, setUsluga] = useState('')
  const [id_lekarza, setIdLekarza] = useState('')
  const [id_klienta, setIdKlienta] = useState('')
  const [id_pacjenta, setIdPacjenta] = useState('')
  const [id_kliniki, setIdKliniki] = useState('')
  const [error, setError] = useState(null)

  const handleScheduleSubmit = async (s) => {
    s.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const schedule = {data, czas_trwania_min, usluga, id_lekarza, id_klienta, id_pacjenta, id_kliniki}

    const response = await fetch('/api/schedule', {
      method: 'POST',
      body: JSON.stringify(schedule),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok)
    {
      setError(json.error)
    }
    if (response.ok)
    {
      setData('')
      setCzasTrwaniaMin('')
      setUsluga('')
      setIdLekarza('')
      setIdKlienta('')
      setIdPacjenta('')
      setIdKliniki('')
      setError(null)
      dispatch({type: 'CREATE_SCHEDULE', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleScheduleSubmit}>
      <h3>Dodaj nową wizyte do harmongramu wizyt:</h3>

      <label>Data:</label>
      <input type="datetime-local" onChange={(s) => setData(s.target.value)} value={data}/>

      <label>Minimalny czas trwania:</label>
      <input type="number" onChange={(s) => setCzasTrwaniaMin(s.target.value)} value={czas_trwania_min}/>

      <label>Usluga:</label>
      <input type="text" onChange={(s) => setUsluga(s.target.value)} value={usluga}/>

      <label>Klinika: </label>
      <select onChange={(e) => setIdKliniki(e.target.value)} value = {id_kliniki}>
        <option value=''> -- Wybierz klinikę -- </option>
        {clinics && clinics.map((clinic) => (
          <option key={clinic._id} value={clinic._id}>
            {clinic.nazwa}
          </option>
        ))}
      </select>

      <label>Pracownik: </label>
      <select onChange={(e) => setIdLekarza(e.target.value)} value = {id_lekarza}>
        <option value=''> -- Wybierz pracownika -- </option>
        {employees && employees.map((employee) => (
          <option key={employee._id} value={employee._id}>
            dr {employee.imie} {employee.nazwisko}
          </option>
        ))}
      </select>

      <label>Klient:</label>
      <select onChange={(c) => setIdKlienta(c.target.value)} value = {id_klienta}>
        <option value=''> -- Wybierz klienta -- </option>
        {clients && clients.map((client) => (
          <option key={client._id} value={client._id}>
          {client.imie} {client.nazwisko}
          </option>
        ))}
      </select>

      <label>Pacjent: </label>
      <select onChange={(p) => setIdPacjenta(p.target.value)} value = {id_pacjenta}>
        <option value=''> -- Wybierz pacjenta -- </option>
        {patient && patient.map((patient_) => (
          <option key={patient_._id} value={patient_._id}>
            {patient_.imie}
          </option>
        ))}
      </select>

      <button className="add-button">Dodaj wizyte</button>

      {error && <div className="error"> {error} </div>}
    </form>
  )
}

export default ScheduleForm