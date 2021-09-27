import { useState } from 'react'
import { useRouter } from 'next/router'

// Components
import Error from '../components/Error'
import Container from '../components/Container'
import LoginContainer from '../components/login/LoginContainer'
import Name from '../components/Name'
import Input from '../components/Input'
import Button from '../components/Button'
import Loader from '../components/Loader'

const Login = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [disableBtn, setDisableBtn] = useState(false)
    const [loading, setLoading] = useState(false)

    const send = async() => {
        const user = {
            username: name,
            password
        }

        console.log(user)

        try {
            setLoading(true)

            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const json = await res.json()

            if(json.message) {
                setLoading(false)
                setDisableBtn(true)
                setError(true)
                setErrorMessage(json.message)

                setTimeout(() => {
                    setError(false)
                    setErrorMessage('')
                    setDisableBtn(false)
                }, 3000)
            } else {
                setLoading(false)
                const { token } = json
                
                sessionStorage.setItem('token', token)
                router.push('/home')
            }

            //console.log(json)
        } catch {
            setLoading(false)
            alert('No se puede conectar al servidor')
        }
    }

    return (
        <Container>
            <LoginContainer>
                {
                    !loading && 
                    <>
                        <Name />
                        <Input type="text"
                            text="Usuario"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input type="password"
                            text="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button text="Iniciar sesion"
                            handleClick={send}
                            setDisable={disableBtn}
                        />
                    </>
                }
                {
                    loading && <Loader />
                }
                {
                    error &&
                    <Error message={errorMessage} />
                }
            </LoginContainer>
        </Container>
    )
}

export default Login