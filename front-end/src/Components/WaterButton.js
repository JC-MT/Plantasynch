import axios from 'axios';
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import useWaterConfirmation from '../Hooks/useWaterConfirmation';

import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;

export default function WaterButton({needsWater, last_water, plant}){ 
    const { id } = useParams();
    const navigate = useNavigate();

    const notify = (result) => {
    
        return result ? toast.success(`Great job watering your ${plant.name}. We'll send an email to remind you when it's time to water your plant again. 🪴`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      }) : toast.error(`We were unable to water ${plant.name} 🥲 Please check your internet and try again in a few minutes.`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      })}

    const handleUpdate = () => {
        axios
        .put(`${API}/plants/water/${id}`)
        .then(() => {
          notify(true)
          setTimeout(() => navigate('/my-plants'), 4000)
        })
        .catch((err) => {
          notify(false)
          console.warn(err);
        })
      }

    function handleWatering(){
        return needsWater || !last_water ? handleUpdate() : setConfirmation(true)
    }
    const [confirmation, setConfirmation, modelConfirmation] = useWaterConfirmation({handleUpdate, plant})

    return(
        <div>
        <div onClick={() => handleWatering()} 
        className='hover:animate-[wiggle_3s_ease-in-out_infinite] flex flex-row place-self-center place-items-center place-content-center button-style mt-0 w-38 h-12'>
        <span className='text-lg'>Water Plant</span>
          <img alt='water icon' className='place-self-center hover:cursor-pointer w-[35px] h-[35px]'src='https://cdn-icons-png.flaticon.com/512/2514/2514435.png'></img>
        </div>
        { confirmation ? modelConfirmation : ''}
        <div className='z-50'>
            <ToastContainer
                limit={1}
                toastStyle={{color: 'white', backgroundColor: 'black'}}
                />
            </div>
        </div>
    )
}