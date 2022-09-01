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
    origin: '',
    category: "",
    ideal_light: "",
    ideal_watering: "",
    last_water: 0,
    is_healthy: false
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

  const handleNumberChange = (event) => {
    setPlant({ ...plant, [event.target.id]: Number(event.target.value) })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .put(`${API}/plants/${id}`, plant)
      .then((res) => {
        setPlant(res.data)
        navigate(`/my-plants/${id}`)
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

  return (
    <div>
     <form onSubmit={handleSubmit} className='flex flex-col place-items-center drop-shadow-sm'>
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
        <label htmlFor='image'>Image:</label>
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
        <input
          id='category'
          type='text'
          name='category'
          value={plant.category}
          onChange={handleTextChange}
          className='input-style'
        />
        </div>
        <div className='flex flex-col w-fit'>
        <label htmlFor='last_water'>Last Time Hydrated:</label>
        <input
          id='last_water'
          name='last_water'
          type='number'
          value={plant.last_water}
          onChange={handleNumberChange}
          className='input-style'
        />
        </div>
        <div className='flex flex-col w-fit'>
        <label htmlFor='is_healthy'>Does your plant seem healthy:</label>
        <input
          id='is_healthy'
          name='is_healthy'
          type='text'
          value={plant.is_healthy}
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