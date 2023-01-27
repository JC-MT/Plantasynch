import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useModel from '../Hooks/useModel';
import moreOptions from "../icons/moreOptions.png"

import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;

export default function OptionsButton({name}){  
    const { id } = useParams();
    const navigate = useNavigate();

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
        <div className={`flex place-content-center aling-content-center`} >
            <img src={moreOptions} className={`hover:bg-[#224722] hover:border-[#D9F8B9] cursor-pointer place-self-center border-[#224722] border-2 mt-0 w-[35px] h-[40px] rounded-full text-lg tablet:w-32`} onClick={() => setModel(true)} />
            <div className='z-50'>
                <ToastContainer
                    limit={1}
                    toastStyle={{color: 'white', backgroundColor: 'black'}}
                    />
            </div>
            <Link to={`/my-plants/${id}/edit`}>
            <button className=''></button>
          </Link>{' '}
            { model ? modelStructure : ''}
        </div>
    )
}