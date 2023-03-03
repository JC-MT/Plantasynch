import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useModel from '../Hooks/useModel';
import Footer from './Footer';

import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;

export default function LogIn( {setLoggedInUser} ){
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        password: '',
    });
    const [ allUsers, setAllUser] = useState([])
    const navigate = useNavigate();

    const handleTextChange = (event) => {
        setUserCredentials({ ...userCredentials, [event.target.name]: event.target.value })
      }
    
    useEffect(() => {
        axios
        .get(`${API}/user`)
        .then((res) => {
            setAllUser(res.data.payload);
        })
        .catch((err) => {
            console.warn(err)
        });  
    // eslint-disable-next-line
    }, [])

    const notify = (result, name) => {
    
        return result ? toast.success(`You are logged in, ${name}. Happy Growing 🪴`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      }) : toast.error(`We were unable to log you in 🥲 Please check your internet or change your credentials to match our database.`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      })}

    const handleSubmit = (event) => {
        event.preventDefault()
        const foundUser = allUsers.filter((user) => user.name === userCredentials.name && user.password === userCredentials.password)

        if(foundUser.length){
            axios
            .get(`${API}/user/${foundUser[0].id}`)
            .then((res) => {
                notify(true, res.data.payload.name)
                setTimeout(() => { navigate('/my-plants') }, 4000)
                setUserCredentials({name: '', password: ''})
                return res.data.payload
            }).then((res) => {
                setLoggedInUser(res)
            })
            .catch((err) => {
                console.warn(err)
                notify(false)
            });
        } else {
            notify(false)
        }
    }

    return(
        <section>
            <div className='flex flex-col h-screen tablet:px-[15%]'>
            <h1 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased p-2 tablet:pt-12 tablet:text-[40px] tablet:px-4">
                Welcome Back
            </h1>
            <p className="indent-2 p-1 text-left tablet:px-4"><strong>Note:</strong> Use the contact form below for any log-in support. Happy growing!  🌱 </p>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col place-items-center tablet:p-2'>
                    <div className='flex flex-col input-container'>
                        <label className='input-label' htmlFor='name'>User Name</label>
                        <input onChange={handleTextChange} value={userCredentials.name} required name='name' className='input-style' type='text' placeholder="Your username"/>
                    </div>
                    <div className='flex flex-col input-container'>
                        <label className='input-label' htmlFor='password'>Password</label>
                        <input onChange={handleTextChange} value={userCredentials.password} required name='password' className='input-style' type='text' placeholder="Your password"/>
                    </div>
                </div>
                <div className='p-2 flex flex-col place-items-center gap-1 drop-shadow-sm'>
                <input type='submit' className='button-style mt-1 text-lg text-center button-style w-fit' value='Log In'/>
                <Link className='hover:underline' to='/my-plants'>Skip to demo site</Link>
                </div>
            </form>
            <div className='z-50'>
            <ToastContainer
                limit={1}
                toastStyle={{color: 'white', backgroundColor: 'black'}}
                />
            </div>
            </div>
        <Footer/>
        </section>
    )
}