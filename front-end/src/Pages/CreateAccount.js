import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useModel from '../Hooks/useModel';

import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;

export default function CreateAccount(){
    const [user, setUser] = useState({
        name: '',
        password: '',
        email: '',
        joined_date: ''
    });

    const navigate = useNavigate();

    const handleTextChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
      }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        axios
        .post(`${API}/user`)
        .then((res) => {
        setUser(res.data.payload);
        })
        .catch(() => {
        navigate('/notfound');
        });
    }

    return(
        <div className='flex flex-col'>
            <h1 className="text-[40px] text-left p-2 pb-0 tablet:text-[75px]">
                Create your account
            </h1>
            <p className="indent-2 p-2 text-left"><strong>Note:</strong> This email does not need to be real. The intend for this page is clear app flow and ux/ui. However, <p className='inline text-[15px] text-center tracking-wider uppercase'>Plantasynch</p> requires a valid email to send future reminders.</p>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col place-items-center'>
                        <div className='flex flex-col input-container'>
                            <label className='input-label' htmlFor='name'>User Name</label>
                            <input onChange={handleTextChange} value={user.name} name='name' className='input-style' type='text' placeholder="Your username"/>
                        </div>
                        <div className='flex flex-col input-container'>
                            <label className='input-label' htmlFor='email'>Email</label>
                            <input onChange={handleTextChange} value={user.email} required name='email' className='input-style' type='text' placeholder="Your email"/>
                        </div>
                        <div className='flex flex-col input-container'>
                            <label className='input-label' htmlFor='password'>Password</label>
                            <input onChange={handleTextChange} value={user.password} required name='password' className='input-style' type='text' placeholder="Password"/>
                        </div>
                    </div>
                <div className='p-2 flex flex-col place-items-center gap-1 drop-shadow-sm'>
                    <input type='submit' className='button-style mt-1 text-lg text-center button-style w-fit tablet:w-32' value='Create Account'/>
                    <Link className='hover:underline' to='/my-plants'>Skip to demo site</Link>
                </div>
            </form>
        </div>
    )
}