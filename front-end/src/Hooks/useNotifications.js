import { useEffect, useState } from "react"
import axios from 'axios'

const API = process.env.REACT_APP_API_URL

export default function useNotifications(){ 
    const [notification, setNotification] = useState([])
    const [reload, setReload] = useState(0)

    const reFetch = () => setReload(prev => prev + 1)

    useEffect(() => {
    const fetchData = () => {
        axios
        .get(`${API}/plants/notification`)
        .then((res) => {
            setNotification(res.data.payload)
        })
        .catch((err) => {
            console.log(err)
        })}
        
        fetchData()
        
    }, [reload])

    return [notification, reFetch]
}