import axios from 'axios'
import { useEffect, useState } from 'react'
import Plant from './Plant'
import useSpinner from '../Hooks/useSpinner'

const API = process.env.REACT_APP_API_URL

export default function HomeIndex({notification, reFetch}) {
  const [garden, setGarden] = useState([])
  const [spinner, setSpinner, spinnerStructure] = useSpinner()

  useEffect(() => {
    axios
      .get(`${API}/plants`)
      .then((res) => {
        setGarden(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })

      reFetch()
    // eslint-disable-next-line
  }, [])

  const currentDisplay = (    
    <div className='flex flex-col gap-2 p-4 tablet:p-8 tablet:gap-4 laptop:grid-view'>
      {garden.map((plant, idx) => {
          return <Plant id={plant.id} name={plant.name} image={plant.image} category={plant.category} key={idx} notification={notification}/>
      })}
    </div>)
  
  return garden[0] ? currentDisplay : spinnerStructure;
}