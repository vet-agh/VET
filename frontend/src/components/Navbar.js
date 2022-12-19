import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'

const Navbar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>System zarządzania siecią weterynaryjną</h1>
            </Link>
            <nav>
                {user && (
                <div>
                    <p>
                        <span>{user.email}</span>
                    </p>
                    <button onClick={handleClick}> Wyloguj się </button>
                </div>
                )}

                {!user &&(
                <div>
                    <Link to="/login"> Zaloguj się </Link>
                    <p>
                    <Link to="/signup"> Zarejestruj się </Link>
                    </p>
                </div>
                )}
                
            </nav>
        </div>
    </header>
    )
}
export default Navbar





