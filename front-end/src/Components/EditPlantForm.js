import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import useModel from '../Hooks/useModel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL

export default function EditPlantForm() {
  const navigate = useNavigate()
  const { id } =  useParams()

  const [plant, setPlant] = useState({
    name: "",
    image: "",
    origin: "",
    category: "",
    ideal_light: "",
    ideal_watering: "",
    last_water: "",
    is_healthy: false,
    email: "",
    user_id: 0,
    demo_plant: true,
    actions: [],
    skip_count: 0,
    skip_history: []
  })

  useEffect(() => {
    axios
      .get(`${API}/plants/${id}`)
      .then((res) => {
        setPlant(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  const handleTextChange = (event) => {
    setPlant({ ...plant, [event.target.id]: event.target.value })
  }

  const notify = (result) => {
    
    return result ? toast.success(`Your plant was succesfully updated. Happy Growing 🪴`, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined
  }) : toast.error(`We were unable to edit your plant 🥲 Please check your internet and try again in a few minutes.`, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined
  })}

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .put(`${API}/plants/${id}`, plant)
      .then((res) => {
        notify(true)
        setTimeout(() => navigate('/my-plants'), 4000)
      })
      .catch((err) => {
        console.warn(err)
        notify(false)
      })
  };

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

  return (
    <div className='flex flex-col tablet:pt-8'>
        <header className='relative flex items-center justify-center'>
          <img className='grayscale-[50%] brightness-75 place-self-center static w-screen h-[275px] tablet:w-[400px] tablet:h-[400px]' src={`${plant.image}`} alt='plant'>
          </img>
          <h3 className="absolute text-white font-semibold text-[40px] text-center tablet:text-[40px]">
              {plant.name}
          </h3>
        </header>
      <div className='p-2 text-lg tablet:text-center tablet:text-[20px] tablet:p-4'>
        <p>When done, press Update</p>
      </div>
     <div className='flex flex-row text-lg place-content-center'>
        <Link to={`/my-plants`}>
          <button className='button-style m-0 w-28 tablet:w-32'>Back</button>
        </Link>
        <button onClick={handleSubmit} className='m-0 button-style w-28 tablet:w-32'>
          Update
        </button>
        <button className='mt-0 button-style w-28 tablet:w-32' onClick={() => setModel(true)}>
          Delete
        </button>
      </div>
     <form className='flex flex-col place-items-center tablet:pb-8'>
        <div className='flex flex-col input-container'>
        <label className='input-label' htmlFor='name'>Name:</label>
        <input
          id='name'
          value={plant.name}
          type='text'
          onChange={handleTextChange}
          required
          className='input-style'
        />
        </div>
        <div className='flex flex-col input-container'>
        <label className='input-label' htmlFor='image'>Image url:</label>
        <input
          id='image'
          type='text'
          name='image'
          placeholder='http://'
          value={plant.image}
          onChange={handleTextChange}
          className='input-style'
        />
        </div>
        <div className='flex flex-col input-container'>
          <label className='input-label' htmlFor='category'>Category:</label>
          <select 
            name="category" 
            id="category"
            onChange={handleTextChange}
            className='input-style'
            value={plant.category}>
            <option value="">Select ⤵</option>
            <option value="Tropical">Tropical</option>
            <option value="Bromeliad">Bromeliad</option>
            <option value="Fern">Fern</option>
            <option value="Cactus & Succulent">Cactus & Succulent</option>
            <option value="Aglaonema">Aglaonema</option>
            <option value="Flower">Flower</option>
            <option value="Foliage plant">Foliage plant</option>
            <option value="Anthurium">Anthurium</option>
            <option value="Palm">Palm</option>
            <option value="Dracaena">Dracaena</option>
            <option value="Dieffenbachia">Dieffenbachia</option>
            <option value="Palm">Palm</option>
            <option value="Ficus">Ficus</option>
            <option value="Aralia">Aralia</option>
            <option value="Philodendron">Philodendron</option>
            <option value="Grass">Grass</option>
            <option value="Topiairy">Topiairy</option>
            <option value="Sansevieria">Sansevieria</option>
            <option value="Spathiphyllum">Spathiphyllum</option>
            <option value="Schefflera">Schefflera</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className='flex flex-col input-container'>
        <label className='input-label' htmlFor='origin'>Origin:</label>
        <input
          id='origin'
          type='text'
          name='origin'
          value={plant.origin}
          onChange={handleTextChange}
          className='input-style'
        />
        </div>
        <div className='flex flex-col input-container'>
          <label className='input-label' htmlFor='ideal_light'>Prefered Light:</label>
          <select 
            name="ideal_light" 
            id="ideal_light"
            onChange={handleTextChange}
            className='input-style'
            value={plant.ideal_light}>
            <option value={plant.ideal_light}>{plant.ideal_light}</option>
            <option value="Direct Light">Direct Light</option>
            <option value="Bright Indirect Light">Bright Indirect Light</option>
            <option value="Medium Light">Medium Light</option>
            <option value="Low Light">Low Light</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className='flex flex-col input-container'>
          <label className='input-label' htmlFor='ideal_watering'>Water Preference:</label>
          <select 
            name="ideal_watering" 
            id="ideal_watering"
            onChange={handleTextChange}
            className='input-style'
            value={plant.ideal_watering}>
            <option value={plant.ideal_watering}>{plant.ideal_watering}</option>
            <option value="Keep moist between watering. Must not be dry between watering.">
              Keep moist between watering. Must not be dry between watering.</option>
            <option value="Keep moist between watering. Water when soil is half dry.">
              Keep moist between watering. Water when soil is half dry.</option>
            <option value="Water only when the soil is dry. Must be dry between watering.">
              Water only when the soil is dry. Must be dry between watering.</option>
              <option value="Other">Other</option>
          </select>
        </div>
        <div className='flex flex-col input-container'>
        <label className='input-label' htmlFor='last_water'>Last Time Watered:</label>
        <input
          id='last_water'
          name='last_water'
          type='date'
          value={plant.last_water}
          onChange={handleTextChange}
          className='input-style'
        />
        </div>
        <div className='flex flex-col input-container'>
        <label className='input-label' htmlFor='email'>Email:</label>
        <input
          id='email'
          type='text'
          name='email'
          placeholder='ex. email@gmail.com'
          value={plant.email}
          onChange={handleTextChange}
          className='input-style'
        />
        </div>
      </form>
      <div>
        { model ? modelStructure : ''}
      </div>
      <div className='z-50'>
                <ToastContainer
                    limit={1}
                    toastStyle={{color: 'white', backgroundColor: 'black'}}
                    />
            </div>
    </div>
  )
}