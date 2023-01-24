import axios from 'axios'
import { useEffect, useState } from 'react'
import Plant from './Plant'

const API = process.env.REACT_APP_API_URL

export default function HomeIndex({notification, reFetch}) {
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

      reFetch()
    // eslint-disable-next-line
  }, [])

  const spinnerStructure = (
  <div id="spinner" className="flex flex-col items-center justify-center p-5">
    <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    <p className='w-96 italic text-center p-5'>Plantasync data is hosted on a free cloud web-service. This may cause a response delay of up to 30 seconds for the first request.</p>
  </div>)

  const currentDisplay = (    
    <div className='flex flex-col gap-2 p-4 pt-0 tablet:p-8 tablet:gap-4 laptop:grid-view'>
      {/* <p className='text-slate-400 text-right'>(Total of {garden.length} plants)</p> */}
      {garden.map((plant, idx) => {
          return <Plant id={plant.id} name={plant.name} image={plant.image} category={plant.category} key={idx} notification={notification} last_water={plant.last_water} email={plant.email}/>
      })}
    </div>)
  
  return garden.length ? currentDisplay : spinnerStructure;
}