import { useEffect} from "react";
import { useEquipmentContext } from "../hooks/useEquipmentContext";

// components
import EquipmentDetails from '../components/EquipmentDetails'
import EquipmentForm from "../components/EquipmentForm";

const EquipmentPage = () => {
    const {equipment, dispatch} = useEquipmentContext()

    useEffect(() => {
    const fetchEquipment = async() => {
        const response = await fetch('/api/equipment')
        const json = await response.json()

        if(response.ok) {
          dispatch({type: 'SET_EQUIPMENT', payload: json})
        }
    }


    fetchEquipment()
    }, [])

    return(
        <div className="home">
            <div className = "equipment">
                {equipment && equipment.map(()=>(
                    <EquipmentDetails ket = {equipment._id} equipment = {equipment}/>
                ))}
        <h2> Rejestr sprzętu </h2>
        </div> 
        <EquipmentForm/>
    </div>
    )
}

export default EquipmentPage;