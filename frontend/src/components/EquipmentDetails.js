import { useEquipmentContext } from '../hooks/useEquipmentContext'

const EquipmentDetails = ({ equipment }) => {
    const { dispatch } = useEquipmentContext()
 
    const handleClick = async() => {
        const response = await fetch('/api/equipment/' + equipment._id, {
            method: "DELETE"
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_EQUIPMENT', payload: json})
        }
    }

    return (
        <div className="equipment-details">
            <button className="delete-button" onClick={handleClick}> Usuń sprzęt </button>
            <p> <strong> Nazwa: {equipment.nazwa} </strong> </p> 
            <p> <strong> Kategoria: {equipment.kategoria} </strong> </p> 
            <p> <strong> Liczba sprzętu: {equipment.liczba_sprzetu} </strong> </p>
            <p> <strong> ID kliniki: {equipment.id_kliniki} </strong> </p>
            <p> <strong> Data dodania sprzętu: {equipment.createdAt.substring(0, 10)} </strong> </p>
        </div>
    )
}

export default EquipmentDetails