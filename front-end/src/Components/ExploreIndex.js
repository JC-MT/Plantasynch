import axios from 'axios'
import { useEffect, useState } from 'react'
import ExplorePlant from './ExplorePlant';

const API = process.env.REACT_APP_API_URL;

export default function ExploreIndex() {
  const [explore, setExplore] = useState([])
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(`${API}/plants/explore`)
      .then((res) => {
        setExplore(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleTextChange = (event) => {
    setSearch(event.target.value)
  }

  const currentDisplay = (explore, search) => {
    const results = explore.filter(plant => plant.common[0] && plant.common[0].startsWith(search)).map((plant, idx) => {
      return <ExplorePlant key={idx} id={plant.id} name={plant.common[0]} latin={plant.latin} category={plant.category}/> 
    })
    return results
  }

  return (
    <div className='flex flex-col gap-2 p-4'>
        <input className='flex flex-center sticky top-5 items-center justify-center border-2 outline-green-200 rounded-full p-1 pl-4 drop-shadow-xl' type='text' placeholder='Search plant by name' onChange={handleTextChange}/>
        {currentDisplay(explore, search)}
    </div>
  )
}