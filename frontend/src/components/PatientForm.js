import { useState } from "react"
import { usePatientContext } from "../hooks/usePatientContext";

const PatientForm = () => {
    const {dispatch} = usePatientContext()
    const [imie, setImie] = useState('')
    const [gatunek, setGatunek] = useState('')
    const [rasa, setRasa] = useState('')
    const [id_wlasciciela, setIdWlasciciela] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const patient = {imie, gatunek, rasa, id_wlasciciela}

        const response = await fetch('/api/patients',{
            method: 'POST',
            body: JSON.stringify(patient),
            headers: {
                'Content-Type':'application/json'
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
            setIdWlasciciela('')
            setError(null)
            dispatch({type: 'CREATE_PATIENT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}> 
        <h3> Dodaj nowego pacjenta do rejestru: </h3>

        <label>Imię pacjenta:</label>
        <input type="text" onChange={(e) => setImie(e.target.value)} value = {imie}/>

        <label>Gatunek pacjenta:</label>
        <input type="text" onChange={(e) => setGatunek(e.target.value)} value = {gatunek}/>

        <label>Rasa pacjenta:</label>
        <input type="text" onChange={(e) => setRasa(e.target.value)} value = {rasa}/>

        <label>ID Właściciela:</label>
        <input type="number" onChange={(e) => setIdWlasciciela(e.target.value)} value = {id_wlasciciela}/>

        <button> Dodaj pacjenta </button> 
        {error && <div className="error"> {error} </div>}
        </form>
    )
}

export default PatientForm