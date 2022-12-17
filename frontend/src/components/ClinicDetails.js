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
        <div className="clinic-details">
            <button className="delete-button" onClick={handleClickDelete}>Usuń zakład</button>
            <strong><p>{clinic.nazwa}</p></strong>
            <p>Data dodania do rejestru: {clinic.createdAt.substring(0, 10)}</p>
            <p>Numer telefonu: {clinic.numer_telefonu}</p>
            <p>Adres: {clinic.adres}</p>
        </div>
    )
}

export default ClinicDetails