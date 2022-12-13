import { useState } from "react"
import { usePatientContext } from "../hooks/usePatientContext";

const PatientForm = () => {
    const {dispatch} = usePatientContext()
    const {imie, setImie} = useState('')
    const {gatunek, setGatunek} = useState('')
    const {rasa, setRasa} = useState('')
    const {id_owner, setId_owner} = useState('')
    const {error, setError} = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const patient = {imie, gatunek, rasa, id_owner}

        const response = await fetch('/api/patient',{
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
            setId_owner('')
            setError(null)
            console.log('Dodano nowego pacjenta!', json)
            dispatch({type: 'CREATE_PATIENT', payload: json})
        }
    }

    return (
        <form classImie = "create" onSubmit={handleSubmit}> 
        <h3> Dodaj nowego pacjenta do rejestru: </h3>

        <label> Imię pacjenta:</label>
        <input type="text" onChange={(e) => setImie(e.target.value)} value = {imie}/>

        <label> Gatunek pacjenta:</label>
        <input type="text" onChange={(e) => setGatunek(e.target.value)} value = {gatunek}/>

        <label> Rasa pacjenta:</label>
        <input type="text" onChange={(e) => setRasa(e.target.value)} value = {rasa}/>

        <label> Id właściciela pacjenta:</label>
        <input type="number" onChange={(e) => setId_owner(e.target.value)} value = {id_owner}/>

        <button> Dodaj pacjenta </button> 
        {error && <div className="error"> {error} </div>}
        </form>
    )
}

export default PatientForm