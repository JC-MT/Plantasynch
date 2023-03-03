import axios from 'axios';
import * as dayjs from 'dayjs'
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useModel from '../Hooks/useModel';
import SkipButton from "./SkipButton"
import PlantHistory from "./PlantHistory"
import OptionsButton from './OptionsButton';
import WaterButton from './WaterButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const API = process.env.REACT_APP_API_URL;

export default function PlantDetails({notification}) {
  const { id } = useParams();
  const [plant, setPlant] = useState([]);
  const [needsWater, setNeedsWater] = useState(false)
  const navigate = useNavigate();

  function getNeedsWater(notification){
    let foundInNotifications = notification.find((plant) => plant.id === Number(id))

    if(foundInNotifications){
      setNeedsWater(true)
    }
  }

  const notify = (result) => {
    
    return result ? toast.success(`${plant.name} has been successfully deleted today 👋`, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined
  }) : toast.error(`We were unable to delete ${plant.name} 🥲 Please check your internet and try again in a few minutes.`, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined
  })}

  useEffect(() => {
    axios
      .get(`${API}/plants/${id}`)
      .then((res) => {
        setPlant(res.data.payload);
      })
      .then(() => {
        getNeedsWater(notification)
      })
      .catch((err) => {
        navigate('/not-found');
      });
  }, [id, navigate, notification]);

  const handleDelete = () => {
    axios
      .delete(`${API}/plants/${id}`)
      .then(() => {
        notify(true);
        setTimeout(() => navigate('/my-plants'), 4000);
      })
      .catch((err) => {
        console.warn(err);
        notify(false);
      });
  };

  const [model, setModel, modelStructure] = useModel({handleDelete})

  const spinnerStructure = (
    <div id="spinner" className="flex mt-[25%] justify-center p-5">
      <div className=" flex w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>)

  const showStructure = 
    <div className='flex flex-col gap-1'>
        <header className='flex items-center justify-center tablet:pt-10'>
          <div className='grayscale-[50%] w-[400px] h-[380px] place-self-center place-items-center'
          style={{background: `url('${plant.image}') no-repeat center`, backgroundSize: '400px 380px'}}>
          <OptionsButton setModel={setModel} name={plant.name}/>
          </div>
        </header>
        <div className='flex mt-2 flex-row h-12 justify-center'>
          <SkipButton name={plant.name} skip_count={plant.skip_count} />
          <WaterButton needsWater={needsWater} last_water={plant.last_water} plant={plant}/>
        </div>
        <Link to={`/my-plants`}>
            <button className='text-slate-500 hover:text-[#1E1F1D] text-lg w-fit mt-1 tablet:w-32'>⬅︎ Back</button>
        </Link>{' '}
        <h3 className={`p-1 pb-0 h-fit place-self-start text-left font-semibold antialiased tracking-wide uppercase tablet:px-[35%] tablet:pt-12`} >Plant Details</h3>
        <div className='flex flex-col text-left p-2 pt-0 tablet:px-[35%] tablet:pb-12'>
          <p className={`${!plant.last_water || needsWater ? 'animate-[pulse_1s_ease-in-out_infinite] text-red-400' : ''}`}><strong>Last Watered:</strong>{ plant.last_water ? ` ${dayjs(plant.last_water).format('dddd, MMM D, YYYY')}` : ` Has never been watered. Please edit the date or press the water plant button to water today.`}</p>
          <p><strong>Category:</strong> {plant.category}</p>
          <p><strong>Origin:</strong> {plant.origin}</p>
          <p><strong>Ideal Light:</strong> {plant.ideal_light}</p>
          <p><strong>Water Tips:</strong> {plant.ideal_watering}</p>
        </div>
        { model ? modelStructure : ''}
        <PlantHistory actions={plant.actions}/>
    </div>

  return plant.name ? showStructure : spinnerStructure
}