import {useState} from 'react'
import { useAuthContext } from './useAuthContext'

export const useSingup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/singup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email,password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
    }
}
