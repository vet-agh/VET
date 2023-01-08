import { useClinicContext } from '../hooks/useClinicContext'
import { useAuthContext } from '../hooks/useAuthContext'

const ClinicDetails = ({clinic}) => {
    const { dispatch } = useClinicContext()
    const { user } = useAuthContext()

    const handleClickDelete = async () => {
        if (!user) {
            return
        }
        
        const response = await fetch('/api/clinics/' + clinic._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_CLINICS', payload: json})
        }
    }
    
    return (
        <div className="form-details">
            {user.role === 1 && <button className="delete-button" onClick={handleClickDelete}>Usuń klinikę</button>}
            <p><strong>Nazwa Kliniki: </strong>{clinic.nazwa}</p>
            <p><strong>Numer telefonu: </strong>{clinic.numer_telefonu}</p>
            <p><strong>Adres: </strong>{clinic.adres}</p> 
            <p><i>Data dodania kliniki do rejestru klinik: </i>{clinic.createdAt.substring(0, 10)}</p>
        </div>
    )
}

export default ClinicDetails