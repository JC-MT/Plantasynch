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
      notify()
      setTimeout(() => navigate('/my-plants'), 4000)
    })
    .catch((err) => {
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

  const notify = () => toast.info(`Great job watering your ${plant.name}. We'll send an email to remind you when it's time to water your plant again. 🪴`, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'dark'
    })

  const [model, setModel, modelStructure] = useModel({handleDelete})

  return (
    <section className='flex flex-col gap-1'>
        <h1 className="text-[50px] text-center mt-[50px] tablet:text-[70px]">
          {plant.name}
        </h1>
        <ToastContainer
          limit={1}
          className={'text-[#121212]'}
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        <img className='place-self-center rounded-full w-[300px] h-[300px] tablet:w-[400px] tablet:h-[400px]' src={`${plant.image}`} alt='plant'></img>
        <p className='text-[20px] p-2'>Your <em>{plant.name}</em> { plant.last_water ? `was last watered on ${plant.last_water}` : `has never been watered. You may want to inspect this plant.`}</p>
        <p>Click below if you watered today</p>
        <img alt='water icon' onClick={handleUpdate} className='place-self-center hover:cursor-pointer hover:w-[60px] hover:h-[60px] hover:box-shadow-2xl button-style m-2 bg-blue-300 rounded-full w-[50px] h-[50px] tablet:w-[60px] tablet:h-[60px] tablet:hover:w-[80px] tablet:hover:h-[80px]'src='https://cdn-icons-png.flaticon.com/512/2514/2514435.png'/>
        <p><strong>Category:</strong> {plant.category}</p>
        <p><strong>Ideal Light:</strong> {plant.ideal_light}</p>
        <p><strong>Water Tips:</strong> {plant.ideal_watering}</p>
        <div className="flex flex-row gap-5 justify-center">
          <Link to={`/my-plants`}>
            <button className='button-style hover:bg-green-300'>Back</button>
          </Link>{' '}
          <Link to={`/my-plants/${id}/edit`}>
            <button className='button-style hover:bg-green-300'>Edit</button>
          </Link>{' '}
          <button className='button-style hover:bg-green-300' onClick={() => setModel(true)}>
            Delete
          </button>
        </div>
      <div>
        { model ? modelStructure : ''}
      </div>
    </section>
  );
}