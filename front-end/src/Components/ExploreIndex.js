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
    const results = explore.filter(plant => plant.common[0] && plant.common[0].startsWith(search)).map((plant) => {
      return <ExplorePlant name={plant.common[0]} latin={plant.latin} category={plant.category}/> 
    })
    return results
  }

  console.log(explore)
  return (
    <div>
        <h1>Here lives the explore index</h1>
        <input type='text' placeholder='Search plant' onChange={handleTextChange}/>
        {currentDisplay(explore, search)}
    </div>
  )
}