import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const API = process.env.REACT_APP_API_URL

export default function NewPlantForm() {
  const navigate = useNavigate()

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

  const handleTextChange = (event) => {
    setPlant({ ...plant, [event.target.id]: event.target.value })
  }

  const handleNumberChange = (event) => {
    setPlant({ ...plant, [event.target.id]: Number(event.target.value) })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(`${API}/plants`, plant)
      .then((res) => {
        setPlant(res.data)
        navigate(`/my-plants`)
      })
      .catch((err) => {
        console.warn(err)
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='block ml-auto mr-auto w-[30%]'>
        <label htmlFor='name'>Name:</label>
        <input
          id='name'
          value={plant.name}
          type='text'
          onChange={handleTextChange}
          required
          className='ml-[10px] w-[100%]'
        />
        <label htmlFor='image'>Image:</label>
        <input
          id='image'
          type='text'
          name='image'
          placeholder='http://'
          value={plant.image}
          onChange={handleTextChange}
          className='ml-[10px] w-[100%]'
        />
        <label htmlFor='category'>Category:</label>
        <input
          id='category'
          type='text'
          name='category'
          value={plant.category}
          onChange={handleTextChange}
          className='ml-[10px] w-[100%]'
        />
        <label htmlFor='last_water'>Last Time Hydrated:</label>
        <input
          id='last_water'
          name='last_water'
          type='number'
          value={plant.last_water}
          onChange={handleNumberChange}
          className='ml-[10px] w-[100%]'
        />

        <label htmlFor='is_healthy'>Does your plant seem healthy:</label>
        <input
          id='is_healthy'
          name='is_healthy'
          type='check'
          value={plant.is_healthy}
          onChange={handleTextChange}
          className='ml-[10px] w-[100%]'
        />

        <input type='submit' className='w-[50%] m-[20px] ml-[30%]'/>
        <Link to={`/my-plants`}>
        <button className='w-[40%] ml-[35%]'>Back</button>
      </Link>
      </form>
    </div>
  )
}
