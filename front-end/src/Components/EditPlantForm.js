import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
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
    last_water: '',
    is_healthy: false,
    email: "",
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

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .put(`${API}/plants/${id}`, plant)
      .then((res) => {
        console.log(res)
        setPlant(res.data)
        navigate(`/my-plants`)
      })
      .catch((err) => {
        console.warn(err)
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

  console.log(plant)
  return (
    <div>
     <form onSubmit={handleSubmit} className='flex flex-col place-items-center shadow-sm'>
     <img alt='plant' className='place-self-center rounded-full w-[100px] h-[100px] tablet:w-[400px] tablet:h-[400px]' src={`${plant.image}`}/>
        <div className='flex flex-col w-fit'>
        <label htmlFor='name'>Name:</label>
        <input
          id='name'
          value={plant.name}
          type='text'
          onChange={handleTextChange}
          required
          className='input-style'
        />
        </div>
        <div className='flex flex-col w-fit'>
        <label htmlFor='image'>Image url:</label>
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
        <div className='flex flex-col w-fit'>
          <label htmlFor='category'>Category:</label>
          <select 
            name="category" 
            id="category"
            onChange={handleTextChange}
            className='input-style'
            value={plant.category}>
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
        <div className='flex flex-col w-fit'>
        <label htmlFor='origin'>Origin:</label>
        <input
          id='origin'
          type='text'
          name='origin'
          value={plant.origin}
          onChange={handleTextChange}
          className='input-style'
        />
        </div>
        <div className='flex flex-col w-fit'>
        <label htmlFor='last_water'>Last Time Watered:</label>
        <input
          id='last_water'
          name='last_water'
          type='text'
          placeholder='YYYY/MM/DD'
          value={plant.last_water}
          onChange={handleTextChange}
          className='input-style'
        />
        </div>
        <div className='flex flex-col w-fit'>
        <label htmlFor='email'>Email:</label>
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
        <div className='flex flex-row gap-5'>
        <Link to={`/my-plants`}>
          <button className='button-style'>Back</button>
        </Link>
        <input type='submit' className='button-style'/>
        <button className='button-style' onClick={handleDelete}>
          Delete
        </button>
        </div>
      </form>
    </div>
  )
}