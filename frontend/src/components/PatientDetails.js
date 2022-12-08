const PatientDetails = ({ patient }) => {

    return (
        <div className="patient-details">
            <strong> <p> Imie: {patient.imie} </p> </strong>
            <strong> <p> Gatunek: {patient.gatunek} </p> </strong>
            <p> Rasa: {patient.rasa} </p>
            <p> ID właściciela: {patient.id_owner} </p>
        </div>
    )
}

export default PatientDetails