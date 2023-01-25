import axios from 'axios';
import * as dayjs from 'dayjs'
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useModel from '../Hooks/useModel';
import SkipButton from "./SkipButton"

import 'react-toastify/dist/ReactToastify.css';
import WaterButton from './WaterButton';
const API = process.env.REACT_APP_API_URL;

export default function PlantDetails({notification}) {
  const [plant, setPlant] = useState([]);
  const [needsWater, setNeedsWater] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/plants/${id}`)
      .then((res) => {
        setPlant(res.data.payload);
      }).then(() => {
        const getNotify = () => notification.find((plant) => plant.id === Number(id))
        if(getNotify()){setNeedsWater(true)}
      })
      .catch(() => {
        navigate('/not-found');
      });
  }, [id, navigate, notification]);

  const handleDelete = () => {
    axios
      .delete(`${API}/plants/${id}`)
      .then(() => {
        navigate('/my-plants');
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const [model, setModel, modelStructure] = useModel({handleDelete})

  const spinnerStructure = (
    <div id="spinner" className="flex mt-[25%] justify-center p-5">
      <div className=" flex w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>)

  const showStructure = 
  (    <section className='flex flex-col gap-1 place-items-center'>
        <h1 className="text-[40px] text-center tablet:text-[70px]">
          {plant.name}
        </h1>
        <img className='place-self-center rounded-full w-[300px] h-[300px] tablet:w-[400px] tablet:h-[400px]' src={`${plant.image}`} alt='plant'></img>
        <div className="flex flex-row place-items-center place-content-center">
          <Link to={`/my-plants`}>
            <button className='button-style text-lg w-24 mt-1 tablet:w-32'>Back</button>
          </Link>{' '}
          <Link to={`/my-plants/${id}/edit`}>
            <button className='button-style mt-1 w-24 text-lg tablet:w-32'>Edit</button>
          </Link>{' '}
          <button className='button-style mt-1 w-24 text-lg tablet:w-32' onClick={() => setModel(true)}>
            Delete
          </button>
        </div>
        <div className='flex flex-row place-content-center h-12'>
          <SkipButton/>
          <WaterButton needsWater={needsWater} last_water={plant.last_water} plant={plant}/>
        </div>
        <div className='flex flex-col text-left p-2'>
          <p className={`${!plant.last_water || needsWater ? 'animate-[pulse_1s_ease-in-out_infinite] text-red-400' : ''}`}><strong>Last Watered:</strong>{ plant.last_water ? ` ${dayjs(plant.last_water).format('dddd, MMM D, YYYY')}` : ` Has never been watered. Please edit the date or press the water plant button to water today.`}</p>
          <p><strong>Category:</strong> {plant.category}</p>
          <p><strong>Origin:</strong> {plant.origin}</p>
          <p><strong>Ideal Light:</strong> {plant.ideal_light}</p>
          <p><strong>Water Tips:</strong> {plant.ideal_watering}</p>
        </div>
        { model ? modelStructure : ''}
    </section>)

  return plant.name ? showStructure : spinnerStructure
}