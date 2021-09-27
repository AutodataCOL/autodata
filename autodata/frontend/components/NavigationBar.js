import Link from 'next/link'
import styles from '../styles/navigationBar.module.css'

const NavigationBar = (props) => {
    return (
        <div className={styles._style}>
            <Link href="/ticket">
                <div className={props.route == '/ticket'
                    ? `${styles.container} ${styles.active}` 
                    : styles.container}>
                    <p>Ventas</p>
                </div>
            </Link>
            <Link href="/inventory">
                <div className={props.route == '/inventory'
                    ? `${styles.container} ${styles.active}` 
                    : styles.container}>
                    <p>Inventario</p>
                </div>
            </Link>
            <Link href="/history">
                <div className={props.route == '/history'
                    ? `${styles.container} ${styles.active}` 
                    : styles.container}>
                    <p>Historial</p>
                </div>
            </Link>
            <Link href="/home">
                <div className={props.route == '/home'
                    ? `${styles.container} ${styles.active}` 
                    : styles.container}>
                    <p>Perfil</p>
                </div>
            </Link>
        </div>
    )
}

export default NavigationBar