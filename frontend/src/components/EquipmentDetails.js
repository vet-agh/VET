import { useEquipmentContext } from '../hooks/useEquipmentContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react';
import ClinicsDetails from '../components/ClinicDetails'

const EquipmentDetails = ({ equipment }) => {
    const { dispatch } = useEquipmentContext()
    const { user } = useAuthContext()
    const [clinics, setClinics] = useState('')
    const [showed, setShowed] = useState('');
 
    const handleClick = async() => {
        if (!user) {
            return
        }

        const response = await fetch('/api/equipment/' + equipment._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_EQUIPMENT', payload: json})
        }
    }

    useEffect(() => {
        const fetchData = async () => {   
            const response = await fetch('/api/clinics', {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              })
            const json = await response.json()
            setClinics(json)
        }
        fetchData().catch(console.error);
    }, [user.token])

    return (
        <div className="form-details">
            {user.role === 1 && <button className="delete-button" onClick={handleClick}> Usuń sprzęt </button>}
            <p><strong>Nazwa: </strong>{equipment.nazwa}</p> 
            <p><strong>Kategoria: </strong>{equipment.kategoria}</p> 
            <p><strong>Liczba sprzętu: </strong>{equipment.liczba_sprzetu}</p>
            <p><strong>ID kliniki: </strong>{equipment.id_kliniki}</p>
            <p style={{color: "#E5BA73"}} onClick={() => setShowed(showed => !showed)}><strong>Pokaż szczegóły kliniki:</strong></p>
            {showed ? 
            <div id="patient-details">
                {clinics && clinics.filter(p => (p._id === equipment.id_kliniki)).map(p => (
                <ClinicsDetails clinic={p} key={p._id}/>))}
                <br></br>
            </div> : null}
            <p><i>Data dodania sprzętu: </i>{equipment.createdAt.substring(0, 10)}</p>
        </div>
    )
}

export default EquipmentDetails