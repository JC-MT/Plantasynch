import axios from 'axios';
import * as dayjs from 'dayjs'
import watering from "../icons/watering.png"
import refresh from "../icons/refresh.png"
import skip from "../icons/skip.png"
// import { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { useParams, useNavigate } from 'react-router-dom';

// import 'react-toastify/dist/ReactToastify.css';
// const API = process.env.REACT_APP_API_URL;

export default function PlantHistory({actions}){  
    // const { id } = useParams();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     axios
    //       .get(`${API}/plants/${id}`)
    //       .then((res) => {
    //         return res.data.payload;
    //       })
    //       .then((res) => {
    //         hasSkippedToday(res.actions)
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       });
    //   }, [id, skippedClicked]);
    
    // const handleUpdate = (event) => {
    //     event.preventDefault()
    //     axios
    //     .put(`${API}/plants/skip/${id}`, { skip_count: skip_count})
    //     .then(() => {
    //         setSkippedClicked(true)
    //         notify(true)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //         notify(false)
    //     })
    // }


    return(
        <div>
            <h3 className={`p-4 pt-0 h-fit text-left font-semibold antialiased tracking-wide uppercase`} >Plant History</h3>
            <div className={``}>
                {actions.reverse().map((action, index) => {

                    let icon = { action: ''}
                    // <a href="https://www.flaticon.com/free-icons/skip" title="Skip icons created by Gajah Mada - Flaticon"></a>
                    // <a href="https://www.flaticon.com/free-icons/refresh" title="Refresh icons created by Freepik - Flaticon"></a>
                    // <a href="https://www.flaticon.com/free-icons/plant" title="plant icons">Plant icons created by Freepik - Flaticon</a>

                    return (
                        <div className='flex flex-row place-content-between'>
                            <p className={`pb-1 px-1 text-left`}>{action.action} on {dayjs(action.date).format('MMM D, YYYY')} </p>
                            <a href="https://www.flaticon.com/free-icons/refresh" title="refresh icons"><img className='mr-3 h-6 w-6' src={refresh}/></a>
                        </div>)
                })}
            </div>
        </div>
    )
}