import {useState} from 'react'
import {useSignup} from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}> 
            
            <h3> Rejestracja </h3>

            <label> Email:  </label>
            <input type = "email" onChange={(e) => setEmail(e.target.value)} value={email}/> 

            <label> Hasło:  </label>
            <input type = "password" onChange={(e) => setPassword(e.target.value)} value={password}/> 

            <button disabled={isLoading}> Zaloguj się </button>
            {error && <div className="error"> {error} </div>}
            
        </form>
    )
}

export default Signup