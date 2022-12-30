import { useState } from 'react'
import { usePatientContext } from '../hooks/usePatientContext'
import { useAuthContext } from '../hooks/useAuthContext'

const PatientForm = () => {
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

        <label>ID Klienta:</label>
        <input type="string" onChange={(p) => setIdKlienta(p.target.value)} value = {id_klienta}/>

        <button className="add-button"> Dodaj pacjenta </button> 
        {error && <div className="error"> {error} </div>}
        </form>
    )
}

export default PatientForm