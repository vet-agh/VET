const EmployeeDetails = ({employee}) => {
    
    return (
        <div className="employee-details">
            <strong><p>{employee.imie} {  } {employee.nazwisko}</p></strong>
            <p>Data dodania do rejestru: {employee.createdAt.substring(0, 10)}</p>
            <p>Numer telefonu: {employee.numer_telefonu}</p>
            <p>Numer konta: {employee.numer_konta}</p>
            <p>Adres: {employee.adres}</p>
            <p>Numer identyfikacyjny kliniki: {employee.id_kliniki}</p>
        </div>
    )
}

export default EmployeeDetails