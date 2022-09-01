import axios from 'axios'
import { useEffect, useState } from 'react'
import Plant from './Plant'

const API = process.env.REACT_APP_API_URL

export default function HomeIndex() {
  const [garden, setGarden] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/plants`)
      .then((res) => {
        setGarden(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  
  return (
    <div id='home' className='flex flex-col gap-2 p-4'>
        {garden.map((plant, idx) => {
            return <Plant id={plant.id} name={plant.name} image={plant.image} category={plant.category} key={idx} />
        })}
    </div>
  )
}