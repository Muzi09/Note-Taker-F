import '../AddNote/AddNote.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


const AddNote = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState("")
    
    const note = {
        title: title,
        description: description
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('token')

            await axios.post('https://note-taker-b.onrender.com/addnote', note, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then ((res) => {
                setTitle('')
                setDescription('')
                setMessage('Note Saved Successfully')
                navigate('/Home')
            })
            .catch((err) => {
                setMessage(err.response.data.message)
            })
        } 
        catch (error) {
            console.error(error);
            setMessage('Please write title and description')
        }
    }

    return (
        <div>
            <div className='main-div'>
                <nav>
                    <button id='button-home' onClick={() => { navigate('/Home') }}>Home</button>
                    <button id='button-home'>Add Note</button>
                    <button id='button-home'>Delete All</button>
                    <button id='button-home'>Export</button>
                </nav>

                <label htmlFor="title" className='title'>Title</label>
                <input type="text" className='title-input' onChange={(e) => {setTitle(e.target.value)}} />

                <label htmlFor="desc" className='desc' >Description</label>
                <textarea type="text" className='desc-input' placeholder='Whats on your mind ?' onChange={(e) => {setDescription(e.target.value)}} />

                <button onClick={handleSubmit} id='submit-note'>Add Note</button>

                {message !== "" ? <div id='saved'>{message}</div> : <div></div>}


            </div>
        </div>
    )
}
 
export default AddNote