import {useState} from "react"

const ScheduleForm = () => {
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

    const schedule = {data, czas_trwania_min, usluga, id_lekarza, id_klienta, id_pacjenta, id_kliniki}

    const response = await fetch('/api/schedule', {
      method: 'POST',
      body: JSON.stringify(schedule),
      headers: {'Content-Type': 'application/json'}
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
    }
  }

  return (
    <form className="create" onSubmit={handleScheduleSubmit}>
      <h3>Dodaj nową wizyte do harmongramu wizyt:</h3>

      <label>Data:</label>
      <input type="date" onchange={(s) => setData(s.target.value)} value={data}/>

      <label>Minimalny czas trwania:</label>
      <input type="number" onchange={(s) => setCzasTrwaniaMin(s.target.value)} value={czas_trwania_min}/>

      <label>Usluga:</label>
      <input type="text" onchange={(s) => setUsluga(s.target.value)} value={usluga}/>

      <label>ID Lekarza:</label>
      <input type="text" onchange={(s) => setIdLekarza(s.target.value)} value={id_lekarza}/>

      <label>ID Klienta:</label>
      <input type="text" onchange={(s) => setIdKlienta(s.target.value)} value={id_klienta}/>

      <label>ID Pacjenta:</label>
      <input type="text" onchange={(s) => setIdPacjenta(s.target.value)} value={id_pacjenta}/>

      <label>ID Kliniki:</label>
      <input type="text" onchange={(s) => setIdKliniki(s.target.value)} value={id_kliniki}/>

      <button>Dodaj wizyte</button>

      {error && <div className="error"> {error} </div>}
    </form>
  )
}

export default ScheduleForm