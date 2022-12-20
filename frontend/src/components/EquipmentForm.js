import { useState, useEffect } from 'react'
import { useEquipmentContext } from '../hooks/useEquipmentContext'
import { useClinicContext } from '../hooks/useClinicContext'

const EquipmentForm = () => {

    // Fetch clinics data - start

    // clinics declared globally
    const {clinics} = useClinicContext()
    {
        // dispatch declared locally - avoiding conflict with equipment dispatch
        const {dispatch} = useClinicContext()

            useEffect(() => {
            const fetchClinics = async () => {
                const response = await fetch('/api/clinics')
                const json = await response.json()

                if (response.ok){
                    dispatch({type: 'SET_CLINICS', payload: json})
                }
            }
            fetchClinics()
        }, [dispatch])
    }

    // Fetch clinics data - end

    const {dispatch} = useEquipmentContext()

    const [nazwa, setNazwa] = useState('')
    const [kategoria, setKategoria] = useState('')
    const [liczba_sprzetu, setLiczbaSprzetu] = useState('')
    const [id_kliniki, setIdKliniki] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const equipment = {nazwa, kategoria, liczba_sprzetu, id_kliniki}

        const response = await fetch('/api/equipment',{
            method: 'POST',
            body: JSON.stringify(equipment),
            headers: {
                'Content-Type':'application/json'
            }
        })
        const json = await response.json() 

        if (!response.ok) {
            setError(json.error)
        }
        
        if (response.ok) {
            setNazwa('')
            setKategoria('')
            setLiczbaSprzetu('')
            setIdKliniki('')
            setError(null)
            console.log('Dodano nowy sprzęt!', json)
            dispatch({type: 'CREATE_EQUIPMENT', payload: json})
        }
    }

    return (
        <form className = "create" onSubmit={handleSubmit}> 
            <h3>Dodaj nowy sprzęt do rejestru: </h3>
        
            <label>Nazwa sprzętu: </label>
            <input type="text" onChange={(e) => setNazwa(e.target.value)} value={nazwa}/>

            <label>Kategoria sprzętu: </label>
            <input type="text" onChange={(e) => setKategoria(e.target.value)} value={kategoria}/>
        
            <label>Liczba sprzętu: </label> 
            <input type="number" min="0" onChange={(e) => setLiczbaSprzetu(e.target.value)} value={liczba_sprzetu}/>
            
            <label> Klinika do której dodawany jest sprzęt: </label>
            <select onChange={(e) => setIdKliniki(e.target.value)} value = {id_kliniki}>
                <option value=''> -- Wybierz klinikę -- </option>
                {clinics && clinics.map((clinic) => (
                    <option key={clinic._id} value={clinic._id}>
                        {clinic.nazwa}
                    </option>
                ))}
            </select>

            <button className="add-button">Dodaj sprzęt</button> 
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EquipmentForm