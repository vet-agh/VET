import { useState, useEffect } from 'react'
import { usePatientContext } from '../hooks/usePatientContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useClientContext } from "../hooks/useClientContext"

const PatientForm = () => {

    const {clients} = useClientContext()
    {
        const {dispatch} = useClientContext()
  
            useEffect(() => {
            const fetchClients = async () => {
                const response = await fetch("/api/clients",{
                    headers:{"Content-Type": `application/json`, "Authorization":`Bearer ${user.token}`}
                })
                const json = await response.json()
  
                if (response.ok){
                    dispatch({type: 'SET_CLIENTS', payload: json})
                }
            }
            fetchClients()
        }, [dispatch])
    }

    const { dispatch } = usePatientContext()
    const { user } = useAuthContext()

    const [imie, setImie] = useState('')
    const [gatunek, setGatunek] = useState('')
    const [rasa, setRasa] = useState('')
    const [id_klienta, setIdKlienta] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const patient = {imie, gatunek, rasa, id_klienta}

        const response = await fetch('/api/patients',{
            method: 'POST',
            body: JSON.stringify(patient),
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json() 

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok)
         {
            setImie('')
            setGatunek('')
            setRasa('')
            setIdKlienta('')
            setError(null)
            dispatch({type: 'CREATE_PATIENT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}> 
        <h3> Dodaj nowego pacjenta do rejestru: </h3>

        <label>Imię pacjenta:</label>
        <input type="text" onChange={(p) => setImie(p.target.value)} value = {imie}/>

        <label>Gatunek pacjenta:</label>
        <input type="text" onChange={(p) => setGatunek(p.target.value)} value = {gatunek}/>

        <label>Rasa pacjenta:</label>
        <input type="text" onChange={(p) => setRasa(p.target.value)} value = {rasa}/>

        <label>Wybierz klienta:</label>   
        <select onChange={(c) => setIdKlienta(c.target.value)} value = {id_klienta}>
        <option value=''> -- Wybierz klienta -- </option>
        {clients && clients.map((client) => (
          <option key={client._id} value={client._id}>
          {client.imie} {client.nazwisko}
          </option>
        ))}
      </select>
        <button className="add-button"> Dodaj pacjenta </button> 
        {error && <div className="error"> {error} </div>}
        </form>
    )
}

export default PatientForm