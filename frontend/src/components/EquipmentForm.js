import {useState} from "react"
import {useEquipmentContext} from "../hooks/useEquipmentContext";

const EquipmentForm = () => {
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
            <h3> Dodaj nowy sprzęt do rejestru: </h3>
        
            <label> Nazwa sprzętu: </label>
            <input type="text" onChange={(e) => setNazwa(e.target.value)} value = {nazwa}/>

            <label> Kategoria sprzętu: </label>
            <input type="text" onChange={(e) => setKategoria(e.target.value)} value = {kategoria}/>
        
            <label> Liczba sprzętu: </label> 
            <input type="number" onChange={(e) => setLiczbaSprzetu(e.target.value)} value = {liczba_sprzetu}/>
            
            <label> ID kliniki, do której dodawany jest sprzęt: </label>
            <input type="number" onChange={(e) => setIdKliniki(e.target.value)} value = {id_kliniki}/>

            <button> Dodaj sprzęt </button> 
            
            {error && <div className="error"> {error} </div>}
        </form>
    )
}

export default EquipmentForm