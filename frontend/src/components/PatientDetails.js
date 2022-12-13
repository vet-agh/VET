const PatientDetails = ({ patient }) => {

    return (
        <div className="patient-details">
            <strong> <p> Imie: {patient.imie} </p> </strong>
            <strong> <p> Gatunek: {patient.gatunek} </p> </strong>
            <p> Rasa: {patient.rasa} </p>
            <strong><p> ID właściciela: {patient.id_owner} </p></strong>
        </div>
    )
}

export default PatientDetails