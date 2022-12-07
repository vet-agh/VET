import { useEquipmentContext } from '../hooks/useEquipmentContext'

const EquipmentDetails = ({ equipment }) => {
    const { dispatch } = useEquipmentContext()
 
    const handleClick = async() => {
        const response = await fetch('/api/equipment/' + equipment._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="equipment-details">
            <button onClick={handleClick}> Usuń sprzęt </button>
            <strong> <p> Nazwa: {equipment.nazwa} </p> </strong>
            <strong> <p> Kategoria: {equipment.kategoria} </p> </strong>
            <p> Liczba sprzętu: {equipment.liczba_sprzetu} </p>
            <p> ID kliniki: {equipment.id_kliniki} </p>
            <p> Data dodania sprzętu: {equipment.createdAt} </p>
        </div>
    )
}

export default EquipmentDetails