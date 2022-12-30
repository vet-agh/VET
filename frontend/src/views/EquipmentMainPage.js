import { useEffect} from 'react'
import { useEquipmentContext } from '../hooks/useEquipmentContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import EquipmentDetails from '../components/EquipmentDetails'
import EquipmentForm from '../components/EquipmentForm'

const EquipmentPage = () => {
    const {equipment, dispatch} = useEquipmentContext()
    const {user} = useAuthContext()

    useEffect(() => {
    const fetchEquipment = async() => {
        const response = await fetch('/api/equipment', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
        const json = await response.json()

        if(response.ok) {
          dispatch({type: 'SET_EQUIPMENT', payload: json})
        }
    }
    
    if (user) {
        fetchEquipment()
    }
    }, [dispatch, user])

    return(
        <>
            <div className="go_back">
                <form action = "/">
                    <input className="go-back-button" type="submit" value="Wróć do strony głównej"/>
                </form>
            </div>
            <EquipmentForm/>

            <h2>Rejestr sprzętu </h2>
            {equipment && equipment.map((e) => ( 
            <EquipmentDetails equipment={e} key={e._id}/>
            ))}
        </>
    )
}

export default EquipmentPage;