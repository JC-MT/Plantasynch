import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useModel from '../Hooks/useModel';
import moreOptions from "../icons/moreOptions.png"

import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;

export default function OptionsButton({name}){  
    const { id } = useParams();
    const navigate = useNavigate();
    const [ openOptions, setOpenOptions] = useState(false)

    const handleDelete = () => {
        axios
          .delete(`${API}/plants/${id}`)
          .then(() => {
            notify(true)
            setTimeout(() => navigate('/my-plants'), 4000)
          })
          .catch((err) => {
            console.warn(err);
            notify(false)
          });
      };

    const notify = (result) => {
    
        return result ? toast.success(`${name} has been successfully deleted today 👋`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      }) : toast.error(`We were unable to delete ${name} 🥲 Please check your internet and try again in a few minutes.`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      })}

    const [model, setModel, modelStructure] = useModel({handleDelete})

    return(
      <div className={`absolute right-0 flex place-self-start place-items-center flex-col pt-1 pr-0`}>
        <div className='px-1 place-self-end'>
            <img src={moreOptions} className={`${openOptions ? 'bg-[#224722]' : ''} right-0 rotate-90 hover:border-[#D9F8B9] cursor-pointer align-self-center place-self-center border-slate-800 border-2 m-0 w-[40px] h-[40px] rounded-full text-lg tablet:w-32`} 
            onClick={() => setOpenOptions((openOptions) => setOpenOptions(!openOptions))} />
        </div>
          <div className={`w-32 ${openOptions ? '' : 'hidden'}`}>
            <div className='flex flex-col text-center text-[#D9F8B9] text-lg'>
              <Link className={'p-1 mb-[2px] bg-[#224722] border-2 border-black rounded-full'} to={`/my-plants/${id}/edit`}>Edit</Link>
              <button onClick={() => setModel(true)}className='p-1 bg-[#224722] border-2 border-black rounded-full text-center'>Delete</button>
            </div>
          </div>
          <div className='z-50'>
                <ToastContainer
                    limit={1}
                    toastStyle={{color: 'white', backgroundColor: 'black'}}
                    />
            </div>
            { model ? modelStructure : ''}
      </div>
    )
}