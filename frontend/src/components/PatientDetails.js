const PatientDetails = ({ patient }) => {

    return (
        <div className="patient-details">
            <p><strong>Imie:</strong> {patient.imie} </p>
            <p><strong>Gatunek:</strong> {patient.gatunek} </p>
            <p><strong>Rasa: </strong>{patient.rasa}</p>
            <p><strong>ID właściciela:</strong> {patient.id_owner} </p>
            <p><i>Data dodania pacjenta do rejestru pacjentów:</i> {patient.createdAt.substring(0, 10)}</p>
            <br></br>
        </div>
    )
}

export default PatientDetails