import styles from '../../styles/loginContainer.module.css'

const LoginContainer = (props) => {
    return (
        <div className={styles._style}>
            {props.children}
        </div>
    )
}

export default LoginContainer