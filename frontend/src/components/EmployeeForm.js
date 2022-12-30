import { useState } from 'react'
import { useEmployeesContext } from '../hooks/useEmployeeContext'
import { useAuthContext } from '../hooks/useAuthContext'

const EmployeeForm = () => {
    const { dispatch } = useEmployeesContext()
    const { user } = useAuthContext()

    const [imie, setImie] = useState('')
    const [nazwisko, setNazwisko] = useState('')
    const [numer_telefonu, setNumer_telefonu] = useState('')
    const [numer_konta, setNumer_konta] = useState('')
    const [adres, setAdres] = useState('')
    const [id_kliniki, setId_kliniki] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const employee = {imie, nazwisko, numer_telefonu, numer_konta, adres, id_kliniki}

        const response = await fetch('/api/employees', {
            method: 'POST',
            body: JSON.stringify(employee),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
                setError(json.error)
        }
        if(response.ok){
            setError(null)
            setImie('')
            setNazwisko('')
            setNumer_telefonu('')
            setNumer_konta('')
            setAdres('')
            setId_kliniki('')
            console.log('new employee added', json)
            dispatch({type: 'CREATE_EMPLOYEES', payload: json})
        }
    }
        return (
            <form className="create" onSubmit={handleSubmit}>
                <h3>Dodaj nowego pracownika: </h3>

                <label>Imię: </label>
                <input type="text" onChange={(e) => setImie(e.target.value)} value={imie}/>

                <label>Nazwisko: </label>
                <input type="text"nonChange={(e) => setNazwisko(e.target.value)} value={nazwisko}/>
                
                <label>Numer telefonu: </label>
                <input type="text" onChange={(e) => setNumer_telefonu(e.target.value)} value={numer_telefonu}/>

                <label>Numer konta: </label>
                <input type="text" onChange={(e) => setNumer_konta(e.target.value)} value={numer_konta}/>

                <label>Adres: </label>
                <input type="text" onChange={(e) => setAdres(e.target.value)} value={adres}/>
    
                <label>ID Kliniki: </label>
                <input type="text" onChange={(e) => setId_kliniki(e.target.value)} value={id_kliniki}/>
    
                <button className="add-button">Dodaj pracownika</button>
                {error && <div className="error">{error}</div>}
            </form>
        )
}

export default EmployeeForm