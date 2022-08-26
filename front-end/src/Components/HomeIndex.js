import axios from 'axios'
import { useEffect, useState } from 'react'

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

  console.log(garden)
  return (
    <div>
        <h1>Here lives the index</h1>
        {garden.map((plant, idx) => {
            return plant.name
        })}
    </div>
  )
}