import { useEffect, useState } from "react";

// components
import EquipmentDetails from '../components/EquipmentDetails'

const EquipmentPage = () => {
    const [equipment, setEquipment] = useStat(null)

    useEffect(() => {
    const fetchEquipment = async() => {
        const response = await fetch('/api/equipment')
        const json = await response.json()

        if(response.ok) {
            setEquipment(json)
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
    </div>
    )
}

export default EquipmentPage;