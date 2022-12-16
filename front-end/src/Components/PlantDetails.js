import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useModel from '../Hooks/useModel';

import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;

export default function PlantDetails() {
  const [plant, setPlant] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/plants/${id}`)
      .then((res) => {
        setPlant(res.data.payload);
      })
      .catch(() => {
        navigate('/not-found');
      });
  }, [id, navigate]);

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

  const [model, setModel, modelStructure] = useModel({handleDelete})

  return (
    <section className='flex flex-col gap-1 place-items-center'>
        <h1 className="text-[50px] text-center mt-[25px] tablet:text-[70px]">
          {plant.name}
        </h1>
        <img className='place-self-center rounded-full w-[300px] h-[300px] tablet:w-[400px] tablet:h-[400px]' src={`${plant.image}`} alt='plant'></img>
        <div className="flex flex-row place-items-center place-content-center gap-1">
          <Link to={`/my-plants`}>
            <button className='button-style mt-1 w-16 tablet:w-32 hover:bg-green-300'>Back</button>
          </Link>{' '}
          <Link to={`/my-plants/${id}/edit`}>
            <button className='button-style mt-1 w-16 tablet:w-32 hover:bg-green-300'>Edit</button>
          </Link>{' '}
          <button className='button-style mt-1 w-16 tablet:w-32 hover:bg-green-300' onClick={() => setModel(true)}>
            Delete
          </button>
        </div>
        <div onClick={handleUpdate} className='hover:animate-[wiggle_3s_ease-in-out_infinite] flex flex-row gap-1 place-self-center place-items-center place-content-center button-style p-0 mt-1 w-[200px] h-[40px] bg-blue-300'>
        <span className='p-1 text-base'>Water Plant</span>
          <img alt='water icon' className='place-self-center p-1 hover:cursor-pointer w-[45px] h-[45px]'src='https://cdn-icons-png.flaticon.com/512/2514/2514435.png'></img>
        </div>
        <div className='flex flex-col text-left p-2'>
          <p><strong>Last Watered:</strong>{ plant.last_water ? ` ${plant.last_water}` : ` Has never been watered`}</p>
          <p><strong>Category:</strong> {plant.category}</p>
          <p><strong>Origin:</strong> {plant.origin}</p>
          <p><strong>Ideal Light:</strong> {plant.ideal_light}</p>
          <p><strong>Water Tips:</strong> {plant.ideal_watering}</p>
        </div>
      <div>
        { model ? modelStructure : ''}
      </div>
      <ToastContainer
          limit={1}
          toastStyle={{color: 'white', backgroundColor: 'black'}}
          />
    </section>
  );
}