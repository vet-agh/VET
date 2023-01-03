import { useEquipmentContext } from '../hooks/useEquipmentContext'
import { useAuthContext } from '../hooks/useAuthContext'

const EquipmentDetails = ({ equipment }) => {
    const { dispatch } = useEquipmentContext()
    const { user } = useAuthContext()
 
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

    return (
        <div className="form-details">
            {user.role === 1 && <button className="delete-button" onClick={handleClick}> Usuń sprzęt </button>}
            <p><strong>Nazwa: </strong>{equipment.nazwa}</p> 
            <p><strong>Kategoria: </strong>{equipment.kategoria}</p> 
            <p><strong>Liczba sprzętu: </strong>{equipment.liczba_sprzetu}</p>
            <p><strong>ID kliniki: </strong>{equipment.id_kliniki}</p>
            <p><i>Data dodania sprzętu: </i>{equipment.createdAt.substring(0, 10)}</p>
        </div>
    )
}

export default EquipmentDetails