const EquipmentDetails = ({ equipment }) => {

    return (
        <div className="equipment-details">
            <strong> <p> Nazwa: {equipment.nazwa} </p> </strong>
            <strong> <p> Kategoria: {equipment.kategoria} </p> </strong>
            <p> Liczba sprzętu: {equipment.liczba_sprzetu} </p>
            <p> ID kliniki: {equipment.id_kliniki} </p>
            <p> Data dodania sprzętu: {equipment.createdAt} </p>
        </div>
    )
}

export default EquipmentDetails