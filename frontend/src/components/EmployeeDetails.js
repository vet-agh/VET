const EmployeeDetails = ({employee}) => {
    
    return (
        <div className="employee-details">
            <strong><p>{employee.imie} {  } {employee.nazwisko}</p></strong>
            <p>Data dołączenia do rejestru pracowników: {employee.createdAt}</p>
            <p>Numer telefonu: {employee.numer_telefonu}</p>
            <p>Numer konta: {employee.numer_konta}</p>
            <p>Adres: {employee.adres}</p>
        </div>
    )
}

export default EmployeeDetails