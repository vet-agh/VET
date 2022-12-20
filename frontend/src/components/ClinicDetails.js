import { useClinicContext } from "../hooks/useClinicContext"

const ClinicDetails = ({clinic}) => {
    const {dispatch} = useClinicContext()

    const handleClickDelete = async () => {
        const response = await fetch('/api/clinics/' + clinic._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_CLINICS', payload: json})
        }
    }
    
    return (
        <div className="form-details">
            <button className="delete-button" onClick={handleClickDelete}>Usuń klinikę</button>
            <p><strong>Nazwa Kliniki: </strong>{clinic.nazwa}</p>
            <p><strong>Numer telefonu: </strong>{clinic.numer_telefonu}</p>
            <p><strong>Adres: </strong>{clinic.adres}</p> 
            <p><i>Data dodania pacjenta do rejestru pacjentów: </i>{clinic.createdAt.substring(0, 10)}</p>
        </div>
    )
}

export default ClinicDetails