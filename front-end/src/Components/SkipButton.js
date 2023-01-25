import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;

export default function SkipButton(){    

    
    const handleUpdate = (event) => {
        event.preventDefault()

    }

    return(
        <div className='flex'>
            <button className='button-style mt-0 w-36 text-lg tablet:w-32' onClick={handleUpdate} >Skip Today</button>
        </div>
    )
}