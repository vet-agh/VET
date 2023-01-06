import { useState,useEffect } from 'react'
import { useClientContext } from '../hooks/useClientContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePatientContext } from '../hooks/usePatientContext'

const ClientForm = () => {
    
    const {patient} = usePatientContext()
    {
        const {dispatch} = usePatientContext()

            useEffect(() => {
            const fetchPatients = async () => {
                const response = await fetch("/api/patients",{
                    headers:{"Content-Type": `application/json`,"Authorization":`Bearer ${user.token}`}
                })
                const json = await response.json()

                if (response.ok){
                    dispatch({type: 'SET_PATIENT', payload: json})
                }
            }
            fetchPatients()
        }, [dispatch])
    }
    const { dispatch } = useClientContext()
    const { user } = useAuthContext()

    const [imie, setImie] = useState('')
    const [nazwisko, setNazwisko] = useState('')
    const [numer_konta, setNumer_konta] = useState('')
    const [id_pacjenta, setId_pacjenta] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }
    
    const client = { imie, nazwisko, numer_konta, id_pacjenta }

    const response = await fetch ('/api/clients', {
        method: 'POST',
        body: JSON.stringify(client),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json()
    
    if (!response.ok){
        setError(json.error)
    }  
    if (response.ok){
        setImie('')
        setNazwisko('')
        setNumer_konta('')
        setId_pacjenta('')
        setError(null)
        dispatch({type: 'CREATE_CLIENT', payload: json})
    }

    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3> Dodaj nowego klienta: </h3>

            <label> Imię: </label>
            <input type="text" onChange={(c) => setImie(c.target.value)} value={imie}/>

            <label> Nazwisko: </label>
            <input type="text" onChange={(c) => setNazwisko(c.target.value)} value={nazwisko}/>
                                    
            <label> Numer konta (opcjonalne): </label>
            <input type="text" onChange={(c) => setNumer_konta(c.target.value)} value={numer_konta}/>

            <label>Wybierz klienta:</label>   
            <select onChange={(c) => setId_pacjenta(c.target.value)} value = {id_pacjenta}>
            <option value=''> -- Wybierz pacjenta -- </option>
            {patient && patient.map((patient_) => (
            <option key={patient_._id} value={patient_._id}>
            {patient_.imie}
            </option>
            ))}
            </select>
            <button className="add-button">Dodaj klienta</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ClientForm