import '../Login/Login.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [warning, setWarning] = useState(false)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const user = {
        email: email,
        password: password
    }

    const handleSubmit = () => {
        axios.post('https://note-taker-b.onrender.com/login', user)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                navigate('/Home')
            })
            .catch((err) => {
                setWarning(true)
                setMessage(err.response.data.message)
                console.log(err.response.data.message)  
            })
    }

    return (
        <div id='back'>
            <div className='container'>
                <h1 className='sign-up'>Sign In</h1>
                <input type="email" className='email' placeholder='EMAIL' onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" className='password' placeholder='PASSWORD' onChange={(e) => { setPassword(e.target.value) }} />
                <button className='log-in' onClick={handleSubmit}>Log In</button>
                <p>Dont have account <button id='signup-' onClick={() => { navigate('/signup') }}>Sign Up</button></p>

                
                {warning == true ? <div id='message-login'>{message}</div> : <div></div>}
            </div>
        </div>
    )
}

export default Login