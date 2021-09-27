import NavigationBar from '../components/NavigationBar'
import styles from '../styles/home.module.css'
import Input from '../components/Input'
import Name from '../components/Name'

const Home = () => {
    return (
        <div className="container">
            <div className="content">
                <Name />
                <Input
                    text="Contraseña actual"
                    type="password"
                />
                <Input
                    text="Contraseña nueva"
                    type="password"
                />
            </div>
            <div className="navbar-container">
                <NavigationBar route='/home'/>
            </div>
        </div>
    )
}

export default Home