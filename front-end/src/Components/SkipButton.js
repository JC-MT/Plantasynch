import axios from 'axios';
import * as dayjs from 'dayjs'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;

export default function SkipButton( {skip_count, name }){  
    const { id } = useParams();
    const navigate = useNavigate();
    const [ allowedToSkip, setAllowedToSkip] = useState(true)
    const [ skippedClicked, setSkippedClicked] = useState(false)

    function hasSkippedToday(actions){
        let now = dayjs().format('YYYY/MM/DD')
        let skippedToday = actions.filter((action) => action.action === 'Skipped' && action.date === now)

        if(skippedToday.length){
          setAllowedToSkip(false)
        }
      }
    console.log('allowedToSkip', allowedToSkip)

    useEffect(() => {
        axios
          .get(`${API}/plants/${id}`)
          .then((res) => {
            return res.data.payload;
          })
          .then((res) => {
            hasSkippedToday(res.actions)
          })
          .catch((err) => {
            console.log(err)
          });
      }, [id, skippedClicked]);

    const notify = (result) => {
    
        return result ? toast.success(`${name} has been successfully skipped today 🪴`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      }) : toast.error(`We were unable to skip ${name} today 🥲 Please check your internet and try again in a few minutes.`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      })}
    
    const handleUpdate = (event) => {
        event.preventDefault()
        axios
        .put(`${API}/plants/skip/${id}`, { skip_count: skip_count})
        .then(() => {
            setSkippedClicked(true)
            notify(true)
        })
        .catch((err) => {
            console.log(err)
            notify(false)
        })
    }

    return(
        <div className={`flex ${allowedToSkip && !skippedClicked ? `` : `cursor-not-allowed`}`} >
            <button className={`button-style mt-0 w-44 text-lg tablet:w-32 ${allowedToSkip && !skippedClicked ? `` : `pointer-events-none`}`} onClick={handleUpdate} >{`${allowedToSkip && !skippedClicked ? 'Skip Today' : 'Skipped'}`}</button>
            <div className='z-50'>
                <ToastContainer
                    limit={1}
                    toastStyle={{color: 'white', backgroundColor: 'black'}}
                    />
            </div>
        </div>
    )
}