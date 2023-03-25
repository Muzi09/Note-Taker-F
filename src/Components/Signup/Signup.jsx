import '../Signup/Signup.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [warning, setWarning] = useState(false)
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const user = {
        email: email, 
        password: password, 
        confirmPassword: confirmPassword
    }


    const handleSubmit = () => {
        axios.post('http://localhost:3001/signup', user)
        .then((res) => {
            console.log(res.data.message)
            navigate('/')
        })
        .catch ((err) => {
            console.log(err.response.data.message)
            setWarning(true)
            setMessage(err.response.data.message)
        })
    }    


    return (
        <div id='back-sign'>
            <div className='container'>
                <h1 className='sign-up'>Sign Up</h1>
                <input type="email" className='email' placeholder='EMAIL' onChange={(e) => {setEmail(e.target.value)}} />
                <input type="password" className='password' placeholder='PASSWORD' onChange={(e) => {setPassword(e.target.value)}} />
                <input type="password" className='confirm-password' placeholder='CONFIRM PASSWORD' onChange={(e) => {setConfirmPassword(e.target.value)}} />
                <button id='continue' onClick={handleSubmit}>Continue</button>

                <button id='login-' onClick={() => {navigate('/')}}>Login</button>

                {warning == true ? <div id='message'>{message}</div> : <div></div>}
            </div>
        </div>
    )
}

export default Signup