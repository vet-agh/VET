import {useState} from 'react'
import {useSignup} from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const {signup, error, isLoading} = useSignup()

    const options = [
        {
          label: "Administracja",
          value: 1,
        },
        {
          label: "Recepcja",
          value: 2,
        },
        {
          label: "Lekarz",
          value: 3,
        },
      ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password, role)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}> 
            
            <h3> Rejestracja </h3>

            <label> Email:  </label>
            <input type = "email" onChange={(e) => setEmail(e.target.value)} value={email}/> 

            <label> Hasło:  </label>
            <input type = "password" onChange={(e) => setPassword(e.target.value)} value={password}/> 

            <label> Rola:  </label>
            <select onChange={(e) => setRole(e.target.value)} value = {role}>
                <option value=''> -- Wybierz rolę -- </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <button disabled={isLoading}> Dodaj użytkownika </button>
            {error && <div className="error"> {error} </div>}
            
        </form>
    )
}

export default Signup