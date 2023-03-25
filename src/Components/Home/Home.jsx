import '../Home/Home.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Home = () => {

    let [notes, setNotes] = useState([])
    let [search, setSearch] = useState("")
    let [deleted, setDeleted] = useState(1)
    let [message, setMessage] = useState('')

    const navigate = useNavigate()
    const token = localStorage.getItem('token')


    console.log(search)
    console.log(notes)

    const handleSearch = async (e) => {
        setSearch(e.target.value)

        setNotes(notes.filter((note) => {
            return note.title.toLowerCase().includes(search.toLocaleLowerCase())
        }))
    }



    useEffect(() => {
        axios.get('http://localhost:3001/notes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setNotes(res.data.data)
            })
            .catch((err) => {
                console.log(err.response.data.message)
                setMessage(err.response.data.message)
            })
    }, [deleted])


    
    const handleDelete = async () => {
        await axios.delete('http://localhost:3001/deleteall', {
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


    const handleDeleteOne = (key) => {
        let obj = notes[key]
        let title = obj.title

        console.log(title)

        // To be continued

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
                        <h1 id='note-title' key={item.key}>{item.title}</h1>
                        <h5 id='note-desc' key={item.key}>{item.description}</h5>
                        <button id='delete-note' key={item.key} onClick={handleDeleteOne(key)}>Delete</button>
                        <button id='update-note' key={item.key}>Update</button>

                    </div>
                )
            })}

            {message == 'jwt malformed' ? <div id='jwt'>Access denied. No token found. Please login again</div> : <div></div>}
            



        </div>
    )
}

export default Home