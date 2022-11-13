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
    <section className='flex flex-col gap-1'>
        <h1 className="text-[50px] text-center mt-[25px] tablet:text-[70px]">
          {plant.name}
        </h1>
        <img className='place-self-center rounded-full w-[300px] h-[300px] tablet:w-[400px] tablet:h-[400px]' src={`${plant.image}`} alt='plant'></img>
        <div className="flex flex-row place-items-center place-content-center gap-1">
          <Link to={`/my-plants`}>
            <button className='button-style mt-0 w-20 hover:bg-green-300'>Back</button>
          </Link>{' '}
          <Link to={`/my-plants/${id}/edit`}>
            <button className='button-style mt-0 w-20 hover:bg-green-300'>Edit</button>
          </Link>{' '}
          <button className='button-style mt-0 w-20 hover:bg-green-300' onClick={() => setModel(true)}>
            Delete
          </button>
        </div>
        <div className='flex flex-row place-items-center place-content-center p-2'>
          <span className='p-1'>Click here when you water 👉</span>
          <img alt='water icon' onClick={handleUpdate} className='place-self-center hover:cursor-pointer hover:w-[60px] hover:h-[60px] hover:box-shadow-2xl button-style m-1 bg-blue-300 rounded-full w-[50px] h-[50px] tablet:w-[60px] tablet:h-[60px] tablet:hover:w-[80px] tablet:hover:h-[80px]'src='https://cdn-icons-png.flaticon.com/512/2514/2514435.png'/>
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