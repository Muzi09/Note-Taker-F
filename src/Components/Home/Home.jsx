import '../Home/Home.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import timeimg from '../../assets/kindpng_101535.png'
import titleimg from '../../assets/2799932.png'

const Home = () => {

    let [notes, setNotes] = useState([])
    let [deleted, setDeleted] = useState(1)
    let [message, setMessage] = useState('')
    let [notesToFilter, setNotesToFilter] = useState([])

    const navigate = useNavigate()
    const token = localStorage.getItem('token')


    const handleSearch = async (e) => {

        setNotes(notesToFilter.filter((note) => {
            return note.title.toLowerCase().includes(e.target.value.toLocaleLowerCase())
        }))
    }



    useEffect(() => {
        axios.get('https://note-taker-b.onrender.com/notes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setNotes(res.data.data)
                setNotesToFilter(res.data.data)
            })
            .catch((err) => {
                console.log(err.response.data.message)
                setMessage(err.response.data.message)
            })
    }, [deleted])


    
    const handleDelete = async () => {
        await axios.delete('https://note-taker-b.onrender.com/deleteall', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data.data.message)
                setDeleted(deleted + 1)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }


    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    } 



    const handleDeleteOne = async (key) => {
        let note = notes[key]
        let titleToDelete = note.title
        console.log(titleToDelete)


        axios.post('https://note-taker-b.onrender.com/deleteone', note, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setDeleted(deleted + 1)
        })
        .catch((err) => {
            console.log(err.response.data.message)
        })

    }

    return (
        <div className='main-div'>
            <nav>
                <button id='button-home'>Home</button>
                <button id='button-home' onClick={() => { navigate('/addnote') }}>Add Note</button>
                <button id='button-home' onClick={handleDelete}>Delete All</button>
                <button id='button-home'>Export</button>
                <button id='button-home' className='logout' onClick={handleLogout}>Log Out</button>
            </nav>

            <input type="text" id="search" placeholder='Search' onChange={handleSearch} />

            {notes.map((item, key) => {
                return (
                    <div id='note'>
                        <img id="time" src={timeimg}/>
                        <img id='title-img' src={titleimg} />
                        <div id='date' key={item.key}>{item.date}</div>
                        <h1 id='note-title' key={item.key}>{item.title}</h1>
                        <h5 id='note-desc' key={item.key}>{item.description}</h5>
                        <button id='delete-note' key={item.key} onClick={() => {handleDeleteOne(key)}} >Delete</button>
                        <button id='update-note' key={item.key}>Update</button>

                    </div>
                )
            })}

            {message == 'jwt malformed' ? <div id='jwt'>Access denied. No token found. Please login again</div> : <div></div>}
            



        </div>
    )
}

export default Home