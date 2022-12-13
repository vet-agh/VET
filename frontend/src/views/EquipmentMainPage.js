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
        <>
            <div className="go_back">
                <form action = "/">
                <input type="submit" value="Wróć do strony głównej" /> </form>
            </div>
            <EquipmentForm/>
            <h2> Rejestr sprzętu </h2>
            {equipment && equipment.map(() => ( 
            <EquipmentDetails key = {equipment._id} equipment = {equipment}/>))}
        </>
    )
}

export default EquipmentPage;