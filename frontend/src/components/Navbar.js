import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'

const Navbar = () => {

    const {logout} = useLogout()

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
                <div>
                    <button onClick={handleClick}> Wyloguj się </button>
                </div>
                
                <div>
                    <Link to="/login"> Login </Link>
                </div>
            </nav>
        </div>
    </header>
    )
}
export default Navbar





