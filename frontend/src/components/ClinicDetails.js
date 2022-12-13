const ClinicDetails = ({clinic}) => {
    
    return (
        <div className="clinic-details">
            <strong><p>{clinic.nazwa}</p></strong>
            <p>Data dodania do rejestru: {clinic.createdAt.substring(0, 10)}</p>
            <p>Numer telefonu: {clinic.numer_telefonu}</p>
            <p>Adres: {clinic.adres}</p>
        </div>
    )
}

export default ClinicDetails