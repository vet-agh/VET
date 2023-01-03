import { useEffect } from 'react'
import { useClientContext } from '../hooks/useClientContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import ClientDetails from '../components/ClientDetails'
import ClientForm from '../components/ClientForm'


const ClientPage = () => {
  const {clients, dispatch} = useClientContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch('/api/clients', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok){
          dispatch({type:'SET_CLIENTS', payload: json}) 
      }
    }

    if (user) {
      fetchClients()
    }
  }, [dispatch, user])


  return (
    <>
        <div className="go_back">
            <form action="/">
              <input className="go-back-button" type="submit" value="Wróć do strony głównej" />
            </form>
        </div>
        {(user.role === 1 || user.role === 2) && <ClientForm/>}

        <h2>Lista klientów:</h2>
        {clients && clients.map(c => (
        <ClientDetails client={c} key={c._id} /> 
        ))}
        
    </>
  )
}

export default ClientPage