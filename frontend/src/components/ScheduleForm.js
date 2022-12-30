import { useState } from 'react'
import { useScheduleContext } from '../hooks/useScheduleContext'
import { useAuthContext } from '../hooks/useAuthContext'

const ScheduleForm = () => {
  const { dispatch } = useScheduleContext()
  const { user } = useAuthContext()
  
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

      <label>ID Kliniki:</label>
      <input type="text" onChange={(s) => setIdKliniki(s.target.value)} value={id_kliniki}/>

      <label>ID Lekarza:</label>
      <input type="text" onChange={(s) => setIdLekarza(s.target.value)} value={id_lekarza}/>

      <label>ID Klienta:</label>
      <input type="text" onChange={(s) => setIdKlienta(s.target.value)} value={id_klienta}/>

      <label>ID Pacjenta:</label>
      <input type="text" onChange={(s) => setIdPacjenta(s.target.value)} value={id_pacjenta}/>

      <button className="add-button">Dodaj wizyte</button>

      {error && <div className="error"> {error} </div>}
    </form>
  )
}

export default ScheduleForm