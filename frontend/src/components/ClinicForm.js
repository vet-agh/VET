import { useState } from "react"
import { useClinicContext } from '../hooks/useClinicContext'

const ClinicForm = () => {
    const {dispatch} = useClinicContext()

    const [nazwa, setNazwa] = useState('')
    const [numer_telefonu, setNumer_telefonu] = useState('')
    const [adres, setAdres] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(c) => {
        c.preventDefault()

        const clinic = {nazwa, numer_telefonu, adres}

        const response = await fetch('/api/clinics', {
            method: 'POST',
            body: JSON.stringify(clinic),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
                setError(json.error)
        }
        if(response.ok){
            setError(null)
            setNazwa('')
            setNumer_telefonu('')
            setAdres('')
            dispatch({type: 'CREATE_CLINICS', payload: json})
        }
    }
        return (
            <form className="create" onSubmit={handleSubmit}>
                <h3>Dodaj nowy zakład: </h3>

                <label> Nazwa: </label>
                <input type="text" onChange={(c) => setNazwa(c.target.value)} value={nazwa}/>

                <label>  Numer telefonu: </label>
                <input type="text" onChange={(c) => setNumer_telefonu(c.target.value)} value={numer_telefonu}/>

                <label> Adres: </label>
                <input type="text" onChange={(c) => setAdres(c.target.value)} value={adres}/>

                <button className="add-button">Dodaj zakład</button>

                {error && <div className="error">{error}</div>}
            </form>
        )
    
}

export default ClinicForm